import type { GridColDef, GridValidRowModel } from "@mui/x-data-grid"

export type GridDadosProps<T extends GridValidRowModel> = {
    linhas: T[]
    colunas: GridColDef<T>[]
    isLoading: boolean
}

export type GerarGridDadosProps<T extends GridValidRowModel> = {
    colunas: {
        nomeHeader: string
        largura: number
        renderizarValor: (linha: T) => React.ReactNode
    }[]
    linhas: T[] | undefined
    isLoading?: boolean
}