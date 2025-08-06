-- DropForeignKey
ALTER TABLE `ht_counter_filter` DROP FOREIGN KEY `ht_counter_filter_transfer_counter_id_fkey`;

-- DropIndex
DROP INDEX `ht_counter_filter_transfer_counter_id_fkey` ON `ht_counter_filter`;

-- AddForeignKey
ALTER TABLE `ht_counter_filter` ADD CONSTRAINT `ht_counter_filter_transfer_counter_id_fkey` FOREIGN KEY (`transfer_counter_id`) REFERENCES `ht_counter_filter`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
