import { UserSchema } from "../firebase/schema";
import { darkTheme, lightTheme } from "../styled-components/theme";

export default function useThemeContext(user: UserSchema | undefined | null) {
    const hour = new Date().getHours();

    if (user?.darkMode === "auto") {
        return hour > 17 || hour < 7 ? lightTheme : lightTheme;
    } else if (user?.darkMode === "dark") {
        return darkTheme;
    } else {
        return lightTheme;
    }
}
