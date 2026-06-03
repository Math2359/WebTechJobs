import { Box, Grid, Stack, Typography } from '@mui/material'
import { CadastroIlustration } from '@/assets'
import { TabContext, TabPanel } from '@mui/lab'
import { Formularios } from './Formularios'
import { useState } from 'react'
import { ListaTab } from '@/components/ListaTab/ListaTab'

export const Cadastro = () => {
  const [value, setValue] = useState("1")

  return (
    <Grid
      container
      sx={{
        flexGrow: 1,
        justifyContent: "space-around",
        alignItems: 'center',
      }}
    >
      <Grid size={3}>
        <Stack sx={{ width: "100%" }} spacing={4}>
          <Typography variant='h4'>
            Seja bem-vindo!
          </Typography>
          <Stack sx={{ placeItems: "center" }}>
            <TabContext value={value}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ListaTab
                  onChange={setValue}
                  tabs={[{
                    label: "Candidato",
                    value: "1",
                    selected: {
                      cor: "white",
                      corFundo: theme => theme.palette.primary.main
                    }
                  }, {
                    label: "Empresa",
                    value: "2",
                    selected: {
                      cor: "white",
                      corFundo: theme => theme.palette.secondary.main
                    }
                  }]}

                />
              </Box>

              <TabPanel sx={{ width: "100%" }} value="1">
                <Formularios.Candidato />
              </TabPanel>
              <TabPanel sx={{ width: "100%" }} value="2">
                <Formularios.Empresa />
              </TabPanel>
            </TabContext>
          </Stack>
        </Stack>
      </Grid>

      <Grid size={3}>
        <CadastroIlustration width="100%" />
      </Grid>
    </Grid>
  )
}