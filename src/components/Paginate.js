import React, { Component } from 'react';
import { connect } from 'react-redux';

import {addFriend, deleteFriend, starFriend} from '../actions/FriendsActions';
import { FriendList, AddFriendInput } from '../components';

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
    setCurrentPage(num) {
        this.setState({ currentPage: num });
    }
    createPaginationControls() {
        let controls = [];
        const pageCount = this.state.pageCount;
        for (let i = 1; i <= pageCount; i++) {
            const baseClassName = 'pagination-controls__button';
            const activeClassName = i === this.state.currentPage ? `${baseClassName}--active` : '';
            controls.push(
                <div
                    className={`${baseClassName} ${activeClassName}`}
                    key={i}
                    onClick={() => this.setCurrentPage(i)}
                >
                    {i}
                </div>
            );
        }
        return controls;
    }
    getPaginatedData() {
        const data = this.props.list;
        const pageSize = this.props.settings.itemsToShow;
        const currentPage = this.state.currentPage;
        const upperLimit = currentPage * pageSize;
        return data.slice((upperLimit - pageSize), upperLimit);
    }

    render () {
        const data = this.props.list.length > 0 ? this.props.list : [];
        const actions = {
            addFriend: this.props.addFriend,
            deleteFriend: this.props.deleteFriend,
            starFriend: this.props.starFriend
        };
        return (
            <div>
                <div className='pagination-controls'>
                    {this.createPaginationControls()}
                </div>
                <div>
                    <FriendList friends={ this.getPaginatedData()} actions={actions} />
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
