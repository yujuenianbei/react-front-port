import React from 'react';
import { Sidenav, Navbar, Dropdown, Nav, Icon, Toggle } from 'rsuite';
import * as Actions from '../../action/actions'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class Left extends React.Component {
    constructor(){
        super();
      }
    render() {
        const { openLeftList } = this.props
        return (
            <div className='left' style={{ width: openLeftList ? '250px' :'56px' }}>
                <Sidenav defaultOpenKeys={["1"]} defaultActiveKey="1" expanded={openLeftList}>
                    <Sidenav.Body>
                        <Nav>
                            <Nav.Item eventKey="1" componentClass='div' active icon={<Icon icon="dashboard"/>}>
                                <Link to="/home">
                                Home
                                </Link>
                            </Nav.Item>
                            <Nav.Item eventKey="2" componentClass='div' icon={<Icon icon="group" />}>
                                <Link to="/about">About</Link>
                            </Nav.Item>
                            <Dropdown eventKey="3" title="Advanced" icon={<Icon icon="magic" />}>
                                <Dropdown.Item eventKey="3-1">Geo</Dropdown.Item>
                                <Dropdown.Item eventKey="3-2">Devices</Dropdown.Item>
                                <Dropdown.Item eventKey="3-3">Loyalty</Dropdown.Item>
                                <Dropdown.Item eventKey="3-4">Visit Depth</Dropdown.Item>
                            </Dropdown>
                            <Dropdown eventKey="4" title="Settings" icon={<Icon icon="gears" />}>
                                <Dropdown.Item eventKey="4-1" >Applications</Dropdown.Item>
                                <Dropdown.Item eventKey="4-2">Channels</Dropdown.Item>
                                <Dropdown.Item eventKey="4-3">Versions</Dropdown.Item>
                                <Dropdown.Menu eventKey="4-5" title="Custom Action">
                                    <Dropdown.Item eventKey="4-5-1" >Action Name</Dropdown.Item>
                                    <Dropdown.Item eventKey="4-5-2">Action Params</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      openLeftList: state.openLeftList
    }
  }




export default connect(mapStateToProps, null)(Left);
