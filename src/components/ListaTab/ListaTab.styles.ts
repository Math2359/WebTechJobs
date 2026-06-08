import type { SxProps, Theme } from "@mui/material";

export const EstiloTabList: SxProps<Theme> = (theme) => ({
    minHeight: 42,
    borderRadius: theme.spacing(1),
    border: "1px solid #CFCCCC",

    "& .MuiTabs-indicator": {
        display: "none",
    },
})

export const EstiloTabListSemBorda: SxProps<Theme> = {
    border: "none",
}

export const EstiloTabItem: SxProps<Theme> = (theme) => ({
    typography: theme.typography.subtitle2,
    minHeight: 34,
    minWidth: 120,
    color: theme.palette.grey[700],
    transition: "all 0.2s ease",
})
