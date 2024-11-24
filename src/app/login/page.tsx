import FormularioLogin from "@/ui/perfil/login/FormularioLogin";
import Link from "next/link";
import style from "@/ui/perfil/login/page.module.css"

export default async function Login() {

    return (
        <main className={style.main}>
            <section>
                <FormularioLogin />
            </section>

            <section className={style.link}>
                <Link href={'/registro'}>
                    <small>¿No tienes una cuenta? Registrate</small>
                </Link>
            </section>
        </main>
    );
}