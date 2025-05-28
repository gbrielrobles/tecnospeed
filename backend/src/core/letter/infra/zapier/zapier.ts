import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ZapierService {
    constructor(private readonly httpservice: HttpService){}

    sendFile(file: any) {
        this.httpservice.postForm<any, {
            cnpj_SH: string,
            email: string,
            arquivo: string,
            CNPJ_cliente: string,
            Produto:string,
        }>('https://hooks.zapier.com/hooks/catch/21923307/2gwb3a6/', {
            
        })
    }
}