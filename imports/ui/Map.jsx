import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

import List from './List.jsx';

export default class Map extends Component {
  
    constructor( props ) {

        super( props );
        
        this.state = {

            clickedMarkers: []
        };
    }

    updateDatabase() {
    
        let request = {
            query: 'micromania',
            bounds: new google.maps.LatLngBounds( 
                { lat: 42.406056, lng: -4.929832 }, 
                { lat: 51.719707, lng: 8.256385 } 
            )
        };
        
        let service = new google.maps.places.PlacesService( this.map );
        
        const theComponent = this;
        service.textSearch( request, processResults );
        
        function processResults( results, status, pagination, component = theComponent ) {
            
            if( status == google.maps.places.PlacesServiceStatus.OK ) {
                for( var i = 0; i < results.length; i++ ) {
                    
                    Meteor.call( 'addShop', 
                        results[ i ].place_id,
                        results[ i ].name,
                        results[ i ].formatted_address,
                        JSON.stringify( results[ i ].geometry.location.toJSON() ) 
                    );
                }
                if( pagination.hasNextPage ) {
                
                    pagination.nextPage();
                }
            }
        }
    }
    
    createMarker( id, coords, title ) {

        this.markers[ id ] = new google.maps.Marker( {
            position: JSON.parse( coords ),
            map: this.map,
            title: title
        } );
        
        
        const theComponent = this;
        this.markers[ id ].addListener( 
            'click', 
            function( marker, component = theComponent ) {
        
                component.clickedMarker( id );
            } 
        );
    }

    clickedMarker( i ) {
    
        let newArray = [];
        if( this.state.clickedMarkers.indexOf( i ) < 0 ) {
        
            newArray = this.state.clickedMarkers.concat( [ i ] );
            this.markers[ i ].setAnimation( google.maps.Animation.BOUNCE );
            this.props.shops[ i ].clicked = true;
        } else {
        
            newArray = this.state.clickedMarkers.filter( function( markerNb ) {
                
                return markerNb != i;
            } );
            this.markers[ i ].setAnimation( null );
            this.props.shops[ i ].clicked = false;
        }
        
        this.setState( {
        
            clickedMarkers: newArray
        } );
    }
    
    componentDidMount() {

        const mapProp = {
            center: new google.maps.LatLng( 46.500709, 2.544530 ),
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map( this.refs.googleMap, mapProp );
    }
    
    componentWillReceiveProps( nextProps ) {

        
        if( nextProps.shops != this.props.shops ) {
        
            this.markers = [];
            nextProps.shops.forEach( ( item, index ) => {
            
                this.createMarker( index, item.coords, item.name );
            }, this );
        }
    }
    
    render() {

        return (
            <div className="map-list-container">
                <button className="dl-button" onClick={this.updateDatabase.bind( this )}>Update database</button>
                <div ref="googleMap" className="google-map-container" />
                <List shops={this.props.shops} />
            </div>
        );
    }
} 
