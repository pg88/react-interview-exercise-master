import React, { Component, PropTypes } from 'react';

import styles from './FriendList.css';
import FriendListItem from './FriendListItem';

class FriendList extends Component {
  render () {
    return (
      <ul className={styles.friendList}>
        {
          this.props.friends.map((friend, index) => {
            return (
              <FriendListItem
                key={ index }
                name={ friend.name }
                gender= { friend.gender }
                starred={ friend.starred }
                id={ friend.id ? friend.id : index }
                commonFriends={friend.commonFriends }
                {...this.props.actions} />
            );
          })
        }
      </ul>
    );
  }

}

FriendList.propTypes = {
  friends: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default FriendList;
