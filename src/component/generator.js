import React, { useCallback, useEffect, useRef, useState } from "react";
import './generator.css';
const App1 = () => {
    const [length, setLength] = useState(8);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false);
    const [password, setPassword] = useState("");
    //ref hook
    const passwordRef = useRef(null);

    const PasswordGenerator = useCallback(() => {
        let pass = "";
        let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPRSTUVWXYZ";
        if (numberAllowed) str += "0123456789";
        if (charAllowed) str += "!@#$%^&*()_+=-{}[]|?/.,<>\"\'\\`~:;";

        for (let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(char);
        }
        setPassword(pass);
    }, [length, numberAllowed, charAllowed, setPassword],)

    const copyPasswordToClipboard = useCallback(() => {
        passwordRef.current?.select();
        passwordRef.current?.setSelectionRange(0, 101)
        window.navigator.clipboard.writeText(password)
    }, [password])
    useEffect(() => {
        PasswordGenerator();
    }, [length, numberAllowed, charAllowed, PasswordGenerator])
    return (
        <div className="container">
            <h4>Password Generator</h4>
            <div>
                <input type="text" value={password} placeholder="password" readOnly ref={passwordRef} className="password-input" />
                <button onClick={copyPasswordToClipboard}>Copy</button>
            </div>
            <div className="control-cont">
                <div>
                    <input type="range" min={6} max={100} value={length} onChange={(e) => { setLength(e.target.value) }} />
                    <label>Length:{length}</label>
                </div>
                <div>
                    <input type="checkbox" defaultChecked={numberAllowed} onChange={() => { setNumberAllowed((prev) => !prev) }} />
                    <label htmlFor="numberInput">Number</label>
                </div>
                <div>
                    <input type="checkbox" defaultChecked={charAllowed} onChange={() => { setCharAllowed((prev) => !prev) }} />
                    <label htmlFor="charterInput">Characters</label>
                </div>
            </div>
        </div>
    );
}

export default App1;