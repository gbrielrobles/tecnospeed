import * as fs from 'fs';
import * as hbs from 'handlebars';
import { fromRootTemplate } from "utils/from-template";
import { FormLetter } from 'core/letter/domain/form-letter';
import { TemplateOutSide } from '../outside/template';
import { Carrier } from '@prisma/client';

export abstract class FactoryLetter {
    static build(pathToTemplate: string, input: FormLetter, carrier: Carrier) : string {
        return FactoryLetter.compilatorFromTemplate(pathToTemplate, input, carrier);
    }

    static compilatorFromTemplate(pathToTemplate: string, input: FormLetter, carrier: Carrier) {
        if (carrier === Carrier.FINNET) {
            const pathToTemplateFinnet = fromRootTemplate(pathToTemplate, ...['finnet', 'letter.hbs']);
            const templateFinnet = hbs.compile(fs.readFileSync(pathToTemplateFinnet, 'utf-8'));
            return templateFinnet(input);
        }

        if (carrier === Carrier.NEXXERA) {
            const pathToTemplateNexxera = fromRootTemplate(pathToTemplate, ...['nexxera', 'letter.hbs']);
            const templateNexxera = hbs.compile(fs.readFileSync(pathToTemplateNexxera, 'utf-8'));
            return  templateNexxera(input)
        }
        
        throw new Error('TEMPLATE NOT FOUND');
    }
}