
export default async function Asociacion({params}: {params: {idAsociacion: string}}){

    const asociacion_id = params.idAsociacion;
    

    return (
        <div>
            <h1>Asociación</h1>
            <p>Esta es la página de la asociación {asociacion_id}</p>
        </div>
    );
}