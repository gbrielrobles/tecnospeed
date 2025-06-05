import puppeteer from 'puppeteer';

export class BuilderPdF {
    private contract : string;

    constructor(contract: string) {
        this.contract = contract
    }

     async fromHtmlToPdf(): Promise<string> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent(this.contract, { waitUntil: 'networkidle0' });

        const pdfBuffer = Buffer.from(await page.pdf({
            format: 'A4',
            printBackground: true,
        }));

        await browser.close();

        const pdfBase64 = pdfBuffer.toString('base64');

        return pdfBase64;
    }

    static create(html: string) : BuilderPdF {
        return new BuilderPdF(html);
    }
}