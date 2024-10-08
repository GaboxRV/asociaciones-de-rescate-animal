

export default async function Eventos({ params } : { params: { idAsociacion: string}}) {

    return (
        <div>
            <h1>Registrar nuevo evento</h1>
            <p>{params.idAsociacion}</p>
        </div>
    );
}