import { Pool } from 'pg';

let conn: any;

if (!conn) {
  conn = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'proyecto',
    password: 'nova',
    port: 5432

  });

}

export { conn };




