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
                
                //console.log( shop.name + ', ' + shop.address + ', ' + shop.phone );
                //console.log( csvData );
                csvData = csvData + shop.name + ', ' + shop.address + ', ' + shop.phone + '\n';
            }
        } );
        console.log( csvData );
        this.refs.csvDataBox.value = csvData;
    }

    render() {
    
        return (
            <div className="list-container">
                <ul>
                   {this.renderList()}
                </ul>
                <button className="dl-button" onClick={this.downloadList.bind( this )}>Download list</button>
                <textarea className="textbox"  ref="csvDataBox" />
            </div>
        );
    }
} 
