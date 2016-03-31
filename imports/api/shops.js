import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Shops = new Mongo.Collection( 'shops' );

if( Meteor.isServer ) {
    
    Meteor.publish( 'shops', function() {
        
        return Shops.find( {} );
    } );
}

Meteor.methods( {
    
    addShop( googleId, name, address, coords ) {
        
        Shops.insert( {
            googleId: googleId,
            name: name,
            address: address,
            coords: coords
        } );
    }
} );