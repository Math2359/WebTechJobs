import { Box, Grid, Skeleton, Stack } from "@mui/material"
import { Card } from "@/components/Card/Card"

type SkeletonCardProps = {
    avatar?: boolean
    quantidadeLinhas?: number
    altura?: number
}

export const SkeletonCard = ({ avatar = false, quantidadeLinhas = 3, altura }: SkeletonCardProps) => (
    <Card padding={2}>
        <Stack spacing={2}>
            {avatar && (
                <Grid container spacing={2} sx={{ alignItems: "center" }}>
                    <Skeleton variant="circular" width={50} height={50} />
                    <Stack spacing={0.75} sx={{ flexGrow: 1 }}>
                        <Skeleton width="35%" />
                        <Skeleton width="20%" />
                    </Stack>
                </Grid>
            )}
            {Array.from({ length: quantidadeLinhas }).map((_, index) => (
                <Skeleton
                    key={index}
                    height={altura}
                    width={index === quantidadeLinhas - 1 ? "70%" : "100%"}
                />
            ))}
        </Stack>
    </Card>
)

type SkeletonListaCardsProps = {
    quantidade?: number
    colunas?: number
}

export const SkeletonListaCards = ({ quantidade = 3, colunas = 1 }: SkeletonListaCardsProps) => (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: `repeat(${colunas}, minmax(0, 1fr))` }, gap: 2 }}>
        {Array.from({ length: quantidade }).map((_, index) => (
            <SkeletonCard key={index} avatar quantidadeLinhas={3} />
        ))}
    </Box>
)

export const SkeletonFormulario = () => (
    <Card padding={3}>
        <Grid container spacing={2}>
            {Array.from({ length: 6 }).map((_, index) => (
                <Grid key={index} size={index > 3 ? 12 : 6}>
                    <Skeleton variant="rounded" height={index > 3 ? 96 : 56} />
                </Grid>
            ))}
        </Grid>
    </Card>
)
