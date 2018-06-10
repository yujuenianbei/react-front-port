import React from 'react';
import * as Actions from '../../action/actions'
import { connect } from 'react-redux';
import './right.css';
import { Navbar, Nav, Icon, IconButton } from 'rsuite';


class Right extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { openRightList } = this.props
        return (
            <div className={`${this.props.openRightList ? 'rightOpen' : ''} right`}>
                <Navbar>
                    <Navbar.Body>
                        <Nav justified appearance="subtle">
                            <Nav.Item className='rightNav' active>News</Nav.Item>
                            <Nav.Item className='rightNav'>Products</Nav.Item>
                        </Nav>
                    </Navbar.Body>
                </Navbar>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        openRightList: state.openRightList
    }
}
export default connect(mapStateToProps, null)(Right);
