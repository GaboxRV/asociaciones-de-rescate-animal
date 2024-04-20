import FormularioLogin from "@/ui/perfil/login/FormularioLogin";

export default async function Login() {

    console.log("Pagina Login");

    return(
        <main>
            <h1>Inicio de sesión</h1>
            <FormularioLogin />
        </main>
    );
}