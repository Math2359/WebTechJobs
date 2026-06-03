import { Stack, Typography } from "@mui/material";
import type { RenderizarTextoProps } from "./RenderizarTexto.types";
import { SemDados } from "../SemDados/SemDados";

export const RenderizarTexto = ({ texto }: RenderizarTextoProps) => (
  <Stack spacing={0.5}>
    {texto ? texto.split("\n").map((paragrafo, index) => (
      <Typography
        key={index}
        variant="body2"
      >
        {paragrafo}
      </Typography>
    )) : (
      <SemDados descricao="Edite seu perfil para adicionar um texto" titulo="Nenhum texto cadastrado" />
    )}
  </Stack>
);