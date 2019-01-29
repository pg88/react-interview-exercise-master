import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './FriendListApp.css';
import Paginate from '../components/Paginate'

import {addFriend, deleteFriend, starFriend} from '../actions/FriendsActions';
import { FriendList, AddFriendInput } from '../components';

class FriendListApp extends Component {

  render () {
    const { friendlist: { friendsById }} = this.props;
    const paginationSettings = {
        itemsToShow: 2,
        totalItems: friendsById.length
    };

    const actions = {
      addFriend: this.props.addFriend,
      deleteFriend: this.props.deleteFriend,
      starFriend: this.props.starFriend
    };

    return (
      <div className={styles.friendListApp}>
        <h1>The FriendList</h1>
        <AddFriendInput addFriend={actions.addFriend} />
        <Paginate friends={friendsById} settings={paginationSettings} />
        <FriendList friends={friendsById} actions={actions} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {
  addFriend,
  starFriend,
  deleteFriend,
})(FriendListApp)
