const express = require('express');
const router = express.Router();
const { listVariants, updateVariantStatus } = require('../controllers/variantsController');

router.get('/', listVariants);
router.put('/:variantId/status', updateVariantStatus);

module.exports = router;
