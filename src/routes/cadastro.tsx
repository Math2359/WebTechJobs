import { Box, Grid, Stack, Typography } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import { CadastroIlustration } from '../assets'
import { TabContext, TabPanel } from '@mui/lab'
import { useState } from 'react'
import { ListaTab } from '../components/ListaTab/ListaTab'
import { CandidatoForm } from '../pages/Cadastro/Formularios/Candidato/Candidato'
import { EmpresaForm } from '../pages/Cadastro/Formularios/Empresa/Empresa'

export const Route = createFileRoute('/cadastro')({
  component: RouteComponent,
})

function RouteComponent() {
  const [value, setValue] = useState("1")

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.info(event)
    setValue(newValue);
  };


  return (
    <Grid
      container
      sx={{
        flexGrow: 1,
        justifyContent: "space-around",
        alignItems: 'center',
      }}
    >
      <Grid size={3.5}>
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
                  onChange={handleChange}
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
                <CandidatoForm />
              </TabPanel>
              <TabPanel sx={{ width: "100%" }} value="2">
                <EmpresaForm />
              </TabPanel>
            </TabContext>
          </Stack>
        </Stack>
      </Grid>

      <Grid size={3.5}>
        <CadastroIlustration width="100%" />
      </Grid>
    </Grid>
  )
}
