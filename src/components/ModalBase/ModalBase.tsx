import { Box, Modal, type SxProps } from "@mui/material"
import type { ModalBaseProps } from "./ModalBase.types"
import * as styles from "./ModalBase.styles"
import type { Theme } from "@emotion/react"

export const ModalBase = ({ handleClose, open, children, tamanho = "medium" }: ModalBaseProps) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={[styles.ModalBaseEstilos, styles.TamanhoModalEstilo(tamanho)] as SxProps<Theme>}>
                {children}
            </Box>
        </Modal>
    )
}