import React, { Component } from 'react';

import List from './List.jsx';

export default class Map extends Component {
  
    constructor( props ) {

        super( props );
        
        this.state = {

            clickedMarkers: []
        };
    }

    createMarker( id, coords, title ) {

        this.markers[ id ] = new google.maps.Marker( {
            position: coords,
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
            <div>
                <div ref="googleMap" className="google-map-container">Je suis la carte et Dora se drogue</div>
                <List shops={this.props.shops} />
            </div>
        );
    }
} 
