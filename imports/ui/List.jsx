import React, { Component } from 'react';

import ListItem from './ListItem.jsx';

export default class List extends Component {

    renderList() {
    
        return this.props.shops.map( ( shop ) => {
        
            return (
                <ListItem 
                    key={shop._id} 
                    name={shop.name}
                    address={shop.address}
                    phone={shop.phone} />
            );
        } );
    }

    render() {
    
        return (
            <div className="list-container">
                <ul>
                   {this.renderList()}
                </ul>
            </div>
        );
    }
} 
