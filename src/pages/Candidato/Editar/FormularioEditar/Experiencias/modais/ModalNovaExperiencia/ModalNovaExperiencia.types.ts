import type { TipoExperiencia } from "@/lib/dominios/tipoExperiencia"
import type { ExperienciaSchema } from "../../../FormularioEditar.types"

export type ModalNovaExperienciaProps = {
    open: boolean
    handleClose: () => void
    tipoExperiencia: TipoExperiencia
    salvar: (experiencia: ExperienciaSchema) => void
}