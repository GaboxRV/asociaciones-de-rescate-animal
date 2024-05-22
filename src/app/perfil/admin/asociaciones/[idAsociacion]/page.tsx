import FormularioEditarAsociacion from "@/ui/perfil/admin/FormularioEditarAsociacion";

export default async function Asociacion({params}: {params: {idAsociacion: string}}){

    const asociacion_id = params.idAsociacion;
    

    return (
        <div>
            <FormularioEditarAsociacion asociacion_id={asociacion_id} />
        </div>
    );
}