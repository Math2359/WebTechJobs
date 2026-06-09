import { useValidarEmail } from '@/api/usuario/usuario'
import { Card } from '@/components/Card/Card'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined'
import { Grid, Stack, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import type { ValidacaoEmailProps } from './ValidacaoEmail.types'

export const ValidacaoEmail = ({ codigo }: ValidacaoEmailProps) => {
  const { mutate: validarEmail, status } = useValidarEmail()
  const codigoEmValidacao = useRef<string | null>(null)

  useEffect(() => {
    if (!codigo || codigoEmValidacao.current === codigo) return

    codigoEmValidacao.current = codigo
    validarEmail({ codigo })
  }, [codigo, validarEmail])

  const statusValidacao = !codigo || status === "error"
    ? "error"
    : status === "success"
      ? "success"
      : "pending"

  return (
    <Grid
      container
      sx={{
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 2
      }}
    >
      <Grid>
        <Card padding={4}>
          <AnimatePresence mode="wait">
            {statusValidacao === "pending" && (
              <motion.div
                key="validando"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
              >
                <Stack spacing={3} sx={{ alignItems: "center", textAlign: "center" }}>
                  <Grid
                    container
                    sx={{
                      position: "relative",
                      width: 96,
                      height: 96,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.4, ease: "linear", repeat: Infinity }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        border: "4px solid rgba(94, 147, 173, 0.2)",
                        borderTopColor: "#5E93AD",
                        borderRadius: "50%",
                      }}
                    />
                    <motion.div
                      animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity }}
                      style={{ display: "flex", color: "#5E93AD" }}
                    >
                      <EmailOutlinedIcon sx={{ fontSize: 42 }} />
                    </motion.div>
                  </Grid>

                  <Stack spacing={1}>
                    <Typography variant="h6">Validando seu e-mail...</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Aguarde enquanto confirmamos a validade do seu link.
                    </Typography>
                  </Stack>
                </Stack>
              </motion.div>
            )}

            {statusValidacao === "success" && (
              <motion.div
                key="sucesso"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Stack spacing={2} sx={{ alignItems: "center", textAlign: "center" }}>
                  <CheckCircleOutlinedIcon color="success" sx={{ fontSize: 64 }} />
                  <Typography variant="h6">E-mail validado com sucesso!</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Seu perfil agora possui a confirmação de e-mail.
                  </Typography>
                </Stack>
              </motion.div>
            )}

            {statusValidacao === "error" && (
              <motion.div
                key="erro"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Stack spacing={2} sx={{ alignItems: "center", textAlign: "center" }}>
                  <ErrorOutlinedIcon color="error" sx={{ fontSize: 64 }} />
                  <Typography variant="h6">Não foi possível validar o e-mail</Typography>
                  <Typography variant="body2" color="text.secondary">
                    O link pode ser inválido ou ter expirado. Solicite um novo link na sua dashboard.
                  </Typography>
                </Stack>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </Grid>
    </Grid>
  )
}
