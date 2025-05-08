import { BaseEvent } from "shared/domain/events/base-events";
import { CreatedLetterEvent } from "../created/created-letter.event";
import { Letter } from "core/letter/domain/letter";

export class UpdatedLetterEvent extends BaseEvent<Letter>{
    constructor(operator: string, data: Letter){
      super(
             Letter.name,
             UpdatedLetterEvent.name,
             operator,
             data
         )
    }
}