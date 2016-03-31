import React, { Component } from 'react';

import List from './List.jsx';

export default class Map extends Component {

    createMarker( id, coords, title ) {

        this.markers[ id ] = new google.maps.Marker( {
            position: coords,
            map: this.map,
            title: title
        } );
        /*
        //this.markers[ i ].addListener( 'click', this.clickedMarker );
        
        const theComponent = this;
        this.markers[ i ].addListener( 
            'click', 
            function( marker, component = theComponent ) {
        
                component.clickedMarker( i );
            } 
        );
        */
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
