const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const reportsRoot = path.join(__dirname, '..', '..', 'reports');

const generateReport = (req, res) => {
  try {
    const { approvedVariants } = req.body;
    if (!approvedVariants || !Array.isArray(approvedVariants)) {
      return res.status(400).json({ error: 'Invalid approved variants data' });
    }

    if (!fs.existsSync(reportsRoot)) {
      fs.mkdirSync(reportsRoot, { recursive: true });
    }

    const doc = new PDFDocument();
    const filename = `variant-report-${Date.now()}.pdf`;
    const filepath = path.join(reportsRoot, filename);
    doc.pipe(fs.createWriteStream(filepath));

    doc.fontSize(20).text('Genomic Variant Analysis Report', 50, 50);
    doc.fontSize(12).text(`Generated on: ${new Date().toLocaleDateString()}`, 50, 80);
    doc.moveDown(2);
    doc.fontSize(16).text('Approved Variants:', 50, doc.y);
    doc.moveDown();

    approvedVariants.forEach((variant, index) => {
      const yPosition = doc.y;
      doc.fontSize(14).text(`${index + 1}. ${variant.gene} (${variant.variant_id})`, 50, yPosition);
      doc.fontSize(10);
      doc.text(`Classification: ${variant.classification}`, 70, yPosition + 20);
      doc.text(`Location: chr${variant.chromosome}:${variant.position}`, 70, yPosition + 35);
      doc.text(`Change: ${variant.ref_allele} → ${variant.alt_allele}`, 70, yPosition + 50);
      doc.text(`Frequency: ${(variant.frequency * 100).toFixed(2)}%`, 70, yPosition + 65);
      doc.moveDown(2);
    });

    doc.moveDown();
    doc.fontSize(12).text(`Total Approved Variants: ${approvedVariants.length}`, 50, doc.y);
    doc.end();

    res.json({
      message: 'Report generated successfully',
      filename,
      variantCount: approvedVariants.length,
      downloadUrl: `/api/download-report/${filename}`
    });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
};

const downloadReport = (req, res) => {
  try {
    const { filename } = req.params;
    const filepath = path.join(reportsRoot, filename);
    if (!fs.existsSync(filepath)) {
      return res.status(404).json({ error: 'Report not found' });
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    const fileStream = fs.createReadStream(filepath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error downloading report:', error);
    res.status(500).json({ error: 'Failed to download report' });
  }
};

module.exports = { generateReport, downloadReport };
