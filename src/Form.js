import React from "react";

import { Input } from "./components/Input";
import { InputDistrict } from "./components/InputDistrict";
import { InputZipCode } from "./components/InputZipCode";
import { InputFCode } from "./components/InputFCode/index2";
import { InputPhone } from "./components/InputPhone";
import { InputEmail } from "./components/InputEmail";
import { useForm } from "./hooks/useForm";
import { useField } from "./hooks/useField";

import "./index2.css";




const fieldRequiredValidator = value => {
    if (!value) {
        return false;
    }

    return true;
};


export function Form() {
    const [handleSubmit, form] = useForm();
    const nameField = useField(form, "name", "", fieldRequiredValidator);
    const surnameField = useField(form, "surname", "", fieldRequiredValidator);
    const addressField = useField(form, "address", "", fieldRequiredValidator);
    const cityField = useField(form, "city", "", fieldRequiredValidator);
    const districtField = useField(form, "district", "", fieldRequiredValidator);
    const zipCodeField = useField(form, "zipcode", "", fieldRequiredValidator);
    const fcodeField = useField(form, "fcode", "", fieldRequiredValidator);
    const phoneField = useField(form, "phone", "", fieldRequiredValidator);
    const emailField = useField(form, "email", "", fieldRequiredValidator);

    function refreshPage() {
        window.location.reload(false);
      }

    function printPage() {
        window.print(false);
    }  


    return(
        <div>
        <form onSubmit={handleSubmit} className="form">
            <Input label="Nome" {...nameField} className="formName" /><br />
            <Input label="Cognome" {...surnameField} className="formSurname" /><br />
            <Input label="Indirizzo" {...addressField} className="formAddress" /><br />
            <Input label="Citt&agrave;" {...cityField} className="formCity" /><br />
            <InputDistrict label="Provincia" {...districtField} className="formDistrict" /><br />
            <InputZipCode label="cap" {...zipCodeField} className="formZipCode" /><br />
            <InputFCode label="c.f." {...fcodeField} className="formFCode" /><br />
            <InputPhone label="Telefono" {...phoneField} className="formPhone" /><br />
            <InputEmail label="e-mail" {...emailField} className="formEmail" /><br />
            <input type="submit" value="INVIA" className="formSubmit" />
            <input type="button" onClick={refreshPage} value="Reload" className="formReload" />

            <h6 style={{color: "#f00"}} className="formH6">* Tutti i campi obbligatori</h6>
            <input type="button" value="Print this page" onClick={printPage} className="formPrint" />
        </form>
        </div>
    );
}



export default Form;
