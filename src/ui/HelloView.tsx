import {useState} from "react";

export function HelloView() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h4>Hello from react</h4>
            <p>Hai cliccato {count} volte</p>
            <button onClick={() => setCount(count + 1)}>
                Clicca qui
            </button>
        </div>
    );
}