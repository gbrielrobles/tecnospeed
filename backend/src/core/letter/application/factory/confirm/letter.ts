import * as fs from 'fs';
import * as hbs from 'handlebars';
import { fromRootTemplate } from "utils/from-template";
import * as crypto from "crypto"
import { FormLetter } from 'core/letter/domain/form-letter';

export abstract class FactoryLetter {
    static build(pathToTemplate: string, input: FormLetter) {
        const data = FactoryLetter.compilatorFromTemplate(pathToTemplate, input)
        return {
            data: data,
            hashed: FactoryLetter.generatedHash(data)
        }
    }

    static generatedHash(data): string {
       return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
    }

    static compilatorFromTemplate(pathToTemplate: string, input: FormLetter) {
        const pathToTemplateNexxera = fromRootTemplate(pathToTemplate, ...['nexxera', 'letter.hbs']);
        const pathToTemplateFinnet = fromRootTemplate(pathToTemplate, ...['finnet', 'letter.hbs']);
        const templateNexxera = hbs.compile(fs.readFileSync(pathToTemplateNexxera, 'utf-8'));
        const templateFinnet = hbs.compile(fs.readFileSync(pathToTemplateFinnet, 'utf-8'));

        return {
            nexxera : templateNexxera(input),
            finnet: templateFinnet(input)
        };
    }
}