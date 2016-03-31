import { Meteor } from 'meteor/meteor';
import '../imports/api/shops.js';

const fs = require( 'fs' );
const path = require( 'path' );

Meteor.startup( () => {
    

} );


Meteor.methods( {
    
    writeFile( fileName, data ) {
        
        let absFileName = path.join( fs.realpathSync( '.' ), fileName );
        console.log( absFileName );
        fs.writeFile( absFileName, data, { encoding: 'utf8' }, ( err ) => {
            
            if( ! err ) {
                console.log( 'j\'ai écrit le fichier, mec.' );
            } else {
                console.log( 'Un problème est survenu, malheureusement.' );
            }
            return;
        } );
        return;
    }    
    
} );

Router.route( '/get_file/:name', function() {
        
        let absFileName = path.join( fs.realpathSync( '.' ), this.params.name );
        this.response.end( fs.readFileSync( absFileName ) );
        return;
    }, { where: 'server' } 
);
