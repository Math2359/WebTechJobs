import type { ItemBreadcrumb } from "./Breadcrumb.types"

type ConfiguracaoBreadcrumb = {
    itens: ItemBreadcrumb[]
    rotaInicial: string
}

export const obterConfiguracaoBreadcrumb = (pathname: string): ConfiguracaoBreadcrumb => {
    const segmentos = pathname.split("/").filter(Boolean)
    const [area, pagina, id, subpagina] = segmentos

    if (area === "notificacoes") {
        return {
            rotaInicial: "/",
            itens: [{ label: "Notificações" }],
        }
    }

    if (area === "candidato") {
        const rotaInicial = "/candidato"

        if (pagina === "editar") {
            return {
                rotaInicial,
                itens: [
                    { label: "Meu perfil", to: rotaInicial },
                    { label: "Editar" },
                ],
            }
        }

        if (pagina === "candidaturas") {
            return {
                rotaInicial,
                itens: [{ label: "Candidaturas" }],
            }
        }

        if (pagina === "empresa") {
            return {
                rotaInicial,
                itens: [
                    { label: "Vagas", to: "/candidato/vaga" },
                    { label: "Empresa" },
                ],
            }
        }

        if (pagina === "vaga") {
            return {
                rotaInicial,
                itens: id
                    ? [
                        { label: "Vagas", to: "/candidato/vaga" },
                        { label: "Detalhes" },
                    ]
                    : [{ label: "Vagas" }],
            }
        }

        return {
            rotaInicial,
            itens: [{ label: "Meu perfil" }],
        }
    }

    if (area === "empresa") {
        const rotaInicial = "/empresa"

        if (pagina === "editar") {
            return {
                rotaInicial,
                itens: [
                    { label: "Meu perfil", to: rotaInicial },
                    { label: "Editar" },
                ],
            }
        }

        if (pagina === "vaga") {
            if (id && subpagina === "candidato") {
                return {
                    rotaInicial,
                    itens: [
                        { label: "Vagas", to: "/empresa/vaga" },
                        { label: "Detalhes", to: `/empresa/vaga/${id}` },
                        { label: "Candidato" },
                    ],
                }
            }

            return {
                rotaInicial,
                itens: id
                    ? [
                        { label: "Vagas", to: "/empresa/vaga" },
                        { label: "Detalhes" },
                    ]
                    : [{ label: "Vagas" }],
            }
        }

        return {
            rotaInicial,
            itens: [{ label: "Meu perfil" }],
        }
    }

    return {
        rotaInicial: "/",
        itens: [],
    }
}
