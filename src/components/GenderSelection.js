import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './GenderSelection.css';
import { OTHER, GENDER } from '../constants/ActionTypes';


class GenderSelection extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            gender: undefined
        }
    }

    selectGender(e) {
        const selectedGender = e.target.value;
        this.setState({ gender: selectedGender });
        this.props.onSelectGender(selectedGender)
    }

    displayGenders() {
        return (
            GENDER.map((value, key) => {
            return (
                <div key={ value } className={ styles.genderInputs }>
                    <input
                        type='radio'
                        id={ value }
                        name='gender'
                        value={ value }
                        checked={ this.state.gender === value}
                        tabIndex={ key }
                        onChange={ this.selectGender.bind(this) }
                    /> { value }
                </div>
                );
            })
        )
    }

    render () {
        return (
            <div className={ styles.genderContainer }>
                <div className={ styles.genderLabel }>
                    <span>Gender:</span>
                </div>
                { this.displayGenders() }
            </div>
        );
    }
}

export default GenderSelection