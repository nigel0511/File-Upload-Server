import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("meta")
export class Meta {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar", length: 255, nullable: false })
  title: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  startDateTime: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  location: string;

  @Column({ type: "bigint", nullable: false })
  fileSize: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  format: string;

  @Column({ type: "varchar", nullable: false })
  uploadDate: string;
}
