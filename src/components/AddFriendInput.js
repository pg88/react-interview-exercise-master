import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './AddFriendInput.css';
import GenderSelection from './GenderSelection'
import { OTHER } from '../constants/ActionTypes';

class AddFriendInput extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            name: this.props.name || '',
            gender: OTHER,
            error: null
        };
    }

    handleChange(e) {
        this.setState({ name: e.target.value });
    }

    validate() {
        const name = this.state.name;
        if (name.trim().length === 0) {
            this.setState({
                error: true,
            });
            return false
        }
        return true;
    }

    handleSubmit(e) {
        const name = e.target.value.trim();
        if (e.which === 13 && this.validate()) {
           this.addNewFriend(name);
        }
    }
    addNewFriend(name) {
        this.props.addFriend(name, this.state.gender);
        this.setState({ name: '' });
    }
    handleForm() {
        return this.validate() ? this.addNewFriend(this.state.name) : false;
    }
    setGender (gender) {
        this.setState({ gender: gender });
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    autoFocus="true"
                    className={ classnames('form-control', styles.addFriendInput) }
                    placeholder="Type the name of a friend"
                    value={ this.state.name }
                    onChange={ this.handleChange.bind(this) }
                    onKeyDown={ this.handleSubmit.bind(this) }/>
                <GenderSelection onSelectGender={ this.setGender.bind(this) }/>
                <button className={ styles.addFriendsButton } disabled={ !this.state.name } onClick={ this.handleForm.bind(this) }>
                    ADD FRIEND
                </button>
            </div>
        );
    }

}

AddFriendInput.propTypes = {
    addFriend: PropTypes.func.isRequired
};
export default AddFriendInput;
