import React, { Component } from 'react';


export default class ListItem extends Component {

    shouldComponentUpdate( nextProps ) {
    
        return nextProps.clicked != this.props.clicked;
    }
    
    render() {
    
        const itemClass = this.props.clicked ? 'selected' : '';
        return (
            <li className={itemClass}>
                <strong>{this.props.name}</strong><br />
                {this.props.address}<br />
                {this.props.phone}
            </li>
        );
    }
}  
