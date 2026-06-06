export const VagaQueryKeys = {
    ObterVagasEmpresa: "obterVagasEmpresa",
    ObterVagaEmpresaPorId: "obterVagaEmpresaPorId"
} as const

export type Vaga = {
    id: number;
    idEmpresa: number;
    nome: string;
    cargo: string;
    modelo: string;
    nivelExperiencia: string;
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
    }[]
}
