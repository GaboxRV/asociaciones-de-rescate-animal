'use client'

import {useEffect } from "react"

export function getCookie(name: string) {
    const nameString = name + "=";
    const value = document.cookie.split('; ').find(row => row.startsWith(nameString));
    if (value) {
        return value.split('=')[1];
    }
    return null;
}

export default function ConseguirUbicacion() {

    const segundosCookie = 3600;

    async function getUbication(lat: number, lon: number) {
        const data = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const datosJson = await data.json();
        const delegacionJson = datosJson.address.borough;
        document.cookie = `ubicacion=${delegacionJson};path=/;max-age=${segundosCookie}`;

    }

    function getCoordenadas() {
        const opciones = {
            enableHighAccuracy: true, // Solicita la máxima precisión posible
            maximumAge: 0 // No aceptar ubicaciones cacheadas
        };
    
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords = { lat: position.coords.latitude, lon: position.coords.longitude };
                console.log("Coordenadas: ", coords);
                getUbication(coords.lat, coords.lon);
            },
            (error) => {
                console.error("Error al obtener la ubicación: ", error);
            },
            opciones
        );
    }

    useEffect(() => {
        const ubicacion = getCookie('ubicacion');
        if (ubicacion) {
            console.log("Ubicación del usuario: ", ubicacion);
        } else {
            getCoordenadas();
        }

    }, []);

    return (
        <>  
        </>
    )
}