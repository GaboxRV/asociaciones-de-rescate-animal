import { Pool } from 'pg';

let conn: any;

if (!conn) {
  conn = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'asociaciones_de_rescate',
    password: 'post123e',
    port: 5432
  });

}

export { conn };