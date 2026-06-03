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

export function validarCpf(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, "");

    if (cpf.length !== 11) {
        return false;
    }

    // Rejeita CPFs com todos os dígitos iguais
    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    // Primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += Number(cpf[i]) * (10 - i);
    }

    let resto = (soma * 10) % 11;
    if (resto === 10) {
        resto = 0;
    }

    if (resto !== Number(cpf[9])) {
        return false;
    }

    // Segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += Number(cpf[i]) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10) {
        resto = 0;
    }

    return resto === Number(cpf[10]);
}

export const formatarTelefone = (telefone: string | undefined) => {
    if (!telefone) return undefined;

    const numeros = telefone.replace(/\D/g, "");

    if (numeros.length <= 10) {
        return numeros.replace(
            /(\d{2})(\d{4})(\d{0,4})/,
            (_, ddd, parte1, parte2) =>
                `(${ddd}) ${parte1}${parte2 ? `-${parte2}` : ""}`
        );
    }

    return numeros.replace(
        /(\d{2})(\d{5})(\d{0,4})/,
        (_, ddd, parte1, parte2) =>
            `(${ddd}) ${parte1}${parte2 ? `-${parte2}` : ""}`
    );
}