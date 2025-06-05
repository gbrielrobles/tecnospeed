import { MiddlewareConsumer, Module, NestModule, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { SharedModule } from 'shared/shared.module';
import { BankModule } from 'core/bank/bank.module';
import { LetterModule } from 'core/letter/letter.module';
import { makeCounterProvider, PrometheusModule,makeGaugeProvider, InjectMetric } from '@willsoto/nestjs-prometheus';
import { MetricsMiddleware } from 'middleware/metrics.middleware';
import { Counter, Gauge } from 'prom-client';
import { clearInterval } from 'timers';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from "@bull-board/express";
import basicAuth from "express-basic-auth";
import { Queues } from 'shared/infra/bull/queues/letter.queue';
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { BullModule } from "@nestjs/bullmq";
import { BullDashMQModule } from 'shared/infra/bull/dashboard.module';
@Module({
  imports: [
    SharedModule,
    BankModule,
    LetterModule,
    PrometheusModule.register({
      path: '/metrics',
    }),
    BullDashMQModule
  ],
  providers: [
    makeGaugeProvider({
      name: "uptime_metric",
      help: "Uptime of the application",
      labelNames: ["app"],
    }),
  ]
})
export class AppModule implements NestModule, OnModuleInit, OnModuleDestroy{
  private startTime: number;
  private interval: NodeJS.Timeout;
  constructor(
    @InjectMetric("uptime_metric") public counter: Gauge<string>
  ) { }
  
  onModuleInit() {
    this.startTime = Date.now();
    this.interval = setInterval(() => {
      const uptime = Date.now() - this.startTime;
      this.counter.set({ app: "app" },uptime);
    },
      5000);
  }

  onModuleDestroy() {
    clearInterval(this.interval);
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MetricsMiddleware)
      .forRoutes('*');
  }
}
