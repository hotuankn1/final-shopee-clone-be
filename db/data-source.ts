import { DataSource, DataSourceOptions } from "typeorm";


export const dataSourceOptions: DataSourceOptions = {
    type:'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'hotuan123',
    database:'final-shopee-clone',
    logging: true,
    entities: ['./dist/src/**/*.entity.{ts,js}'],
    migrations:['./dist/db/migrations/*.{ts,js}']
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource