const { mockVariants } = require('../data/mockVariants');

const variantStatuses = {};

const listVariants = (req, res) => {
  try {
    const variants = mockVariants.map(v => ({
      ...v,
      status: variantStatuses[v.variant_id] || 'pending'
    }));
    res.json(variants);
  } catch (error) {
    console.error('Error fetching variants:', error);
    res.status(500).json({ error: 'Failed to fetch variants' });
  }
};

const updateVariantStatus = (req, res) => {
  try {
    const { variantId } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    variantStatuses[variantId] = status;
    res.json({ message: `Variant ${variantId} status updated to ${status}` , variantId, status });
  } catch (error) {
    console.error('Error updating variant status:', error);
    res.status(500).json({ error: 'Failed to update variant status' });
  }
};

module.exports = { listVariants, updateVariantStatus };
