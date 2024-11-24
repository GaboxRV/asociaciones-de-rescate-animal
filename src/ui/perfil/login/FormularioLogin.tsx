'use client';
import style from "@/ui/perfil/login/formularioLogin.module.css"

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/lib/actions';

export default function FormularioLogin() {
  const [mensaje, mandar] = useFormState(authenticate, undefined);

  return (
    <form action={mandar} className={style.formulario}>
      <div className={style.bloque}>
        <label>Usuario:</label>
        <input
          type="text"
          name="nombre_usuario"
          placeholder='Correo o Teléfono'
          className={style.campo}
        />
      </div>

      <div className={style.bloque}>
        <label>Contraseña:</label>
        <input
          type="password"
          name="contrasena"
          placeholder='Ingresa tu contraseña'
          className={style.campo}
        />
      </div>

      <div>
        <small>{mensaje}</small>
      </div>

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