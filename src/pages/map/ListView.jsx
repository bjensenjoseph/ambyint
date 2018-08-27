import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { AutoComplete } from 'material-ui';

export default class ListView extends React.Component {

  state = {
    locations: this.props.locations
  };

  render() {
    return (
      <div>
        <AutoComplete
          floatingLabelText="Search locations..."
          filter={AutoComplete.fuzzyFilter}
          dataSource={this.props.locations}
          dataSourceConfig={{ text: 'formatted_address', value: 'formatted_address' }}
          maxSearchResults={10}
          fullWidth
          onNewRequest={(result) => this.setState({ locations: [result] })}
          onUpdateInput={() => this.setState({ locations: this.props.locations })}
        />
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Address</TableHeaderColumn>
              <TableHeaderColumn>Latitude</TableHeaderColumn>
              <TableHeaderColumn>Longitude</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.state.locations.map(loc => (
              <TableRow>
                <TableRowColumn>{loc.formatted_address}</TableRowColumn>
                <TableRowColumn>{loc.geometry.location.lat}</TableRowColumn>
                <TableRowColumn>{loc.geometry.location.lng}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
}
