import type { Theme } from "@emotion/react";
import type { SxProps } from "@mui/material";
import type { PropsWithChildren } from "react";

export type CardProps = PropsWithChildren<{
    padding?: number | string
    sx?: SxProps<Theme>
}>