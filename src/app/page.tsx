
import Image from "next/image";
import styles from "./page.module.css";
import {conn} from "../lib/conexion";

export default async function Home() {

  const res = await conn.query('SELECT NOW()');

  console.log(res.rows[0].now);

  const prueba = "" + res.rows[0].now;
  
  return (
    <main>
      <p>{prueba}</p>
    </main>

  );
}
