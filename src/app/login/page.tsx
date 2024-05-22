import FormularioLogin from "@/ui/perfil/login/FormularioLogin";
import Link from "next/link";

export default async function Login() {

    return (
        <main>
            <section>
                <h2>Inicio de sesión</h2>

                <p>administrador: admin</p>
                <p>contraseña: a235</p>

                <p>usuario: nombre 2</p>
                <p>contraseña: a23222</p>

                <FormularioLogin />
            </section>

            <section>
                <h2>Registro</h2>
                <Link href={'/registro'} >
                    Registrarse
                </Link>
            </section>

        </main>
    );
}