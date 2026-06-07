import { Dominios } from "@/lib/dominios";
import type { Situacao } from "@/lib/dominios/situacao";

export const SITUACAO_MAPEADA: Record<Situacao, { corFundo: string; cor: string, descricao: string }> = {
    [Dominios.Situacao.EmAnalise]: { corFundo: "#FFF4E5", cor: "#FF9900", descricao: "Em análise" },
    [Dominios.Situacao.Entrevista]: { corFundo: "#E8F1FF", cor: "#4B8BFF", descricao: "Entrevista marcada" },
    [Dominios.Situacao.Aprovado]: { corFundo: "#EAF7E6", cor: "#63A300", descricao: "Aprovado" },
    [Dominios.Situacao.Reprovado]: { corFundo: "#F2F2F2", cor: "#8E8E8E", descricao: "Reprovado" },
}