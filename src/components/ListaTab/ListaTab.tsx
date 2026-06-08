import { TabList } from "@mui/lab";
import type { ListaTabProps } from "./ListaTab.types";
import * as styles from "./ListaTab.styles"
import { Tab, type SxProps } from "@mui/material";

export const ListaTab = ({ onChange, tabs, orientation, variante = "padrao" }: ListaTabProps) => {
    return (
        <TabList
            onChange={(_, value) => onChange(value)}
            sx={[
                styles.EstiloTabList,
                variante === "semBorda" && styles.EstiloTabListSemBorda
            ] as SxProps}
            orientation={orientation}
        >
            {tabs.map((item, index) =>
                <Tab
                    key={index}
                    label={item.label}
                    value={item.value}
                    disableRipple
                    sx={[styles.EstiloTabItem, {
                        "&.Mui-selected": {
                            backgroundColor: item.selected?.corFundo,
                            color: item.selected?.cor,
                        }
                    }] as SxProps}
                />
            )}

        </TabList>
    )
}
