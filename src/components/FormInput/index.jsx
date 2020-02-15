import React from "react";

import { ErrorValidationLabel } from "../ErrorValidationLabel";

export const FormInput = ({ errMsg, name, inputType, placeholder, valid }) => {
    return (
        <>
            <input
                type={inputType}
                name={name}
                placeholder={placeholder}
                size={40}
                required
            />
            <br />
            {!valid && <ErrorValidationLabel txtLbl={errMsg} />}
        </>
    );
};
