import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Model, Table, Column, DataType } from "sequelize-typescript";

const { DB_SCHEMA = "boh" } = process.env;

@Table({
  paranoid: true,
  timestamps: true,
  underscored: false,
  schema: DB_SCHEMA,
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  deletedAt: "deletedAt",
  tableName: "products",
})
export class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare category: string;

  // TODO: add price column
  // @Column({
  //     type: DataType.DECIMAL(10, 2),
  //     allowNull: false,
  // })
  // declare price: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare link: string;
}
