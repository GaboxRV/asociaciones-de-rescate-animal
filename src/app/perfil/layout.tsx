import BarNavPerfil from "@/ui/perfil/BarNavPerfil";

export default function PerfilLayout({ children, }: Readonly<{ children: React.ReactNode; }>){
    return(
        <div>
            <BarNavPerfil />
            {children}
        </div>
    );
}