import type { ElementType, PropsWithChildren, ReactNode } from "react"

export type ModalBaseGenericaProps<T = {}> = {
    open: boolean
    handleClose: () => void
} & T

export type TamanhoModal = "small" | "medium" | "large"

export type ModalBaseProps = PropsWithChildren<ModalBaseGenericaProps & {
    tamanho?: TamanhoModal
    icone?: ElementType
    titulo?: string
    subtitulo?: ReactNode
    corIcone?: "primary" | "secondary" | "success" | "error"
}>
