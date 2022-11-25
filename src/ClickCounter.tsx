import { useState } from 'react';

export const ClickCounter = () => {
    const [count, setCount] = useState(0);
    return (
        <div>
            <button onClick={() => setCount((c) => c + 1)}>Count as {count}</button>
        </div>
    );
};
