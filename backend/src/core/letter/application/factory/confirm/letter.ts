import * as fs from 'fs';
import * as hbs from 'handlebars';
import { fromRootTemplate } from "utils/from-template";
import { FormLetter } from 'core/letter/domain/form-letter';

export abstract class FactoryLetter {
    static build(pathToTemplate: string, input: FormLetter) {
        return FactoryLetter.compilatorFromTemplate(pathToTemplate, input);
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