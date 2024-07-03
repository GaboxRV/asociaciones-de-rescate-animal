'use client'

import { useState } from "react"

export default function BotonUbicacion() {

    const [ubicacion, setUbicacion] = useState();
    
    async function getUbication(lat:number, lon:number) {   
        const data = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const json = await data.json();
        
        return json;
    }

    function actualizar(){
        navigator.geolocation.getCurrentPosition((position) => {
            const coords = {lat: position.coords.latitude, lon: position.coords.longitude};
            console.log(coords);


            getUbication(coords.lat, coords.lon);

            //guardar la ubicacion en el estado
            
        });
    }

    return (
        <div>

            <button onClick={actualizar}>Ubicación</button>
        </div>
    )
}