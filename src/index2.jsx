import React, { useState, useEffect } from "react";

export function InputFCode() {
    const [codeF, setCodeF] = useState("");
    const regexp = /^[A-Z]{6}[0-9]{2}[A-Z]{1}[0-9]{2}[A-Z]{1}[0-9]{3}[A-Z]{1}$/;

    return (
        <>
            <label> C.F. </label>
            <input
                type="text"
                name="CodeF"
                placeholder=" codice fiscale"
                value={codeF}
                onChange={e => {
                    const val = e.target.value;

                    if (val === "" || regexp.test(val)) {
                        setCodeF(val);
                    }
                }}
                size={16}
                minLength={16}
                maxLength={16}
                required
            />
        </>
    );
}

export default InputFCode;
