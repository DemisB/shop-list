import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Shops } from '../api/shops.js';

import Map from './Map.jsx';

class App extends Component {

    render() {

        return (

            <Map shops={this.props.shops} />
        );
    }
}


App.propTypes = {

    shops: PropTypes.array.isRequired,
};

 

export default createContainer( () => {

    Meteor.subscribe( 'shops' );
    
    return {

        shops: Shops.find( {} ).fetch(),
    };
}, App );