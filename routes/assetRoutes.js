const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');
const upload = require('../utils/multer');

// Create Asset
router.post('/', upload.fields([
    { name: 'asset_images', maxCount: 5 },
    { name: 'uploaded_files', maxCount: 5 }
]), assetController.createAsset);

// List All Assets
router.get('/', assetController.getAssets);

// Update Asset
router.put('/:id', upload.fields([
    { name: 'asset_images', maxCount: 5 },
    { name: 'uploaded_files', maxCount: 5 }
]), assetController.updateAsset);

// Delete Asset
router.delete('/:id', assetController.deleteAsset);


module.exports = router;
