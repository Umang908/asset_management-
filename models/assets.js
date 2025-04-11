
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// module.exports = (sequelize, DataTypes) => {
const Asset = sequelize.define('assets', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  asset_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  asset_code: {
    type: DataTypes.STRING(50),
    allowNull: true,
    unique: true
  },
  category: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  cwip_invoice_id: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  location_hierarchy: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('In Use', 'In Stock', 'Out for Repair'),
    allowNull: false
  },
  asset_condition: {
    type: DataTypes.ENUM('New', 'Good', 'Damaged', 'Poor'),
    allowNull: false
  },
  brand: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  model: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  linked_asset_id: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  asset_images: {
    type: DataTypes.JSON,
    allowNull: true
  },
  upload_files: {
    type: DataTypes.JSON,
    allowNull: true
  },
  vendor_name: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  po_number: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  invoice_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  invoice_no: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  purchase_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  purchase_price: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true
  },
  ownership: {
    type: DataTypes.ENUM('Self-Owned', 'Partner'),
    allowNull: false
  },
  capitalization_price: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true
  },
  end_of_life: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  capitalization_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  depreciation_percent: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  accumulated_depreciation: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true
  },
  scrap_value: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
    defaultValue: 0.00
  },
  income_tax_depreciation_percent: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  }
}, {
  tableName: 'assets',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});
// return Asset;
// }

module.exports = Asset;