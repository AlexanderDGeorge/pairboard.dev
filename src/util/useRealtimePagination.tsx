import { useEffect, useContext } from "react";
import { SearchContext } from "../Application";

export default () => {
    const currentSearch = useContext(SearchContext);

    useEffect(() => {}, []);
};
