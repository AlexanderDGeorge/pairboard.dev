import { UserSchema } from "../firebase/schema";
import { darkTheme, lightTheme } from "../styled-components/theme";

export default (user: UserSchema | undefined | null) => {
    const hour = new Date().getHours();

    console.log(user);

    if (user?.darkMode === "auto") {
        return hour > 17 || hour < 7 ? darkTheme : lightTheme;
    } else if (user?.darkMode === "dark") {
        return darkTheme;
    } else {
        return lightTheme;
    }
};
