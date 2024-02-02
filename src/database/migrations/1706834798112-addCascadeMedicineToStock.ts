import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascadeMedicineToStock1706834798112 implements MigrationInterface {
    name = 'AddCascadeMedicineToStock1706834798112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`stocks\` DROP FOREIGN KEY \`FK_9302ae54bb061dbde977d99049a\``);
        await queryRunner.query(`ALTER TABLE \`stocks\` ADD CONSTRAINT \`FK_9302ae54bb061dbde977d99049a\` FOREIGN KEY (\`medicine_id\`) REFERENCES \`medicines\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`stocks\` DROP FOREIGN KEY \`FK_9302ae54bb061dbde977d99049a\``);
        await queryRunner.query(`ALTER TABLE \`stocks\` ADD CONSTRAINT \`FK_9302ae54bb061dbde977d99049a\` FOREIGN KEY (\`medicine_id\`) REFERENCES \`medicines\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
