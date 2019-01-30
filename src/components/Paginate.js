import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Paginate.css';
import { MALE } from '../constants/ActionTypes';
import { FriendList, AddFriendInput } from '../components';
import { addFriend, deleteFriend, starFriend } from '../actions/FriendsActions';

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
            const activeClassName = i === this.state.currentPage ? styles.paginationControlsActive : '';
            controls.push(
                <button
                    className={ activeClassName }
                    key={ i }
                    onClick={ () => this.setCurrentPage(i) }
                >
                    { i }
                </button>
            );
        }
        return controls;
    }
    getPaginatedData() {
        const data = this.props.list.map((item,index) =>  {
            item.id = index;
            item.gender = !item.gender ? MALE : item.gender;
            item.commonFriends= item.commonFriends ? item.commonFriends : this.generateCommonFriends(1, 188);
            return item;
        });
        const pageSize = this.props.settings.itemsToShow;
        const currentPage = this.state.currentPage;
        const upperLimit = currentPage * pageSize;
        return data.slice((upperLimit - pageSize), upperLimit);
    }
    movePage(isNextPage) {
        let currentPage = this.state.currentPage;
        if (this.state.pageCount > 8) {
            const scroller = document.getElementById ("scroller");
            isNextPage ? scroller.scrollLeft += 34 : scroller.scrollLeft -= 34
        }
        this.setCurrentPage(isNextPage ?  currentPage += 1 : currentPage -= 1 );
    }
    render () {
        const actions = {
            addFriend: this.props.addFriend,
            starFriend: this.props.starFriend,
            deleteFriend: this.props.deleteFriend
        };
        return (
            <div>
                <div>
                    <FriendList friends={ this.getPaginatedData() } actions={ actions } />
                </div>
                <div className={ styles.paginationControls }>
                    <button className={ styles.paginationControlsArrows } disabled={ this.state.currentPage === 1 } onClick={ () => this.movePage(false) }>
                        <i className="fa fa-arrow-left"></i>
                    </button>
                    <div className={ styles.paginationControlsHolder } id="scroller">
                        <div className={ styles.paginationItems }>
                            { this.createPaginationControls() }
                        </div>
                    </div>
                    <button className={ styles.paginationControlsArrows } disabled={ this.state.currentPage === this.state.pageCount } onClick={ () => this.movePage(true) }>
                        <i  className="fa fa-arrow-right"></i>
                    </button>
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
