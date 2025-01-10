
import Carrusel from "@/ui/home/Carrusel";
import { fetchEventos } from "@/lib/data";
import { Evento } from "@/lib/definiciones";
import styles from "@/ui/home/page.module.css";

export default async function Home() {
  const eventos: Evento[] = await fetchEventos();

  return (
    <main className={styles.pagina}>
      <div className={styles.home_informacion}>
        <div className={styles.descripcion}>
          <h2 className={styles.nombre}>Sistema web para la administración de información y difusión de las adopciones dentro de las asociaciones de rescate animal</h2>
          <small>Este proyecto aborda el desarrollo de un sistema web colaborativo enfocado en apoyar a las asociaciones de rescate animal. Este sistema permite que cualquier organización de rescate comparta información sobre los animales que han sido rescatados. El sistema mantendrá un registro de la lista de animales rescatados junto con la información general de la organización que los haya registrado y mostrará la puntuación asignada por los usuarios a esa asociación.</small>
        </div>
      </div>
      <Carrusel
        eventos={eventos}
      />
    </main>
  );
}
