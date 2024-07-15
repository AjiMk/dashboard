export default abstract class Seeder {

    /**
     * Get seeder name
     * 
     */
    abstract getName(): string;

    /**
     * Get seeder data
     * 
     */
    abstract getData(): any[];

    /**
     * Seed data
     * 
     * @param {any[]} insertData
     * @returns {Promise<boolean>}
     */
    abstract seed(insertData: any[]): Promise<boolean>;

    /**
     * Run seeder
     * 
     * @return {Promise<boolean>}
     */
    async run(): Promise<boolean> {
        const data = this.getData();
        await this.seed(data);

        return true;
    }
}