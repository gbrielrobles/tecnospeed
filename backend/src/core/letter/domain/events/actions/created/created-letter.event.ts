import { Letter } from "core/letter/domain/letter";
import { BaseEvent } from "shared/domain/events/base-events";

export class CreatedLetterEvent extends BaseEvent<Letter>{
    constructor(operator: string, data: Letter) {
        super(
            Letter.name,
            CreatedLetterEvent.name,
            operator,
            data
        )
    }
}