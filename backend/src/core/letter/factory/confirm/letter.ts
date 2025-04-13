import * as fs from 'fs';
import { BuildLetterInput } from "core/letter/application/usecase/input";
import * as hbs from 'handlebars';
import { fromRootTemplate } from "utils/from-template";
import { Letter } from 'core/letter/domain/letter';


export abstract class FactoryLetter {
    static build(input: Letter) {
        const templatePath = fromRootTemplate( 'letter.hbs');
        const source = fs.readFileSync(templatePath, 'utf-8');
        const data = input;
        const template = hbs.compile(source) 
        return template(data);
    }
}