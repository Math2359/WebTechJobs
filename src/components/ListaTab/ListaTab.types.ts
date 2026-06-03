import type { Theme } from "@mui/material"

export type ListaTabProps = {
    onChange: (value: string) => void
    tabs: TabItemProps[]
    orientation?: "vertical" | "horizontal"
}

type TabItemProps = {
    label: string
    value: string
    selected?: SelectedProps
}

type SelectedProps = {
    corFundo?: ((theme: Theme) => string) | string
    cor?: ((theme: Theme) => string) | string
}