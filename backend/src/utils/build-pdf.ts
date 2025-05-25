import puppeteer from 'puppeteer';

export class BuilderPdF {
    private contract : string;

    constructor(contract: string) {
        this.contract = contract
    }

    async build() {
        const page = await puppeteer.launch();
    }
}