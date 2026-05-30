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