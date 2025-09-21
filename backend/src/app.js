const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const { upload } = require('./config/upload');
const variantsRouter = require('./routes/variants');
const reportsRouter = require('./routes/reports');

const app = express();


app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Variant Review API is running' });
});

app.post('/api/upload-vcf', upload.single('vcf'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { mockVariants } = require('./data/mockVariants');
    const response = {
      message: 'VCF file uploaded successfully',
      filename: req.file.filename,
      variants: mockVariants.length,
      data: mockVariants
    };
    res.json(response);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

app.use('/api/variants', variantsRouter);
app.use('/api', reportsRouter);

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large' });
    }
  }
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
