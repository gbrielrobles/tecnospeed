import { ArgumentMetadata, HttpException, HttpStatus, PipeTransform } from "@nestjs/common";
import { Carrier } from "core/letter/domain/enum/carrier";

export class ParseToCarrier implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata) {
        const carrier = Carrier[value.toUpperCase() as keyof typeof Carrier];
        
        if (carrier === undefined) {
            throw new HttpException('invalid Carrier', HttpStatus.BAD_REQUEST);
        }

        return carrier;
    }
}