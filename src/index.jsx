import React, { Component } from 'react';

export class InputPhone extends Component {
    constructor(props) {
        super(props);
        this.onHandlePhoneChange = this.onHandlePhoneChange.bind(this);  
        this.state = {
            phone: '',
            regexp : /^[0-9\b]+$/
        }   
    }
    
    onHandlePhoneChange = e => {
        let phone = e.target.value;

        // if value is not blank, then test the regex
        if (phone === '' || this.state.regexp.test(phone)) {
            this.setState({ [e.target.name]: phone })
        }
    };
 
    render() {
        return (
            <>
                <label>Telefono</label>
                <input
                    type="text" name="phone" placeholder=" telefono"
                    value={this.state.phone}
                    onChange={this.onHandlePhoneChange}
                    minLength={3}
                    size={20}
                    required
                    />
            </>
        );
    }
}

export default InputPhone;

