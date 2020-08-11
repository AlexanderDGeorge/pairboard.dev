import { useUserContext } from "./UserContext";
import { lightTheme, darkTheme } from "../styled-components/theme";

export function useThemeContext() {
    const currentUser = useUserContext();
    const hour = new Date().getHours();

    if (currentUser?.darkMode === "Auto") {
        return hour > 17 || hour < 7 ? darkTheme : lightTheme;
    } else if (currentUser?.darkMode === "Dark") {
        return darkTheme;
    } else {
        return lightTheme;
    }
}
