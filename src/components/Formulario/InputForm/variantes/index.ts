import { Senha } from "./Senha/Senha";
import type { InputPadraoProps, TiposVariantes } from "../InputForm.types";
import type React from "react";
import { Normal } from "./Normal/Normal";
import { Mascara } from "./Mascara/Mascara";

export const Variantes: Record<TiposVariantes, (props: InputPadraoProps) => React.ReactElement> = {
    "senha": Senha,
    "normal": Normal,
    "mascara": Mascara
}