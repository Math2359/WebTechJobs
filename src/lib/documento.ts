export const validarCNPJ = (cnpj: string) => {
  const cnpjLimpo = cnpj.replace(/\D/g, "")

  if (cnpjLimpo.length !== 14) return false

  // Elimina CNPJs inválidos conhecidos
  if (/^(\d)\1+$/.test(cnpjLimpo)) return false

  const calcularDigito = (base: string, pesos: number[]) => {
    const soma = base
      .split("")
      .reduce((acc, num, index) => {
        return acc + Number(num) * pesos[index]
      }, 0)

    const resto = soma % 11

    return resto < 2 ? 0 : 11 - resto
  }

  const base = cnpjLimpo.slice(0, 12)

  const digito1 = calcularDigito(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])

  const digito2 = calcularDigito(
    base + digito1,
    [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  )

  return cnpjLimpo === `${base}${digito1}${digito2}`
}