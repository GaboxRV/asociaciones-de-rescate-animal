
import Image from "next/image";
import styles from "./page.module.css";
import {conn} from "../lib/conexion";
import { fetchEventos } from "@/lib/data";

export default async function Home() {

  const eventos = await fetchEventos();


  console.log(eventos);
  
  return (
    <main>
    </main>

  );
}
