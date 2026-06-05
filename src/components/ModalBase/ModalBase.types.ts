import type { PropsWithChildren } from "react"

export type ModalBaseGenericaProps<T = {}> = {
    open: boolean
    handleClose: () => void
} & T

export type TamanhoModal = "small" | "medium" | "large"

export type ModalBaseProps = PropsWithChildren<ModalBaseGenericaProps & {
    tamanho?: TamanhoModal
}>