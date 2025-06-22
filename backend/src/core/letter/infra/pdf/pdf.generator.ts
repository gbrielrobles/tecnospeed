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
    const doc = new PDFDocument({ size: 'A4', margin: 15 });
    const stream = new PassThrough();
    const chunks: Buffer[] = [];

    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => {
      const buffer = Buffer.concat(chunks);
      resolve(buffer.toString('base64'));
    });
    stream.on('error', reject);
    doc.pipe(stream);

    const CONTENT_WIDTH = doc.page.width - doc.page.margins.left - doc.page.margins.right;

    const addParagraph = (text: string, spacing = 0.3) => {
      doc.moveDown(spacing).fontSize(10).font('Helvetica').text(text, { align: 'left' });
    };

    const addBoldParagraph = (text: string, spacing = 0.3) => {
      doc.moveDown(spacing).fontSize(10).font('Helvetica-Bold').text(text, { align: 'left' });
    };

    const addIndentedParagraph = (text: string) => {
      doc.moveDown(0.4);
      doc.fontSize(10).font('Helvetica').text('     ' + text, { align: 'left' });
    };

    const addSectionTitle = (text: string, spacing = 0.7) => {
      doc.moveDown(spacing).fontSize(10).font('Helvetica-Bold').text(text, { align: 'left' });
    };

    // Topo
    addBoldParagraph(`Ao BANCO ${data.bank?.name ?? '[NOME DO BANCO]'}`, 0);
    addBoldParagraph(`A/C ${data.bank?.bankContactManager?.name ?? '[NOME DO GERENTE DA CONTA]'}`);
    addBoldParagraph(`Assunto: Intercâmbio de Arquivos – ${data.client?.legalName ?? '[NOME DA EMPRESA]'}`);

    // Parágrafos
    addIndentedParagraph('Comunicamos que nossa empresa passou a operar os relacionamentos de EDI, transferência eletrônica de arquivos, através da VAN FINNET.');
    addParagraph('Solicitamos que esta Instituição disponibilize o suporte necessário para viabilizar esta implantação, onde as ações necessárias para esta migração serão conduzidas juntamente com a FINNET.');

    // Contratante
    addSectionTitle('Contratante');
    addBoldParagraph(`Razão Social: ${data.client?.legalName ?? '[NOME DA EMPRESA]'}`);
    addBoldParagraph(`CNPJ: ${data.client?.cnpj ?? '[CNPJ DA EMPRESA]'}`);
    addBoldParagraph(`Agência / Conta Corrente: ${data.client?.branchNumber} | ${data.client?.accountNumber}`);
    addBoldParagraph(`Convênio: ${data.client?.agreement ?? '[CONVÊNIO DA EMPRESA]'}`);

    // VAN
    addSectionTitle('Van Contratada');
    addBoldParagraph('Razão Social: FINNET S/A Tecnologia');
    addBoldParagraph('CNPJ: 05.607.266/0001-10');

    // Produtos
    addSectionTitle('Produtos Financeiros');
    const produtos = data.bank?.products; 

    produtos.forEach((p: any) => {
      const mark = p.selected ? 'X' : ' ';
      addParagraph(`(${mark}) ${p.name?.charAt(0).toUpperCase() + p.name?.slice(1).toLowerCase()}`, 0.15);
    });

    // Ambiente
    addSectionTitle('Ambiente');
    addParagraph('(X) Arquivo em produção');

    // CNAB
    addSectionTitle('Cnab');
    const cnabs = data.bank?.cnabs ?? [{ name: '240', selected: false }, { name: '400', selected: false }];
    cnabs.forEach((c: any) => {
      const mark = c.selected ? 'X' : ' ';
      addParagraph(`(${mark}) ${c.name}`, 0.15);
    });

    // Custos
    addParagraph(
      'Os custos serão assumidos 100% pela Empresa (alterar para 100% Banco se assim for negociado entre Empresa e Banco).',
      0.6
    );

    // Contato da Empresa
    addParagraph('Qualquer dúvida contatar:', 0.6);
    addSectionTitle('Contato da Empresa', 0.5);
    const contato = data.client?.companyContact ?? {};
    addBoldParagraph(`Nome: ${contato.name ?? '[NOME DO RESPONSÁVEL DA EMPRESA]'}`);
    addBoldParagraph(`E-mail: ${contato.email ?? '[EMAIL]'}`);
    addBoldParagraph(`Telefone: ${contato.fone ?? '[TELEFONE]'}`);

    // Contato VAN
    addSectionTitle('Contato da VAN FINNET');
    addBoldParagraph('Nome: Bianca e João');
    addBoldParagraph('E-mail: pis.posvenda@finnet.com.br');
    addBoldParagraph('Telefone: (11) 94457-8493 (11) 99189-2213');

    // Técnico
    addSectionTitle('Contato do responsável técnico');
    addBoldParagraph(`Nome: ${data.technical?.name ?? '[RESPONSÁVEL TECNOSPEED]'}`);
    addBoldParagraph(`E-mail: ${data.technical?.email ?? '[EMAIL TECNOSPEED]'}`);

    // Gerente
    addSectionTitle('Contato do gerente de conta');
    const gerente = data.bank?.bankContactManager ?? {};
    addBoldParagraph(`Nome: ${gerente.name ?? '[GERENTE]'}`);
    addBoldParagraph(`E-mail: ${gerente.email ?? '[EMAIL]'}`);
    addBoldParagraph(`Telefone: ${gerente.fone ?? '[TELEFONE]'}`);

    // Finalização
    doc.moveDown(1);
    doc.font('Helvetica-Bold').text(
      'Colocamo-nos à disposição para quaisquer esclarecimentos adicionais.',
      { align: 'center' }
    );

    doc.moveDown(1);
    doc.font('Helvetica-Bold').text('Atenciosamente,', { align: 'right' });

    // Linha de assinatura
    doc.moveDown(2);
    const x = doc.x;
    doc.moveTo(x, doc.y).lineTo(x + 200, doc.y).stroke();
    doc.moveDown(0.3);
    doc.fontSize(9).font('Helvetica').text('Assinatura do Responsável pela empresa', {
      align: 'start'
    });

    doc.end();
  });
}
}