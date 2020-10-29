import { useEffect, useState } from "react";

export default function useLocalStorage(storageKey, initialValue) {
    const [storage, setStorage] = useState(initialValue);

    useEffect(() => {
        if (!storageKey) return;
        const temp = localStorage.getItem(storageKey);
        if (!temp) {
            setStorage(undefined);
        } else {
            setStorage(JSON.parse(temp));
        }
    }, [storageKey]);

    function setNewStorageValue(newValue) {
        localStorage.setItem(storageKey, JSON.stringify(newValue));
        setStorage(newValue);
    }

    return [storage, setNewStorageValue];
}
