import { validate, validateSync } from "class-validator";
import { have } from "./have";
import { UnprocessableEntityException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

export class Domain { 
    static new<T extends Object, P>(clss: new () => T, plain: P) : T {
        const instance = plainToInstance(clss, plain, {
            excludeExtraneousValues: true
        })

        const errors = validateSync(instance);

        have(errors, () => new UnprocessableEntityException());
        
        return instance as T;
    } 
}