-- CreateTable
CREATE TABLE `ht_user_session_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hash_id` VARCHAR(36) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `company_id` INTEGER NOT NULL,
    `counter_id` INTEGER NOT NULL,
    `login_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `logout_time` DATETIME(6) NULL,

    UNIQUE INDEX `ht_user_session_logs_hash_id_key`(`hash_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ht_user_session_logs` ADD CONSTRAINT `ht_user_session_logs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `ht_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ht_user_session_logs` ADD CONSTRAINT `ht_user_session_logs_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `ht_company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ht_user_session_logs` ADD CONSTRAINT `ht_user_session_logs_counter_id_fkey` FOREIGN KEY (`counter_id`) REFERENCES `ht_counter_filter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
