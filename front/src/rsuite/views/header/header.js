import React from 'react';
import { Navbar, Dropdown, Nav, Icon, Toggle, IconButton } from 'rsuite';
import * as Actions from '../../action/actions'
import { connect } from 'react-redux';


class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { onToggleLeft, onToggleRight, showLoadingOn } = this.props
        return (
            <Navbar>
                {/* 头部信息 */}
                <Navbar.Header>
                    <IconButton onClick={onToggleLeft} icon={<Icon icon="align-justify" />} />
                    {/* <IconButton onClick={showLoadingOn} icon={<Icon icon="align-justify" />} /> */}
                </Navbar.Header>
                <Navbar.Body>
                    <Nav>
                        <Nav.Item icon={<Icon icon="home" />} >Home</Nav.Item>
                        <Nav.Item>News</Nav.Item>
                        <Nav.Item>Products</Nav.Item>
                        <Dropdown title="About">
                            <Dropdown.Item>Company</Dropdown.Item>
                            <Dropdown.Item>Team</Dropdown.Item>
                            <Dropdown.Item>Contact</Dropdown.Item>
                        </Dropdown>
                    </Nav>
                    <Nav pullRight>
                        <Nav.Item icon={<Icon icon="cog" />} onClick={onToggleRight}></Nav.Item>
                    </Nav>
                </Navbar.Body>
            </Navbar>
        )
    }
}

function mapStateToProps(state) {
    return {
        openLeftList: state.openLeftList,
        openRightList: state.openRightList,
        showLoading: state.showLoading
    }
}
function mapDispatchToProps(dispatch) {
    return {
        onToggleLeft: () => {
            dispatch(Actions.toggleLeft('openLeftList'));
        },
        onToggleRight: () => {
            dispatch(Actions.toggleRight('openRightList'));
        },
        showLoadingOn: () => {
            dispatch(Actions.loading('showLoading'));
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Header);