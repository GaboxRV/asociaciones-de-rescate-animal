'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/lib/actions';

export default function FormularioLogin() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (


        <form action={dispatch}>
            <h1>Por favor loggea para acceder</h1>

            <label>Usuario</label>
            <input type="text" name="usuario" />

            <label>Contraseña</label>
            <input type="text" name="contraseña" />
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