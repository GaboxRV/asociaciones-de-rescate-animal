import { auth } from "@/auth";

const sesion = auth().then((sesion) => {
    return sesion;
});

export const asociacion_id = sesion.then((sesion) => {
    return sesion?.user?.email;
});


