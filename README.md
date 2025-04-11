CREATE TABLE `assets` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `asset_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `asset_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `category` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `cwip_invoice_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `location_hierarchy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('In Use','In Stock','Out for Repair') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `asset_condition` enum('New','Good','Damaged','Poor') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `brand` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `model` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `linked_asset_id` bigint DEFAULT '0',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `asset_images` json DEFAULT NULL,
  `upload_files` json DEFAULT NULL,
  `vendor_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `po_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `invoice_date` date DEFAULT NULL,
  `invoice_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `purchase_price` decimal(15,2) DEFAULT NULL,
  `ownership` enum('Self-Owned','Partner') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `capitalization_price` decimal(15,2) DEFAULT NULL,
  `end_of_life` date DEFAULT NULL,
  `capitalization_date` date NOT NULL,
  `depreciation_percent` decimal(5,2) DEFAULT NULL,
  `accumulated_depreciation` decimal(15,2) DEFAULT NULL,
  `scrap_value` decimal(15,2) DEFAULT '0.00',
  `income_tax_depreciation_percent` decimal(5,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `asset_name` (`asset_name`),
  UNIQUE KEY `asset_code` (`asset_code`),
  KEY `linked_asset_id` (`linked_asset_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
