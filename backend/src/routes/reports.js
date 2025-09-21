const express = require('express');
const router = express.Router();
const { generateReport, downloadReport } = require('../controllers/reportsController');

router.post('/generate-report', generateReport);
router.get('/download-report/:filename', downloadReport);

module.exports = router;
