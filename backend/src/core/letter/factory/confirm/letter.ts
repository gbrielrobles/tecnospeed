import * as fs from 'fs';
import { BuildLetterInput } from "core/letter/application/usecase/input";
import * as hbs from 'handlebars';
import { fromRootTemplate } from "utils/from-template";
import { Letter } from 'core/letter/domain/letter';
import * as crypto from "crypto"

export abstract class FactoryLetter {
    static build(input: Letter) {
        const templateNexxeraPath = fromRootTemplate('nexxera','letter.hbs');
        const templateFinnetPath = fromRootTemplate('finnet','letter.hbs');
        
        const source = fs.readFileSync(templateNexxeraPath, 'utf-8');
        const template = hbs.compile(source);
        const data = template(input);

        return {
            data: data,
            hashed: FactoryLetter.generatedHash(data)
        };
    }

    static generatedHash(data: string): string {
       return crypto.createHash('sha256').update(data).digest('hex');
    }
}