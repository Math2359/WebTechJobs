import type { TipoExperiencia } from "@/lib/dominios/tipoExperiencia"
import type { ExperienciaSchema } from "../../../FormularioEditar.types"
import type { ModalBaseGenericaProps } from "@/components/ModalBase/ModalBase.types"

export type ModalNovaExperienciaProps = ModalBaseGenericaProps<{
    tipoExperiencia: TipoExperiencia
    salvar: (experiencia: ExperienciaSchema) => void
}>