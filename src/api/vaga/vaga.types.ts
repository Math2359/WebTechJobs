import type { Experiencia } from "@/api/candidato/candidato.types"
import type { Situacao } from "@/lib/dominios/situacao";

export const VagaQueryKeys = {
    ObterVagasEmpresa: "obterVagasEmpresa",
    ObterVagaEmpresaPorId: "obterVagaEmpresaPorId",
    ObterAplicacaoEmpresaPorId: "obterAplicacaoEmpresaPorId",
    ObterCurriculoAplicacaoEmpresa: "obterCurriculoAplicacaoEmpresa",
    ObterVagasDisponiveis: "obterVagasDisponiveis",
    ObterVagaPorId: "obterVagaPorId"
} as const

export type Vaga = {
    id: number;
    idEmpresa: number;
    nome: string;
    cargo: string;
    modelo: string;
    nivelExperiencia: string;
    tecnologias: string;
    requisitos: string;
    beneficios?: string;
    cep?: string;
    numero?: string;
    descricao: string;
    salarioPrevisto?: number;
    interna: boolean;
    dataCadastro: Date;
    dataFimInscricoes: Date;
};

export type ObterVagasEmpresaResponse = Array<Vaga & {
    quantidadeAplicacoes: number
}>

export type CadastrarVagaRequest = {
    nome: string;
    cargo: string;
    modelo: string;
    nivelExperiencia: string;
    tecnologias: string;
    requisitos: string;
    beneficios?: string;
    cep?: string;
    numero?: string;
    descricao: string;
    salarioPrevisto?: number;
    interna: boolean;
    dataFimInscricoes?: Date;
};

export type AtualizarVagaEmpresaRequest = CadastrarVagaRequest & {
    id: number;
};

export type ObterVagaEmpresaPorIdResponse = {
    vaga: Vaga
    aplicacoes: {
        id: number
        nome: string
        email: string
        dataCadastro: Date
        situacao: Situacao
    }[]
}

export type ObterAplicacaoEmpresaPorIdResponse = {
    id: number
    idCandidato: number
    nome: string
    emailPessoal?: string
    emailCorporativo?: string
    telefone?: string
    linkedin?: string
    github?: string
    area?: string
    anosExperiencia?: number
    estado?: string
    cidade?: string
    descricao?: string
    habilidades?: string
    preferencias?: string
    dataCadastro?: Date
    experiencias: Experiencia[]
    curriculo?: {
        nomeArquivo?: string
        url?: string
    }
}

export type ObterVagasDisponiveisRequest = {
    termoBusca?: string
}

export type VagaVisualizacaoCandidato = Vaga & {
    nomeEmpresa: string
}

export type ObterVagasDisponiveisResponse = VagaVisualizacaoCandidato[]

export type ObterVagaPorIdResponse = VagaVisualizacaoCandidato
