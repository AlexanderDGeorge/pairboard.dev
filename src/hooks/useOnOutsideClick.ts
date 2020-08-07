import { useEffect } from "react";

export default (ref: any, action: Function) =>
    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                action(event);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [ref, action]);
