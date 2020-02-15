import React from "react";

import "./css/indexApp3.css";

import { FormInput } from "./components/FormInput";
import { Loading } from "./components/Loading";

const txtFieldState = {
    value: "",
    valid: true,
    typeMismatch: false,
    typeNumber: false,
    errMsg: "" //this is where our error message gets across
};

class App extends React.Component {
    state = {
        email: {
            ...txtFieldState,
            fieldName: "Email",
            required: true,
            requiredTxt: "Email is required",
            formatErrorTxt: "Incorrect email format"
        },
        firstname: {
            ...txtFieldState,
            fieldName: "First Name",
            required: true,
            requiredTxt: "First Name is required"
        },
        lastname: {
            ...txtFieldState,
            fieldName: "Last Name",
            required: false,
            requiredTxt: "Last Name is required"
        },
        address: {
            ...txtFieldState,
            fieldName: "Address",
            required: true,
            requiredTxt: "Address is required"
        },
        city: {
            ...txtFieldState,
            fieldName: "City",
            required: true,
            requiredTxt: "City is required"
        },
        district: {
            ...txtFieldState,
            fieldName: "District",
            required: true,
            requiredTxt: "District is required"
        },
        phone: {
            ...txtFieldState,
            fieldName: "Phone",
            required: true,
            requiredTxt: "Phone is required"
        },

        allFieldsValid: false,
        loading: false
    };

    reduceFormValues = formElements => {
        //we convert elements/inputs into an array found inside form element
        const arrElements = Array.prototype.slice.call(formElements);

        //we need to extract specific properties in Constraint Validation API using this code snippet
        const formValues = arrElements
            .filter(elem => elem.name.length > 0)
            .map(x => {
                const { typeMismatch } = x.validity;
                const { name, type, value } = x;
                const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                //        const validateExample = (values) => {
                const errors = {};
                const values = "";
                // Phone Number Errors
                if (!values.phoneNumber) {
                    errors.phoneNumber = "Phone number is required";
                } else if (!values.phone.match(phoneno)) {
                    errors.phoneNumber =
                        "Please enter a phone number with 10  digits.  1 not necessary";
                }

                return {
                    name,
                    type,
                    typeMismatch, //we use typeMismatch when format is incorrect(e.g. incorrect email)
                    phoneno,
                    value,
                    valid: x.checkValidity()
                };
            })
            .reduce((acc, currVal) => {
                //then we finally use reduce, ready to put it in our state
                const { value, valid, typeMismatch, typeNumber } = currVal;
                const { fieldName, requiredTxt, formatErrorTxt } = this.state[
                    currVal.name
                ]; //get the rest of properties inside the state object

                //we'll need to map these properties back to state so we use reducer...
                acc[currVal.name] = {
                    value,
                    valid,
                    typeMismatch,
                    typeNumber,
                    fieldName,
                    requiredTxt,
                    formatErrorTxt
                };

                return acc;
            }, {});

        return formValues;
    };

    checkAllFieldsValid = formValues => {
        return !Object.keys(formValues)
            .map(x => formValues[x])
            .some(field => !field.valid);
    };

    onSubmit = e => {
        e.preventDefault();
        const form = e.target;

        //we need to extract specific properties in Constraint Validation API using this code snippet
        const formValues = this.reduceFormValues(form.elements);
        const allFieldsValid = this.checkAllFieldsValid(formValues);
        //note: put ajax calls here to persist the form inputs in the database.

        //END

        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ ...formValues, allFieldsValid, loading: false }); //we set the state based on the extracted values from Constraint Validation API
        }, 5000);
    };

    render() {
        const {
            email,
            firstname,
            lastname,
            address,
            city,
            district,
            phone,
            allFieldsValid
        } = this.state;
        const successFormDisplay = allFieldsValid ? "block" : "none";
        const inputFormDisplay = !allFieldsValid ? "block" : "none";

        function refreshPage() {
            window.location.reload();
        }

        function printPage() {
            window.print(false);
        }

        return (
            <div className="div">
                <div
                    style={{ display: successFormDisplay }}
                    className="divPageSuccess"
                >
                    <h1 style={{ textAlign: "center" }}>Success!</h1>
                    <p
                        style={{ textAlign: "center" }}
                        className="divPageSuccessText"
                    >
                        You have successfully submitted a form.
                    </p>
                </div>
                <div
                    className="form-input"
                    style={{ display: inputFormDisplay }}
                >
                    <h1
                        style={{ textAlign: "center" }}
                        className="form-input-h1"
                    >
                        Form Validation
                    </h1>
                    <form
                        className="form-inside-input"
                        onSubmit={this.onSubmit}
                        noValidate
                    >
                        <FormInput
                            inputType="text"
                            placeholder="First"
                            name="firstname"
                            errMsg={firstname.requiredTxt}
                            {...firstname}
                        />
                        <br />
                        <FormInput
                            inputType="text"
                            placeholder="Last Name"
                            name="lastname"
                            errMsg={lastname.requiredTxt}
                            {...lastname}
                        />
                        <br />
                        <FormInput
                            inputType="text"
                            name="address"
                            placeholder="Address"
                            errMsg={address.requiredTxt}
                            {...address}
                        />
                        <br />
                        <FormInput
                            inputType="text"
                            name="city"
                            placeholder="City"
                            errMsg={city.requiredTxt}
                            {...city}
                        />
                        <br />
                        <FormInput
                            inputType="text"
                            name="district"
                            placeholder="District"
                            errMsg={district.requiredTxt}
                            {...district}
                        />
                        <br />
                        <FormInput
                            inputType="text"
                            name="phone"
                            placeholder="Phone"
                            errMsg={phone.requiredTxt}
                            {...phone}
                        />
                        <br />
                        <FormInput
                            type="email"
                            name="email"
                            placeholder="Email"
                            errMsg={
                                email.typeMismatch
                                    ? email.formatErrorTxt
                                    : email.requiredTxt
                            }
                            {...email}
                        />
                        <br />
                        <Loading text="Submit" loading={this.state.loading} />

                        <input
                            type="reset"
                            value="Reload"
                            onClick={refreshPage}
                            className="inputReload"
                        />
                        <br />
                        <input
                            type="button"
                            value="Print this page"
                            onClick={printPage}
                            className="inputPrint"
                        />
                    </form>
                </div>
            </div>
        );
    }
}

export default App;
