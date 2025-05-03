import { NextFunction, Request, Response } from "express";
import { Counter } from "prom-client";

const httpRequestCounter = new Counter({
    name: 'http_requests_total',
    help: 'Total de requisições recebidas',
    labelNames: ['method', 'route', 'status'],
  });
  

export class MetricsMiddleware {
    constructor() { }

    use(req: Request, res: Response, next: NextFunction) {
        const start = Date.now();
        res.on('finish', () => {
            httpRequestCounter.inc({
                method: req.method,
                route: req.originalUrl,
                status: res.statusCode.toString(),
            });
        });

        next();
    }
}