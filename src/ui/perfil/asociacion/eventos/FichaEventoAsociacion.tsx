import BotonEditarEvento from "@/ui/perfil/botones/BotonEditarEvento";
import BotonEliminarEvento from "@/ui/perfil/botones/BotonEliminarEvento";

export default async function FichaEventoAsociacion({evento_id, nombre_evento, descripcion_evento, direccion_evento, foto_evento, asociacion_id, alcaldia_id} : {evento_id: string, nombre_evento: string, descripcion_evento: string, direccion_evento: string, foto_evento: string, asociacion_id: string, alcaldia_id: string}){
    return(
        <div>
            <h1>{nombre_evento}</h1>
            <p>{descripcion_evento}</p>
            <p>{direccion_evento}</p>
            <p>{alcaldia_id}</p>

            <div>
                <BotonEditarEvento
                    evento_id={evento_id}
                    asociacion_id={asociacion_id}
                />

                <BotonEliminarEvento
                    evento_id={evento_id}
                    asociacion_id={asociacion_id} 
                />
            </div>

            <img src={`data:image/jpeg;base64,${foto_evento}`} alt={nombre_evento} />

        </div>
    );
}