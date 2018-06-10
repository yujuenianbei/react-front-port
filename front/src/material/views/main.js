import React from 'react';
import HeaerTop from './header/header'
import Content from './content/content'
import Left from './left/left'
import Right from './right/right'
import { connect } from 'react-redux';

import './main.css'

class Header extends React.Component {
    constructor() {
        super();
        this.console = this.console.bind(this);
    }
    console = () => {
        console.log(this.props.openLeftList)
    }
    render() {
        return (
            <div>
                <HeaerTop />
                <div className={`${this.props.openLeftList === true ? 'bodyLeftActive' : 'bodyLeftDefault'} ${this.props.openRightList === true ? 'bodyRightActive' : 'bodyRightDefault'}`}>
                    <Content />
                </div>
                <Left />
                <Right />
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        openLeftList: state.openLeftList,
        openRightList: state.openRightList
    }
}

export default connect(mapStateToProps, null)(Header);