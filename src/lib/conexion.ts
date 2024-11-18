import { Pool } from 'pg';

let conn: any;

if (!conn) {
  conn = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'asociaciones_de_rescate',
    password: 'deepblue123',
    port: 5433
  });

}

export { conn };