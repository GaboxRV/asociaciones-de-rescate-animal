
export default async function PerfilAsociacion({ params } : { params: { idAsociacion: string }}){
    
    const asociacion_id = params.idAsociacion;


    return (
        <main>
            <h2>Página del perfil completo de la asociación con id: {asociacion_id}</h2>

        </main>
    );
}