CREATE TABLE `media_web_raw` (
	`mwe_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`mwe_src_url` TEXT NOT NULL,
	`mwe_src_aut_full_name` TEXT NOT NULL COLLATE 'utf8mb4_general_ci',
	`mwe_src_aut_first_name` TEXT NOT NULL COLLATE 'utf8mb4_general_ci',
	`mwe_src_aut_last_name` TEXT NOT NULL COLLATE 'utf8mb4_general_ci',
	`mwe_src_med_type` VARCHAR(100) NOT NULL,
	`mwe_full_url` TEXT NOT NULL,
	`mwe_view_url` TEXT NOT NULL,
	`mwe_content` TEXT NOT NULL COLLATE 'utf8mb4_general_ci',
	`mwe_title` TEXT NOT NULL COLLATE 'utf8mb4_general_ci',
	`mwe_section` VARCHAR(256) NOT NULL,
	`mwe_val` DECIMAL(10,2) NOT NULL,
	`mwe_mod_val` DECIMAL(10,2) NOT NULL,
	`mwe_date` DATE NOT NULL,
	`mwe_datetime` DATETIME NOT NULL,
	`mwe_last_modified` DATETIME NOT NULL DEFAULT '0000-00-00 00:00:00',
	`mwe_process_date` DATETIME NOT NULL,
	`mwe_processed_id` BIGINT(20) NOT NULL,
	`mwe_content_html` MEDIUMTEXT NULL,
	`mwe_img_vid_url` TEXT NULL,
	`mwe_status` VARCHAR(50) NULL DEFAULT 'Done',
	`mwe_pub_name` VARCHAR(300) NULL DEFAULT NULL,
	`mwe_pub_cc` VARCHAR(10) NULL DEFAULT NULL,
	`mwe_created_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
	`mwe_lang` VARCHAR(20) NULL DEFAULT 'en',
	PRIMARY KEY (`mwe_id`),
	INDEX `mwe_process_date` (`mwe_process_date`),
	INDEX `mwe_datetime` (`mwe_datetime`),
	INDEX `mwe_date` (`mwe_date`),
	INDEX `mwe_src_url` (`mwe_src_url`(100)),
	INDEX `mwe_full_url` (`mwe_full_url`(500)),
	INDEX `mwe_processed_id` (`mwe_processed_id`),
	INDEX `mwe_status` (`mwe_status`),
	INDEX `mwe_process_date_mwe_status` (`mwe_process_date`, `mwe_status`),
	INDEX `mwe_full_url_mwe_status` (`mwe_full_url`(500), `mwe_status`),
	INDEX `mwe_created_date` (`mwe_created_date`),
	INDEX `mwe_process_date_mwe_pub_cc` (`mwe_process_date`, `mwe_pub_cc`),
	INDEX `mwe_pub_cc` (`mwe_pub_cc`)
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=62502717
;
