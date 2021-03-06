import React from 'react';

import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

import * as Actions from '../../action/actions'
import { connect } from 'react-redux';

import muiThemeable from 'material-ui/styles/muiThemeable';

const styles = {
    propContainer: {
        width: 200,
        overflow: 'hidden',
        margin: '20px auto 0',
    },
    propToggleHeader: {
        margin: '20px auto 10px',
    },
};



class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: true,
            height: '300px',
            tableData: []
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        const apiUrl = '/search'
        fetch(apiUrl).then((response) => {
            if (response.status !== 200) {
                throw new Error('Fail to get response with status ' + response.status);
            }
            response.json().then((responseJson) => {
                this.setState({ tableData: responseJson });
            })
            .catch((error) => {
                this.setState({ tableData: null });
            });
        })
        .catch((error) => {
            this.setState({ tableData: null });
        });
    }
    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        });
    };

    handleChange = (event) => {
        this.setState({ height: event.target.value });
    };
    render() {

        return (
            <div>
                <Table
                    height={this.state.height}
                    fixedHeader={this.state.fixedHeader}
                    fixedFooter={this.state.fixedFooter}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                    >
                        <TableRow>
                            <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{ textAlign: 'center' }}>
                                Super Header
                  </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn tooltip="The Name">Index</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Name">Id</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Status">name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Status">password</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >
                        {this.state.tableData.map((row, index) => (
                            <TableRow key={index}>
                                <TableRowColumn>{index}</TableRowColumn>
                                <TableRowColumn>{row.id}</TableRowColumn>
                                <TableRowColumn>{row.name}</TableRowColumn>
                                <TableRowColumn>{row.password}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter adjustForCheckbox={this.state.showCheckboxes}>
                        <TableRow>
                            <TableRowColumn>ID</TableRowColumn>
                            <TableRowColumn>Name</TableRowColumn>
                            <TableRowColumn>Status</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn colSpan="3" style={{ textAlign: 'center' }}>
                                Super Footer
                  </TableRowColumn>
                        </TableRow>
                    </TableFooter>
                </Table>

                <div style={styles.propContainer}>
                    <h3>Table Properties</h3>
                    <TextField
                        floatingLabelText="Table Body Height"
                        defaultValue={this.state.height}
                        onChange={this.handleChange}
                    />
                    <Toggle
                        name="fixedHeader"
                        label="Fixed Header"
                        onToggle={this.handleToggle}
                        defaultToggled={this.state.fixedHeader}
                    />
                    <Toggle
                        name="fixedFooter"
                        label="Fixed Footer"
                        onToggle={this.handleToggle}
                        defaultToggled={this.state.fixedFooter}
                    />
                    <Toggle
                        name="selectable"
                        label="Selectable"
                        onToggle={this.handleToggle}
                        defaultToggled={this.state.selectable}
                    />
                    <Toggle
                        name="multiSelectable"
                        label="Multi-Selectable"
                        onToggle={this.handleToggle}
                        defaultToggled={this.state.multiSelectable}
                    />
                    <Toggle
                        name="enableSelectAll"
                        label="Enable Select All"
                        onToggle={this.handleToggle}
                        defaultToggled={this.state.enableSelectAll}
                    />
                    <h3 style={styles.propToggleHeader}>TableBody Properties</h3>
                    <Toggle
                        name="deselectOnClickaway"
                        label="Deselect On Clickaway"
                        onToggle={this.handleToggle}
                        defaultToggled={this.state.deselectOnClickaway}
                    />
                    <Toggle
                        name="stripedRows"
                        label="Stripe Rows"
                        onToggle={this.handleToggle}
                        defaultToggled={this.state.stripedRows}
                    />
                    <Toggle
                        name="showRowHover"
                        label="Show Row Hover"
                        onToggle={this.handleToggle}
                        defaultToggled={this.state.showRowHover}
                    />
                    <h3 style={styles.propToggleHeader}>Multiple Properties</h3>
                    <Toggle
                        name="showCheckboxes"
                        label="Show Checkboxes"
                        onToggle={this.handleToggle}
                        defaultToggled={this.state.showCheckboxes}
                    />
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    console.log(state)
    return {
        openLeftList: state.openLeftList,
        openRightList: state.openRightList
    }
}
function mapDispatchToProps(dispatch) {
    return {
        onToggleLeft: () => {
            dispatch(Actions.toggleLeft('openLeftList'));
        },
        onToggleRight: () => {
            dispatch(Actions.toggleRight('openRightList'));
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(Content));