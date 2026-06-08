import type { AcaoAvaliacaoCandidato, AvaliacaoCandidatoSchema } from "./ModalAvaliacaoCandidato.types"

export const valoresIniciaisAvaliacaoCandidato: AvaliacaoCandidatoSchema = {
    observacao: ""
}

export const obterTextoAvaliacaoCandidato = (acao?: AcaoAvaliacaoCandidato) => {
    const aprovar = acao === "aprovar"

    return {
        titulo: aprovar ? "Aprovar candidato" : "Reprovar candidato",
        descricao: aprovar
            ? "Confirme a aprovação de"
            : "Confirme a reprovação de",
        botao: aprovar ? "Aprovar" : "Reprovar",
        mensagem: aprovar
            ? "Candidato aprovado com sucesso!"
            : "Candidato reprovado com sucesso!",
        cor: aprovar ? "success" : "error"
    } as const
}
