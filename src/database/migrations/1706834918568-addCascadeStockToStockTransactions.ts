import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascadeStockToStockTransactions1706834918568 implements MigrationInterface {
    name = 'AddCascadeStockToStockTransactions1706834918568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`stock_transactions\` DROP FOREIGN KEY \`FK_4dbf317b2227e136b7faf7aac1d\``);
        await queryRunner.query(`ALTER TABLE \`stock_transactions\` ADD CONSTRAINT \`FK_4dbf317b2227e136b7faf7aac1d\` FOREIGN KEY (\`stock_id\`) REFERENCES \`stocks\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`stock_transactions\` DROP FOREIGN KEY \`FK_4dbf317b2227e136b7faf7aac1d\``);
        await queryRunner.query(`ALTER TABLE \`stock_transactions\` ADD CONSTRAINT \`FK_4dbf317b2227e136b7faf7aac1d\` FOREIGN KEY (\`stock_id\`) REFERENCES \`stocks\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
