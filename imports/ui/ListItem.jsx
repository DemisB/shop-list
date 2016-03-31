import React, { Component } from 'react';


export default class ListItem extends Component {

    render() {
    
        return (
            <li>
                <strong>{this.props.name}</strong><br />
                {this.props.address}<br />
                {this.props.phone}
            </li>
        );
    }
}  
