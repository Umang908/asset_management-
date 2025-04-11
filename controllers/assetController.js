const Joi = require('joi');
const Asset = require('../models/assets');
const { Op } = require('sequelize');

// Asset Validation Schema
const assetSchema = Joi.object({
    asset_name: Joi.string().max(100).required(),
    asset_code: Joi.string().optional(),
    category: Joi.string().required(),
    location: Joi.string().required(),
    status: Joi.string().required(),
    asset_condition: Joi.string().required(),
    ownership: Joi.string().valid('Self-Owned', 'Partner').required(),
    capitalization_date: Joi.date().max('now').required(),
});

// Create Asset
exports.createAsset = async (req, res) => {
    try {
        const {
            asset_name, asset_code, category, cwip_invoice_id, location,
            status, condition, brand, model, linked_asset_id, description,
            vendor_name, po_number, invoice_date, invoice_no, purchase_date,
            purchase_price, ownership, capitalization_price, end_of_life,
            capitalization_date, depreciation_percent, accumulated_depreciation,
            scrap_value, income_tax_depreciation_percent, location_hierarchy, asset_condition
        } = req.body;

        const asset_images = req.files['asset_images']?.map(file => file.filename) || [];
        const uploaded_files = req.files['uploaded_files']?.map(file => file.filename) || [];

        // If no asset_code, generate one
        const finalAssetCode = asset_code || `AST-${Math.floor(1000 + Math.random() * 9000)}`;

        const newAsset = await Asset.create({
            asset_name,
            asset_code: finalAssetCode,
            category,
            cwip_invoice_id,
            status,
            asset_condition,
            brand,
            model,
            linked_asset_id,
            description,
            asset_images,
            uploaded_files,
            vendor_name,
            po_number,
            invoice_date,
            invoice_no,
            purchase_date,
            purchase_price,
            ownership,
            capitalization_price,
            end_of_life,
            capitalization_date,
            depreciation_percent,
            accumulated_depreciation,
            scrap_value,
            income_tax_depreciation_percent,
            location_hierarchy
        });

        res.status(201).json({ message: "Asset Created Successfully", data: newAsset });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get All Assets
exports.getAssets = async (req, res) => {
    try {
        const { category, status } = req.query;
        const whereCondition = {};
        if (category) {
            whereCondition.category = category;
        }

        if (status) {
            whereCondition.status = status;
        }

        const assets = await Asset.findAll({
            attributes: ['id', 'asset_name', 'asset_code', 'category', 'location_hierarchy', 'status', 'asset_condition'],
            where: whereCondition
        });

        res.status(200).json({ message: "Assets fetched successfully", data: assets });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.updateAsset = async (req, res) => {
    try {
        const assetId = req.params.id;
        const {
            asset_name, asset_code, category, cwip_invoice_id, location,
            status, condition, brand, model, linked_asset_id, description,
            vendor_name, po_number, invoice_date, invoice_no, purchase_date,
            purchase_price, ownership, capitalization_price, end_of_life,
            capitalization_date, depreciation_percent, accumulated_depreciation,
            scrap_value, income_tax_depreciation_percent
        } = req.body;

        const asset_images = req.files['asset_images']?.map(file => file.filename) || [];
        const uploaded_files = req.files['uploaded_files']?.map(file => file.filename) || [];

        // 1. Check for duplicate asset_name
        const existingName = await Asset.findOne({
            where: {
                asset_name,
                id: { [Op.ne]: assetId }
            }
        });

        if (existingName) {
            return res.status(400).json({ message: "Asset Name already exists" });
        }

        // 2. Check for duplicate asset_code
        const existingCode = await Asset.findOne({
            where: {
                asset_code,
                id: { [Op.ne]: assetId }
            }
        });

        if (existingCode) {
            return res.status(400).json({ message: "Asset Code already exists" });
        }

        // 3. Update Asset
        const updated = await Asset.update({
            asset_code,
            category,
            cwip_invoice_id,
            location_hierarchy: location,
            status,
            asset_condition: condition,
            brand,
            model,
            linked_asset_id,
            description,
            asset_images,
            uploaded_files,
            vendor_name,
            po_number,
            invoice_date,
            invoice_no,
            purchase_date,
            purchase_price,
            ownership,
            capitalization_price,
            end_of_life,
            capitalization_date,
            depreciation_percent,
            accumulated_depreciation,
            scrap_value,
            income_tax_depreciation_percent
        }, {
            where: { id: assetId }
        });

        if (updated[0] === 0) {
            return res.status(404).json({ message: "Asset not found" });
        }

        res.status(200).json({ message: "Asset Updated Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.deleteAsset = async (req, res) => {
    try {
        const assetId = req.params.id;

        // Check if asset exists
        const asset = await Asset.findByPk(assetId);

        if (!asset) {
            return res.status(404).json({ message: "Asset not found" });
        }

        // Delete the asset
        await asset.destroy();

        res.status(200).json({ message: "Asset Deleted Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};