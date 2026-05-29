import { TabList } from "@mui/lab";
import type { ListaTabProps } from "./ListaTab.types";
import * as styles from "./ListaTab.styles"
import { Tab, type SxProps } from "@mui/material";

export const ListaTab = ({ onChange, tabs }: ListaTabProps) => {
    return (
        <TabList
            onChange={onChange}
            sx={styles.EstiloTabList}
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