import type { Theme } from "@mui/material"

export type ListaTabProps = {
    onChange: (event: React.SyntheticEvent<Element, Event>, value: string) => void
    tabs: TabItemProps[]
}

type TabItemProps = {
    label: string
    value: string
    selected?: SelectedProps
}

type SelectedProps = {
    corFundo: ((theme: Theme) => string) | string
    cor: ((theme: Theme) => string) | string
}