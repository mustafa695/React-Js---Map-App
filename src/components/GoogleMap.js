import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';



export class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // for google map places autocomplete
      address: '',

      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
  
      mapCenter: {
        lat: 49.2827291,
        lng: -123.1207375
      },
      zoom: 12,
      zoomClass: false,
    
     
    };
  }

  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);

        // update center state
        this.setState({ mapCenter: latLng });
        this.setState({zoomClass: true})
       
      })
      .catch(error => console.error('Error', error));
  };
 
  render() {
    return (
      <div id='googleMaps'>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div className="searchBox">
              <div className="pos-relative">    
              <input type="search"
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div className="loading">Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#ddd', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                 
                  );
                })}
              </div>
            </div>
            </div>
          )}
        </PlacesAutocomplete>

        <Map 
          google={this.props.google}
          initialCenter={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng
          }}
          center={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng
          }}
          zoom = {this.state.zoom}
        
        >
          <Marker 
            position={{
              lat: this.state.mapCenter.lat,
              lng: this.state.mapCenter.lng
            }} 
            // animation={window.google.maps.Animation.DROP}
            animation={2}
            />
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDyHw1ODJ-q3HKSneTCp6N66sKaLLjx-84')
})(GoogleMap)