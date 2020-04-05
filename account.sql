CREATE TABLE `account` (
	`acc_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`acc_username` VARCHAR(45) NOT NULL,
	`acc_password` VARCHAR(32) NOT NULL,
	`acc_last_name` VARCHAR(30) NOT NULL,
	`acc_first_name` VARCHAR(60) NOT NULL,
	`acc_type` ENUM('admin','dev','user','sales') NOT NULL DEFAULT 'user',
	`acc_failed_login` TINYINT(3) UNSIGNED NOT NULL DEFAULT '0',
	`acc_status` ENUM('active','locked','deleted') NOT NULL DEFAULT 'active',
	`acc_last_login` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`cnt_id` INT(11) NULL DEFAULT '1',
	`acc_last_modified` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`acc_id`),
	UNIQUE INDEX `username` (`acc_username`),
	INDEX `cnt_id` (`cnt_id`)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=178
;
