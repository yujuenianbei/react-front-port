import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../action/actions'

import './login.css'
// router
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";

import Login from './login'
import Reg from './reg'

class LoginMain extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { showModalClose, showmodal } = this.props;
        return (
            <HashRouter>
            <div className='login'>
              <ul className="header">
                <li><NavLink to="/login">登录</NavLink></li>
                <li><NavLink to="/reg">注册</NavLink></li>
              </ul>
              <div className="content">
                <Route exact path="/login" component={Login}/>
                <Route path="/reg" component={Reg}/>
              </div>
            </div>
          </HashRouter>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
      showModalClose: () => {
        dispatch(Actions.modalclose('showmodal'));
      }
    }
  }

export default connect(null, mapDispatchToProps)(LoginMain);