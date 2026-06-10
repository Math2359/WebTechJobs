import { DataGrid, type GridValidRowModel } from '@mui/x-data-grid';
import type { GridDadosProps } from './GridDados.types';
import { SemDados } from '../SemDados/SemDados';
import { Stack } from '@mui/material';

const SemDadosOverlay = () => {
    return (
        <Stack sx={{ placeItems: "center", placeContent: "center", height: "100%" }}>
            <SemDados titulo='Nenhum dado encontrado' descricao='Altere os filtros ou adicione para continuar' />
        </Stack>
    )
}

export const GridDados = <T extends GridValidRowModel,>({ colunas, linhas, isLoading }: GridDadosProps<T>) => {
    return (
        <DataGrid
            sx={{
                borderRadius: 3
            }}
            hideFooterPagination
            hideFooterSelectedRowCount
            disableColumnFilter
            disableAutosize
            disableColumnMenu
            disableColumnSelector
            disableColumnSorting
            disableDensitySelector
            disableRowSelectionOnClick
            loading={isLoading}
            rows={linhas}
            columns={colunas}
            slots={{
                noRowsOverlay: SemDadosOverlay,
            }}
            slotProps={{
                loadingOverlay: {
                    variant: 'skeleton',
                    noRowsVariant: 'skeleton',
                }
            }}
        />
    )
}
