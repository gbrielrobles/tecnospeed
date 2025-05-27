import { Injectable } from "@nestjs/common";
import { ConnectorBullMQ } from "shared/infra/bull/connector";

@Injectable()
export class LetterProducer {
    constructor(private connector: ConnectorBullMQ) {

    }


}