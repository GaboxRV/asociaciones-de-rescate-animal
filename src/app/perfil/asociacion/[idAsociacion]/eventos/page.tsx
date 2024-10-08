import BotonCrearEvento from "@/ui/perfil/botones/BotonCrearEvento";

export default async function Eventos({ params } : { params: { idAsociacion: string}}) {

    return (
        <div>
            <h1>Eventos</h1>
            <BotonCrearEvento asociacion_id={params.idAsociacion} />
        </div>
    );
}