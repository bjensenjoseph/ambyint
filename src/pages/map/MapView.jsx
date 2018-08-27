import React from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import { AutoComplete, Dialog, FlatButton, FloatingActionButton } from 'material-ui';
import ActionSearch from 'material-ui/svg-icons/action/search';

export class MapView extends React.Component {

  constructor(props) {
    super(props);
    this.updateLocation = this.updateLocation.bind(this);
    this.openSearch = this.openSearch.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  state = {
    searchOpen: false,
    zoomLevel: 5,
    mapCenter: { lat: 33.8077297, lng: -84.2399398 },
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    console.log('marker', props);
  }

  openSearch() {
    this.setState({ searchOpen: true })
  }

  handleClose() {
    this.setState({ searchOpen: false });
  }

  updateLocation(address) {
    this.setState({ mapCenter: address.geometry.location, zoomLevel: 12, searchOpen: false });
  }

  render() {
    const { google, rooftopLocations } = this.props;
    const { mapCenter, zoomLevel } = this.state;
    return (
      <div>
        <div>
          <FloatingActionButton
            onClick={this.openSearch}
            style={{ position: 'relative', zIndex: 11, left: '85%', bottom: '30px' }}>
            <ActionSearch/>
          </FloatingActionButton>
          <Dialog
            title="Go to location on map"
            actions={[
              <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
              />,
            ]}
            modal={false}
            open={this.state.searchOpen}
            onRequestClose={this.handleClose}
          >
            <AutoComplete
              floatingLabelText="Search locations..."
              filter={AutoComplete.fuzzyFilter}
              dataSource={rooftopLocations}
              dataSourceConfig={{ text: 'formatted_address', value: 'formatted_address' }}
              maxSearchResults={5}
              fullWidth
              onNewRequest={this.updateLocation}
            />
          </Dialog>
          <Map
            style={{ top: '-96px' }}
            google={google}
            zoom={zoomLevel}
            center={mapCenter}
            initialCenter={rooftopLocations[0].geometry.location}
            onClick={this.onMapClicked}
          >
            {rooftopLocations.map((rooftop, index) => (
              <Marker
                key={index}
                position={rooftop.geometry.location}
                name={rooftop.formatted_address}
                title={rooftop.formatted_address}
                onClick={this.onMarkerClick}
              />
            ))}
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}>
              <div>
                <h6>{this.state.selectedPlace.name}</h6>
              </div>
            </InfoWindow>
          </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBaQ3avEy7FX00e1Rkh5hbPaQ1rR9a7Igs'
})(MapView);
