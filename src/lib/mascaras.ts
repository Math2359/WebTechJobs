export const MASCARA_CNPJ = [
    {
        mask: "00.000.000/0000-00",
        maxLength: 14,
        definitions: {
            "0": /[0-9*]/,
        },
    },
]

export const MASCARA_CPF = [
    {
        mask: "000.000.000-00",
        maxLength: 11,
        definitions: {
            "0": /[0-9*]/,
        },
    },
]

export const MASCARA_TELEFONE = [
    {
        mask: "(00) 0000-0000",
        maxLength: 10,
        definitions: {
            "0": /[0-9]/,
        },
    },
    {
        mask: "(00) 00000-0000",
        maxLength: 11,
        definitions: {
            "0": /[0-9]/,
        },
    },
]