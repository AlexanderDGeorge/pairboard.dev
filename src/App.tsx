import React, { useContext } from "react";
import TestPage from "./Pages/TestPage";
import { UserContext } from "./Root";

declare global {
    interface Window {
        [key: string]: any;
    }
}

export default () => {
    const user = useContext(UserContext);

    if (!user) {
        // [TODO]: add error
        return null;
    } else {
        return <TestPage />;
    }
};
