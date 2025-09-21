const fs = require('fs');
const multer = require('multer');
const path = require('path');

const uploadsRoot = path.join(__dirname, '..', '..', 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadsRoot)) {
      fs.mkdirSync(uploadsRoot, { recursive: true });
    }
    cb(null, uploadsRoot);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  const isVcf = file.mimetype.includes('text') || file.originalname.endsWith('.vcf') || file.originalname.endsWith('.vcf.gz');
  if (isVcf) return cb(null, true);
  cb(new Error('Only VCF files are allowed!'), false);
};

const upload = multer({ storage, fileFilter });

module.exports = { upload };
