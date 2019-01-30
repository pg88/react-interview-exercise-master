import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FriendList, AddFriendInput } from '../components';
import styles from './Paginate.css';
import { addFriend, deleteFriend, starFriend } from '../actions/FriendsActions';
import { MALE } from '../constants/ActionTypes';

class Paginate extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            list: [],
            pageCount: null,
            currentPage: null
        }
    }
    componentWillMount() {
        const firstPage = this.props.settings.firstPage ? this.props.settings.firstPage : 1;
        const data = this.props.list;
        const pageSize = this.props.settings.itemsToShow;
        let pageCount = parseInt(data.length / pageSize);
        if (data.length % pageSize > 0) {
            pageCount++;
        }
        this.setState({
            currentPage: firstPage,
            pageCount: pageCount
        });
    }
    componentWillReceiveProps(nextProps) {
        const hasAddedNewFriend = nextProps.list.length > this.state.list.length;
        if (hasAddedNewFriend) {
            this.setState({ pageCount: Math.ceil(nextProps.list.length / this.props.settings.itemsToShow) })
        }
    }
    componentDidUpdate(prevProps) {
        const hasDeletedFriend = prevProps.list.length > 0 &&  this.state.list.length === 0;
        if (hasDeletedFriend) {
            if (this.state.currentPage > this.state.pageCount) {
                this.setCurrentPage(this.state.pageCount);
            }
        }
    }
    setCurrentPage(num) {
        this.setState({ currentPage: num });
    }
    generateCommonFriends(minValue , maxValue) {
        return Math.floor(Math.random() * (maxValue - minValue) + minValue);
    }
    createPaginationControls() {
        let controls = [];
        const pageCount = this.state.pageCount;
        for (let i = 1; i <= pageCount; i++) {
            const baseClassName = 'paginationControls';
            const activeClassName = i === this.state.currentPage ? `active` : '';
            controls.push(
                <button
                    className={`${baseClassName} ${activeClassName}`}
                    key={i}
                    onClick={() => this.setCurrentPage(i)}
                >
                    {i}
                </button>
            );
        }
        return controls;
    }
    getPaginatedData() {
        const data = this.props.list.map((item,index) =>  {
            item.id = index;
            item.gender= !item.gender ? MALE : item.gender;
            item.commonFriends= item.commonFriends ? item.commonFriends : this.generateCommonFriends(1, 188);
            return item;
        });
        const pageSize = this.props.settings.itemsToShow;
        const currentPage = this.state.currentPage;
        const upperLimit = currentPage * pageSize;
        return data.slice((upperLimit - pageSize), upperLimit);
    }
    render () {
        //TODO DELETE CONST DATA
        const data = this.props.list.length > 0 ? this.props.list : [];
        const actions = {
            addFriend: this.props.addFriend,
            starFriend: this.props.starFriend,
            deleteFriend: this.props.deleteFriend
        };
        return (
            <div>
                {data.map((item, index) => {
                    return (
                        <li  key={ index }>
                            { item.name }
                        </li>
                    )
                })}
                <div>
                    {this.state.pageCount}
                    <FriendList friends={ this.getPaginatedData() } actions={ actions } />
                </div>
                <div className={ styles.paginationControls }>
                    { this.createPaginationControls() }
                </div>
            </div>
        )
    }

}
Paginate.propTypes = {
    list: React.PropTypes.array.isRequired,
    settings: React.PropTypes.object.isRequired
};
function mapStateToProps(state) {
    return state
}
export default connect(mapStateToProps, {
    addFriend,
    starFriend,
    deleteFriend
})(Paginate);
