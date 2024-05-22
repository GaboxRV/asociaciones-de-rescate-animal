'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/lib/actions';

export default function FormularioLogin() {
    const [mensaje, mandar] = useFormState(authenticate, undefined);

    return (
        <form action={mandar}>
            <label>Usuario</label>
            <input type="text" name="nombre_usuario" placeholder='correo o telefono'/>

            <label>Contraseña</label>
            <input type="text" name="contrasena" placeholder='ingresa contraseña'/>
            <button>Enviar</button>
        </form>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();
  
    return (
      <button>
        Log in 
      </button>
    );
  }