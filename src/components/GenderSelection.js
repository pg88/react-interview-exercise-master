import React, { Component } from 'react';
import { GENDER } from '../constants/ActionTypes';


class GenderSelection extends Component {
    displayGenders() {
        return GENDER.map((value, key) => {
            return (<div key={ value }>
                <input
                    type='radio'
                    name='gender'
                    value={ value }
                    tabIndex={ key }
                /> { value }
            </div>)
        })
    }
    render () {
        return(
            <div className>
                { this.displayGenders() }
            </div>
        )
    }
}

export default GenderSelection