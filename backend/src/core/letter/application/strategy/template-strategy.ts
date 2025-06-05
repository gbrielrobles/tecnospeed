import { FactoryLetter } from "core/letter/application/factory/build/letter"
import { BuildLetterOutput } from "../usecase/create-letter/output";
import { FormLetter } from "core/letter/domain/form-letter";
import { Carrier } from "@prisma/client";
import { TemplateOutSide } from "../factory/outside/template";


enum BankToTemplate {
    ITAU = 'cmb2uvkpn00000dl5629m6n02',
    BB = 'cmb2uwgcc00030dl5fh7gdrz8',
    SAFRA = 'cmb2uy18a00090dl5aq3chw0z',
    SICREDI= 'cmb2ux3pl00050dl5cvkd6rdq'
}

enum Product {
    BOLETO = 'cmb2w49kr00010dic54028vu1',
    PAGAMENTOS = 'cmb2w4g7500020dic0oq2eyq7',
    PIX = 'cmb2w4npe00030dic6cty1t09',
    TRANSFERENCIA = 'cmb2w4vb900040dicdhcgd6xy'
}

export abstract class StrategyTemplateBuild {
    static getHtml(bankId: string, input: FormLetter, carrier: Carrier): string[] {
        switch (bankId) {
            case BankToTemplate.ITAU:
                if (carrier === Carrier.NEXXERA) {
                    return [FactoryLetter.build('default', input, carrier)];
                }

                const templates: string[] = []; 
                const productsIds = input.bank.products.map(p => p.id);

                for (const [key, value] of Object.entries(Product)) {
                    if (productsIds.includes(value)) {
                        switch (value) {
                            case Product.BOLETO:
                                templates.push(FactoryLetter.build('itau/boleto', input, carrier));
                                break;
                            case Product.PAGAMENTOS:
                                templates.push(FactoryLetter.build('itau/pagamentos', input, carrier));
                                break;
                            case Product.TRANSFERENCIA:
                                templates.push(FactoryLetter.build('itau/transferencias', input, carrier));
                                break;
                            case Product.PIX:
                                templates.push(FactoryLetter.build('itau/pix', input, carrier));
                                break;
                            default:
                                return []
                        }
                    }
                }
            
                return templates ?? [];
            default:
                return [FactoryLetter.build('default', input, carrier)];
        }   
    }
}