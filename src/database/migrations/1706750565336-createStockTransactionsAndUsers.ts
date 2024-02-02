import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStockTransactionsAndUsers1706750565336 implements MigrationInterface {
    name = 'CreateStockTransactionsAndUsers1706750565336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`stock_transactions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity_transaction\` int NOT NULL, \`quantity_before\` int NOT NULL, \`quantity_after\` int NOT NULL, \`transition_type\` enum ('inbound', 'outbound') NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`stock_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        //await queryRunner.query(`CREATE TABLE \`Users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`role\` int NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`stock_transactions\` ADD CONSTRAINT \`FK_4dbf317b2227e136b7faf7aac1d\` FOREIGN KEY (\`stock_id\`) REFERENCES \`stocks\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`stock_transactions\` DROP FOREIGN KEY \`FK_4dbf317b2227e136b7faf7aac1d\``);
        await queryRunner.query(`DROP TABLE \`Users\``);
        await queryRunner.query(`DROP TABLE \`stock_transactions\``);
    }

}
