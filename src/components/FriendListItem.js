import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './FriendListItem.css';
import { FEMALE, MALE } from '../constants/ActionTypes';

class FriendListItem extends Component {

    render() {
        return (
            <li className={ styles.friendListItem }>
                <div className={ styles.friendInfos }>
                    <div>
                        <span>{ this.props.name }</span>
                    </div>
                    <div>
                        <small> { this.props.commonFriends }  friends in common</small>
                        <br/>
                        <i className={classnames('fa', {'fa-male': this.props.gender === MALE,
                        'fa-female': this.props.gender === FEMALE})}></i>
                        <small> { this.props.gender } </small>
                    </div>
                </div>
                <div className={ styles.friendActions }>
                    <button className={`btn btn-default ${ styles.btnAction }`}
                            onClick={() => this.props.starFriend(this.props.id)}>
                        <i className={ classnames('fa', {
                              'fa-star': this.props.starred,
                              'fa-star-o': !this.props.starred
                        })}/>
                    </button>
                    <button className={ `btn btn-default ${ styles.btnAction }` }
                            onClick={() => this.props.deleteFriend(this.props.id)}>
                        <i className="fa fa-trash"/>
                    </button>
                </div>
            </li>
        );
    }

}

FriendListItem.propTypes = {
    starred: PropTypes.bool,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    starFriend: PropTypes.func.isRequired,
    commonFriends: PropTypes.number.isRequired
};

export default FriendListItem
