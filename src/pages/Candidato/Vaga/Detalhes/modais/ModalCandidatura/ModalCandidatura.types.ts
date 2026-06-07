import type { ModalBaseGenericaProps } from "@/components/ModalBase/ModalBase.types";

export type ModalCandidaturaProps = ModalBaseGenericaProps<{
    vaga: {
        nomeEmpresa: string
        id: number
    }
}>