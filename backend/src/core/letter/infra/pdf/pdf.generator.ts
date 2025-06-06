import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import { PassThrough } from 'stream';
import fs from 'fs'
export abstract class PdfGenerator {
static buildTemplatePdfNexxera(data): Promise<Base64URLString> {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50, size: 'A4' });
        const stream = new PassThrough();
        const chunks: Buffer[] = [];

        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => {
            const buffer = Buffer.concat(chunks);
            const base64 = buffer.toString('base64');
            fs.writeFileSync('carta_relacionamento.pdf', buffer); // Opcional: remover em produção
            resolve(base64);
        });
        stream.on('error', reject);
        doc.pipe(stream);

        const pageWidth = doc.page.width;
        const margin = doc.page.margins.left;

        function drawTable(x: number, y: number, colWidths: number[], rows: string[][], rowHeight = 20) {
            const tableWidth = colWidths.reduce((a, b) => a + b, 0);

            for (let i = 0; i <= rows.length; i++) {
                doc.moveTo(x, y + i * rowHeight)
                    .lineTo(x + tableWidth, y + i * rowHeight)
                    .stroke();
            }

            let curX = x;
            for (let i = 0; i <= colWidths.length; i++) {
                doc.moveTo(curX, y)
                    .lineTo(curX, y + rows.length * rowHeight)
                    .stroke();
                if (i < colWidths.length) curX += colWidths[i];
            }

            for (let r = 0; r < rows.length; r++) {
                let cellX = x;
                for (let c = 0; c < colWidths.length; c++) {
                    const text = rows[r][c];
                    const cellWidth = colWidths[c];
                    doc.font('Helvetica').fontSize(9).text(text, cellX + 5, y + r * rowHeight + 6, {
                        width: cellWidth - 10,
                        align: 'center',
                        ellipsis: true,
                    });
                    cellX += cellWidth;
                }
            }
        }

        doc.font('Helvetica-Bold').fontSize(12)
            .text('CARTA DE ABERTURA DE RELACIONAMENTO', margin, 70, { align: 'center' });

        doc.moveDown(1.5);

        const boxX = margin;
        let y = doc.y;
        const boxWidth = pageWidth - margin * 2;
        const boxHeight = 60;

        doc.rect(boxX, y, boxWidth, boxHeight).stroke();

        doc.font('Helvetica-Bold').fontSize(10)
            .text('[LOGO]', boxX, y + 10, { width: boxWidth, align: 'center' });

        doc.text(data.client.legalName || 'teste', boxX, y + 24, { width: boxWidth, align: 'center' });

        doc.font('Helvetica').fontSize(9)
            .text('Carta Circular', boxX, y + 38, { width: boxWidth, align: 'center' });

        doc.moveDown(4);

        doc.font('Helvetica-Bold').fontSize(10).text('Dados do Banco:');
        doc.font('Helvetica').fontSize(9)
            .text(`Banco: ${data.bank.name || 'Banco Itaú'}    Agência: ${data.client.branchNumber || '123'}`)
            .text(`Cidade: ${data.bank.bankCity || 'Maringa'}    UF: ${data.bank.ufBank || 'PR'}`);

        doc.moveDown(1);

        doc.font('Helvetica-Bold').fontSize(10)
            .text('Dados do gerente responsável pela abertura (ou setor responsável):');
        doc.font('Helvetica').fontSize(9)
            .text(`Nome: ${data.bank.bankContactManager.name || 'teste'}    Telefone/Celular: ${data.bank.bankContactManager.fone || '123456789'}`)
            .text(`E-mail: ${data.bank.bankContactManager.email || 'teste@gmail.com'}`);

        doc.moveDown(1);

        doc.font('Helvetica-Bold').fontSize(10).text('Preferência por contato:');
        const preferencias = (data.client.preferenceByContact ?? [])
            .map(p => `[${p.selected ? 'X' : ' '}] ${p.description}`).join('    ');
        doc.font('Helvetica').fontSize(9).text(preferencias || '-');

        doc.font('Helvetica').fontSize(8).fillColor('gray')
            .text('*** Este contato será utilizado apenas caso haja problemas ou atrasos no processo de liberação do relacionamento');
        doc.fillColor('black');

        doc.moveDown(1);

        doc.font('Helvetica-Bold').fontSize(10)
            .text('Assunto: Solicitação de Alteração do Processo EDI – Troca Eletrônica de Dados');
        doc.moveDown(0.5);

        doc.font('Helvetica').fontSize(9).text(
            `Prezados Senhores,\n\n` +
            `Avaliando os processos eletrônicos existentes na ${data.client.legalName || 'teste'}, percebemos a necessidade de alterarmos a forma de entrega e recebimento de arquivos eletrônicos com bancos, implantando em nossa empresa maior padronização e controle nestes processos.\n\n` +
            `Em função de atender estas necessidades de integração, informamos que a VAN NEXXERA TECNOLOGIA E SERVIÇOS S/A ficará responsável pelo tráfego de dados entre a ${data.client.legalName || 'teste'} e o Banco, para os arquivos da tabela abaixo, em substituição ao atual meio de comunicação.\n\n`
        );

        doc.font('Helvetica-Bold').fontSize(10).text('Serviço no Banco:', { underline: true });
        doc.moveDown(0.5);

        const produtosSelecionados = (data.bank.products ?? []).filter(p => p.selected);
        const produtosTableRows = produtosSelecionados.length > 0 ? produtosSelecionados.map(p => [p.name]) : [['TRANSFERENCIA']];
        const colWidthsServicos = [boxWidth];
        y = doc.y;
        drawTable(margin, y, colWidthsServicos, produtosTableRows, 25);

        doc.moveDown(produtosTableRows.length + 1);

        doc.font('Helvetica').fontSize(9).text(
            `Este processo faz parte de um novo projeto que está sendo implementado na área financeira de nossa empresa, e por esse motivo necessitamos da liberação dos arquivos solicitados, em Ambiente de Produção.\n\n` +
            `Desta forma, solicitamos que o Banco disponibilize à Nexxera os arquivos com periodicidade diária, através do meio de comunicação já utilizado com a Nexxera.\n\n` +
            `Informamos que os custos são de responsabilidade da ${data.client.legalName || 'teste'}.\n\n` +
            `Os contatos da Nexxera serão através de equipe de Relacionamento nos e-mails implantacao@nexxera.com e suporte@nexxera.com. Sendo assim, solicitamos a devida liberação dos arquivos com a maior brevidade possível, pois depende da integração para finalização do projeto.\n\n` +
            `Agradecemos com os habituais atenção e desejo já de agradecimentos.\n\n` +
            `Atenciosamente,`
        );

        doc.moveDown(1.5);

        const empresaRows = [
            [`RAZÃO SOCIAL: ${data.client.legalName || 'teste'}`, `CNPJ: ${data.client.cnpj || '123456789'}`],
            [`NOME: ${data.client.companyContact?.name || 'teste'}`, `CARGO: ${data.client.companyContact?.positionCompany || '-'}`],
            [`TELEFONE: ${data.client.companyContact?.fone || '123456789'}`, `E-MAIL: ${data.client.companyContact?.email || ''}`],
            ['', ''],
        ];
        const colWidthsEmpresa = [boxWidth * 0.5, boxWidth * 0.5];
        y = doc.y;
        drawTable(margin, y, colWidthsEmpresa, empresaRows, 22);

        doc.end();
    });
}
    
    static buildTemplatePdfFinnet(data: any): Promise<Base64URLString> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 30 });
    const stream = new PassThrough();
    const chunks: Buffer[] = [];

    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => {
      const buffer = Buffer.concat(chunks);
      fs.writeFileSync('carta_relacionamento.pdf', buffer); // remover em produção
      resolve(buffer.toString('base64'));
    });
    stream.on('error', reject);
    doc.pipe(stream);

    const PAGE_WIDTH = 595.28;
    const CONTENT_WIDTH = PAGE_WIDTH - doc.page.margins.left - doc.page.margins.right;

    const textOptions = { width: CONTENT_WIDTH, align: 'justify', lineGap: 1.2 };

    const addParagraph = (text: string, spacing: number = 0.3) => {
      doc.moveDown(spacing).fontSize(10).font('Helvetica').text(text, textOptions);
    };

    const addTitle = (text: string, spacing: number = 0.6) => {
      doc.moveDown(spacing).fontSize(10.5).font('Helvetica-Bold').text(text, { width: CONTENT_WIDTH });
    };

    // Header
    if (data.bank?.name) {
      doc.fontSize(10.5).font('Helvetica-Bold').text(`Ao ${data.bank.name}`, { width: CONTENT_WIDTH });
      doc.moveDown(0.1);
      doc.font('Helvetica').text(`A/c ${data.bank.bankContactManager?.name ?? ''}`, { width: CONTENT_WIDTH });
    }

    addParagraph(
      `Comunicamos que nossa empresa passou a operar os relacionamentos de EDI, transferência eletrônica, através da VAN FINNET. Solicitamos que esta Instituição disponibilize o suporte necessário para viabilizar esta implantação, onde as ações necessárias para esta migração serão conduzidas juntamente com a FINNET.`,
      0.6
    );

    addTitle('Contratante');
    if (data.client) {
      addParagraph(`Razão Social: ${data.client.legalName}`);
      addParagraph(`CNPJ: ${data.client.cnpj}`);
      addParagraph(`Agência / Conta corrente: ${data.client.branchNumber} | ${data.client.accountNumber}`);
      addParagraph(`Convênio: ${data.client.agreement}`);
    }

    addTitle('VAN Contratada');
    addParagraph('Razão Social: FINNET S/A Tecnologia');
    addParagraph('CNPJ: 05.607.266/0001-10');

    addTitle('Produtos Financeiros');
    data.bank?.products?.forEach((product: any) => {
      const check = product.selected ? 'X' : ' ';
      addParagraph(`(${check}) ${product.description}`, 0.2);
    });

    addParagraph('(X) Arquivo em produção', 0.5);

    addParagraph('CNAB', 0.5);
    data.bank?.cnabs?.forEach((cnab: any) => {
      const check = cnab.selected ? 'X' : ' ';
      addParagraph(`(${check}) ${cnab.name}`, 0.2);
    });

    addParagraph(
      'Os custos serão assumidos 100% pela Empresa (alterar para 100% Banco se assim for acordo entre Empresa e Banco).',
      0.5
    );

    addTitle('Contato da Empresa');
    const contato = data.client?.companyContact;
    if (contato) {
      addParagraph(`Nome: ${contato.name}`);
      addParagraph(`E-mail: ${contato.email}`);
      addParagraph(`Telefone: ${contato.fone}`);
    }

    addTitle('Contato da VAN FINNET');
    addParagraph('Nome: Bianca e João');
    addParagraph('E-mail: pis.posvenda@finnet.com.br');
    addParagraph('Telefone: (11) 94457-8493 | (11) 99189-2213');

    addTitle('Responsável Técnico');
    addParagraph('Nome: Vinicius Maier');
    addParagraph('E-mail: viniciusmaierecw@gmail.com');
    addParagraph('Telefone: (44) 99962-4364');

    const gerente = data.bank?.bankContactManager;
    if (gerente) {
      addTitle('Gerente de Conta');
      addParagraph(`Nome: ${gerente.name}`);
      addParagraph(`E-mail: ${gerente.email}`);
      addParagraph(`Telefone: ${gerente.fone}`);
    }

    addParagraph('Colocamo-nos à disposição para quaisquer esclarecimentos adicionais.', 0.6);

    doc.moveDown(4);
    doc.font('Helvetica-Bold').fontSize(10).text('Atenciosamente,', {
      width: CONTENT_WIDTH,
    });
    doc.moveDown(2)
    doc.moveTo(doc.x, doc.y).lineTo(doc.x + 180, doc.y).stroke();
    doc.font('Helvetica').fontSize(8.5).text('Assinatura do responsável pela empresa');

    doc.end();
  });
}

}