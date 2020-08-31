import { lightTheme, darkTheme } from "../styled-components/theme";
import { User } from "../types/user_types";

export default (currentUser?: User | null) => {
    const hour = new Date().getHours();

    if (currentUser?.darkMode === "Light") {
        return lightTheme;
    } else if (currentUser?.darkMode === "Dark") {
        return darkTheme;
    } else {
        return hour > 17 || hour < 7 ? darkTheme : lightTheme;
    }
};
