import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { load as loadLocations } from './MapReducer';
import MapView from './MapView';
import ListView from './ListView';
import { LinearProgress, RaisedButton } from 'material-ui';

class MapContainer extends React.Component {

  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.object,
    locations: PropTypes.array,
    rooftopLocations: PropTypes.array
  };

  state = {
    centerStyle: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)'
    },
    mapView: true,
    mapCenter: { lat: 33.8077297, lng: -84.2399398 }
  };

  componentDidMount() {
    if (this.props.locations.length === 0) {
      this.props.loadLocations();
    }
  }

  changeView() {
    this.setState({ mapView: !this.state.mapView });
  }

  render() {
    const { error, loading, rooftopLocations } = this.props;
    const { centerStyle, mapView, mapCenter } = this.state;
    if (loading) {
      return (
        <div style={centerStyle}>
          <LinearProgress mode="indeterminate" />
          <div>Loading locations, this will take a few seconds...</div>
        </div>
      );
    }
    if (error) {
      return <div style={centerStyle}>Whoops something is wrong...</div>;
    }
    return (
      <div>
        <RaisedButton
          onClick={() => this.changeView()}
          style={{
            position: 'relative',
            zIndex: 10,
            transform: 'translate(7em, 0.4em)'
          }}
        >
          {mapView ? 'List' : 'Map'} View
        </RaisedButton>
        {mapView ?
          <MapView {...this.props} mapCenter={mapCenter} /> :
          <ListView locations={rooftopLocations} />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.locations.error,
  loading: state.locations.loading,
  locations: state.locations.list,
  rooftopLocations: state.locations.list.filter(loc => loc.geometry.location_type === 'ROOFTOP')
});

const mapDispatchToProps = {
  loadLocations
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
