import { Meteor } from 'meteor/meteor';
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
                    phone={shop.phone}
                    clicked={shop.clicked} />
            );
        } );
    }
    
    downloadList() {
    
        csvData = '';
        this.props.shops.forEach( ( shop, index ) => {
    
            if( shop.clicked == true ) {
                
                csvData = csvData + shop.name + ', ' + shop.address + ', ' + shop.phone + '\n';
            }
        } );
        
        Meteor.call( 'writeFile', 'micromania.csv', csvData );
        Router.go( '/get_file/micromania.csv' );
    }

    render() {
    
        return (
            <div className="list-container">
                <ul>
                   {this.renderList()}
                </ul>
                <button className="dl-button" onClick={this.downloadList.bind( this )}>Download list</button>
            </div>
        );
    }
} 
