-- AlterTable
ALTER TABLE `tokens` ADD COLUMN `token_transfer_department_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `tokens` ADD CONSTRAINT `tokens_token_transfer_department_id_fkey` FOREIGN KEY (`token_transfer_department_id`) REFERENCES `ht_department`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
