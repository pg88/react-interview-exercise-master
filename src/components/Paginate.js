import React, { Component } from 'react';

class Paginate extends Component {
    constructor(props, context) {
        super(props, context);
        console.log(this.props, props);
        this.state = {
            list: this.props.friends.length > 0 ? this.props.friends : [],
        }
    }
    render () {
        const data = this.props.friends.length > 0 ? this.props.friends : [];
        return (
            <div>
                {data.map((item, index) => {
                    return (
                        <li  key={index}>
                            {item.name}
                        </li>
                    )
                })}
            </div>
        )
    }

}

export default Paginate;