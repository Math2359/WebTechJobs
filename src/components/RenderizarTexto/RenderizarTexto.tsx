import { Stack, Typography } from "@mui/material";
import type { RenderizarTextoProps } from "./RenderizarTexto.types";

export const RenderizarTexto = ({ texto }: RenderizarTextoProps) => (
  <Stack spacing={0.5}>
    {texto.split("\n").map((paragrafo, index) => (
      <Typography
        key={index}
        variant="body2"
      >
        {paragrafo}
      </Typography>
    ))}
  </Stack>
);