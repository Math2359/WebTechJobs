import { Senha } from "./Senha/Senha";
import type { InputPadraoProps, TiposVariantes } from "../InputForm.types";
import type React from "react";
import { Normal, NormalData } from "./Normal/Normal";
import { Mascara } from "./Mascara/Mascara";
import { Select } from "./Select/Select";

export const Variantes: Record<TiposVariantes, (props: InputPadraoProps) => React.ReactElement> = {
    "senha": Senha,
    "normal": Normal,
    "mascara": Mascara,
    "data": NormalData,
    "select": Select
}