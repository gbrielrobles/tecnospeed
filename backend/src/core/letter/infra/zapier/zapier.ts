import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ZapierService {
    constructor(private readonly httpservice: HttpService){}

    sendFile(file: Base64URLString, client: {documentClient: string; product: any; documentSH: string; email: string}) {
        this.httpservice.postForm<any, {
            cnpj_SH: string,
            email: string,
            arquivo: Base64URLString,
            CNPJ_cliente: string,
            Produto:string,
        }>('https://hooks.zapier.com/hooks/catch/21923307/2gwb3a6/', {
           arquivo: file,
           CNPJ_cliente: client.documentClient,
           cnpj_SH: client.documentSH,
           email: client.email,
           Produto: client.product
        })
    }
}