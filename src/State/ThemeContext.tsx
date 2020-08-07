import { useUserContext } from "./UserContext";
import { lightTheme, darkTheme } from "../styled-components/theme";

export function useThemeContext() {
    const currentUser = useUserContext();
    const hour = new Date().getHours();

    if (currentUser?.darkMode === "auto") {
        return hour > 17 ? darkTheme : lightTheme;
    } else if (currentUser?.darkMode === "dark") {
        return darkTheme;
    } else {
        return lightTheme;
    }
}
