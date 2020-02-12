import React, { useState, useEffect } from 'react';

export function InputFCode() {

    const [codeF, setCodeF] = useState('');
    const [regexp, setRegexp] = useState(/^[A-Z\b]{6}\+[0-9\b]{2}\+[A-Z\b]{1}\+[0-9\b]{2}\+[A-Z\b]{1}\+[0-9\b]{3}\+[A-Z\b]{1}\+$/);
    
    useEffect(() => {
        
        if (codeF === '' || regexp.test(codeF)) {
            setRegexp({ [setCodeF]: codeF })
        }
    },[codeF, regexp])    


        return (
            <>
                <label> C.F. </label>
                <input
                    type="text" name="CodeF" placeholder=" codice fiscale"
                    value={codeF}
                    onChange={codeF}
                    size={16}
                    minLength={16}
                    maxLength={16}
                    required
                    />
            </>
        );
    }


export default InputFCode;
