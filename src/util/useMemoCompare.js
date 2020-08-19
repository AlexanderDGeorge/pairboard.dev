import { useRef, useEffect } from "react";

export default (next, compare) => {
    const previousRef = useRef();
    const previous = previousRef.current;
    const isEqual = compare(previous, next);

    useEffect(() => {
        if (!isEqual) {
            previousRef.current = next;
        }
    });

    return isEqual ? previous : next;
};
