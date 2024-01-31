import { MigrationInterface, QueryRunner } from "typeorm";

export class Stocks1706667559053 implements MigrationInterface {
    name = 'Stocks1706667559053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`stocks\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL, \`description\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`medicine_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`stocks\` ADD CONSTRAINT \`FK_9302ae54bb061dbde977d99049a\` FOREIGN KEY (\`medicine_id\`) REFERENCES \`medicines\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`stocks\` DROP FOREIGN KEY \`FK_9302ae54bb061dbde977d99049a\``);
        await queryRunner.query(`DROP TABLE \`stocks\``);
    }

}
