export const retornarTipoErro = (blur: boolean) => {
    if (blur)
        return "onBlur"

    return "onSubmit"
}