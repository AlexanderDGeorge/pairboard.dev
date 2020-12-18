import { useState } from 'react';

export default function usePostSubscribe() {
    const [subscribed, setSubscribed] = useState(undefined);

    return { subscribed };
}
