
export default async function EliminarMascota( { id } : { id : string} ) {

    console.log('id en eliminar mascota: ', id);

    return (
        <form>
            <button>
                Eliminar mascota
            </button>
        </form>
    );
}