import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './AddFriendInput.css';
import GenderSelection from './GenderSelection'

class AddFriendInput extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = { name: this.props.name || '' };
    }

    handleChange(e) {
        this.setState({ name: e.target.value });
    }

    validate() {
        return this.state.name.trim().length !== 0;
    }

    handleSubmit(e) {
        const name = e.target.value.trim();
        debugger;
        if (e.which === 13 && this.validate()) {
           this.addNewFriend(name);
        }
    }
    addNewFriend(name) {
        this.props.addFriend(name);
        this.setState({ name: '' });
    }

    showError() {
        if (!this.validate()) {
            return (
                <span>error biaaaaatch</span>
            )
        }
    }
    handleForm() {
        return this.validate() ? this.addNewFriend(this.state.name) : false;
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    autoFocus="true"
                    className={ classnames('form-control', styles.addFriendInput) }
                    placeholder="Type the name of a friend"
                    value={ this.state.name}
                    onChange={ this.handleChange.bind(this) }
                    onKeyDown={ this.handleSubmit.bind(this) }/>

                {this.showError()}

                <GenderSelection/>
                <button disabled={ !this.state.name } onClick={ this.handleForm.bind(this) }>
                    ADD FRIEND
                </button>
            </div>
        );
    }

}

AddFriendInput.propTypes = {
    addFriend: PropTypes.func.isRequired
};

export default AddFriendInput
