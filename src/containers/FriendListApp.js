import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './FriendListApp.css';
import Paginate from '../components/Paginate'

import { addFriend } from '../actions/FriendsActions';
import { AddFriendInput } from '../components';

class FriendListApp extends Component {

  render () {
    const { friendlist: { friendsById }} = this.props;
    const paginationSettings = {
        firstPage: 1,
        itemsToShow: 2
    };

    const actions = {
      addFriend: this.props.addFriend
    };

    return (
      <div className={styles.friendListApp}>
        <h1>The FriendList</h1>
        <AddFriendInput addFriend={actions.addFriend} />
        <Paginate list={friendsById} settings={paginationSettings} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {
  addFriend
})(FriendListApp)
