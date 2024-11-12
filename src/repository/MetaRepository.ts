// import { AppDataSource } from "../common/data-source"; // Assuming your TypeORM datasource is set up in this file
// import { Meta } from "../entity/Meta"; // Import your Meta entity
// import { Repository } from "typeorm";

// export class MetaRepository {
//   private metaRepository: Repository<Meta>;

//   constructor() {
//     this.metaRepository = AppDataSource.getRepository(Meta);
//   }

//   // Example: Create a new Meta record
//   async createMeta(metaData: Partial<Meta>): Promise<Meta> {
//     const meta = this.metaRepository.create(metaData); // Create a new Meta object
//     return await this.metaRepository.save(meta); // Save it to the database
//   }

//   // Example: Get a Meta by id
//   async getMetaById(id: number): Promise<Meta | null> {
//     return await this.metaRepository.findOne({ where: { id } });
//   }

//   // Example: Get all metas
//   async getAllMetas(): Promise<Meta[]> {
//     return await this.metaRepository.find();
//   }

//   // Example: Update a Meta record by id
//   async updateMeta(
//     id: number,
//     updatedData: Partial<Meta>
//   ): Promise<Meta | null> {
//     const meta = await this.metaRepository.findOne({ where: { id } });
//     if (!meta) return null;
//     this.metaRepository.merge(meta, updatedData); // Merge updated data into the existing entity
//     return await this.metaRepository.save(meta); // Save updated entity
//   }

//   // Example: Delete a Meta record
//   async deleteMeta(id: number): Promise<void> {
//     await this.metaRepository.delete(id); // Delete a Meta record by id
//   }
// }
