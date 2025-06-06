import * as fs from 'fs';
import * as hbs from 'handlebars';
import { fromRootTemplate } from "utils/from-template";
import { FormLetter } from 'core/letter/domain/form-letter';
import { TemplateOutSide } from '../outside/template';
import { Carrier } from '@prisma/client';
import { PdfGenerator } from 'core/letter/infra/pdf/pdf.generator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LetterFactory { 

    buildHtml(pathToTemplate: string, input: FormLetter, carrier: Carrier): string {
        switch (carrier) {
            case Carrier.FINNET: {
                const pathToTemplateFinnet = fromRootTemplate(pathToTemplate, ...['finnet', 'letter.hbs']);
                const templateFinnet = hbs.compile(fs.readFileSync(pathToTemplateFinnet, 'utf-8'));
                return templateFinnet(input);
            }
            case Carrier.NEXXERA: {
                const pathToTemplateNexxera = fromRootTemplate(pathToTemplate, ...['nexxera', 'letter.hbs']);
                const templateNexxera = hbs.compile(fs.readFileSync(pathToTemplateNexxera, 'utf-8'));
                return  templateNexxera(input)
            } 
            default: {
                throw new Error('TEMPLATE NOT FOUND');
            }
        }
    }

    buildPdf(input: FormLetter, carrier: Carrier) : Promise<string> {
        switch (carrier) {
            case Carrier.FINNET: {
                return PdfGenerator.buildTemplatePdfFinnet(input);
            }
            case Carrier.NEXXERA: {
                return  PdfGenerator.buildTemplatePdfNexxera(input)
            } 
            default: {
                throw new Error('TEMPLATE NOT FOUND');
            }
        }
    }

}