const fs = require('fs');
const PDFDocument = require('pdfkit');

const doc = new PDFDocument();
const file = JSON.parse(fs.readFileSync('./casa-carezza-export.json', 'utf-8'));
const users = file.users.map(user => `${user.emails[0]}\n${user.properties.map(prop => `    PERIODO: ${prop.period} - APPARTAMENTO: ${prop.flat}`).join('\n')}`);

doc.pipe(fs.createWriteStream('./lista.pdf'));

doc
    .fontSize(12)
    .text(users.join('\n\n'), 100, 100);

doc.end();
