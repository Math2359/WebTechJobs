import type { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import type { GerarGridDadosProps, GridDadosProps } from "./GridDados.types";
import { useMemo } from "react";
import Typography from "@mui/material/Typography"

export const useGerarDadosGrid = <T extends GridValidRowModel>({ colunas, isLoading = false, linhas = [] }: GerarGridDadosProps<T>) => {
    const colunasDataGrid: GridColDef<T>[] = useMemo(() =>
        colunas.map((item, index) => ({
            field: `coluna_${index}`,
            headerName: item.nomeHeader,
            minWidth: item.largura,
            flex: 1,
            renderHeader: ({ colDef }) => (
                <Typography sx={{ fontSize: 12 }} variant="overline">{colDef.headerName}</Typography>
            ),
            renderCell: ({ row }) => item.renderizarValor(row) ?? "-"
        })), [colunas])

    const dadosGrid: GridDadosProps<T> = useMemo(() => ({
        colunas: colunasDataGrid,
        linhas,
        isLoading
    }), [colunasDataGrid, isLoading, linhas])

    return {
        dadosGrid
    }
}