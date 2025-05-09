import { generatorId } from "utils/generator-id";
import { LetterSendingRequest } from "../infra/http/sending/request";
import { SendingLetterStatus } from "./enum/status-letter";
import { CreatedLetterEvent } from "./events/actions/created/created-letter.event";
import { UpdatedLetterEvent } from "./events/actions/updated/updated-letter.event";

export class Letter {
    id: string;
    userId: string;
    nexera: string;
    bankId: string; 
    productId: string;
    finnet: string;
    status: SendingLetterStatus;
    ticket: string;
    createdAt: Date;
    updatedAt: Date;

    create(operator: string,  data: Omit<Letter, 'id' | 'createdAt' | 'updatedAt'>) : CreatedLetterEvent {
        return new CreatedLetterEvent(  
            operator, 
            {
                ...data,
                createdAt: new Date(),
                updatedAt: new Date(),
                id: generatorId()
            }
        );
    }

    update(operator: string, data: Letter) : Omit<UpdatedLetterEvent, 'createdAt' | 'updatedAt'>  {
        return new UpdatedLetterEvent(operator, data)
    } 
}