import React from 'react';
import HeaerTop from './header/header'
import Left from './left/left'
import Right from './right/right'
import { connect } from 'react-redux';
import * as Actions from '../action/actions'
import { Loader, Modal, Button } from 'rsuite';
import '../main.css'

import ModalText from './components/modal'

// router
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Main from './main'

import LoginMain from './login/index'

class Enter extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { showModalClose, showmodal } = this.props;
        return (
            <Router>
                <div className='main'>
                    <Route exact path="/" component={LoginMain} />
                    <Route path="/main" component={Main} />
                </div>
            </Router>
        )
    }
}

function mapStateToProps(state) {
    return {
        showmodal: state.showmodal,
        showLoading: state.showLoading,
        openLeftList: state.openLeftList,
        openRightList: state.openRightList,
    }
}
function mapDispatchToProps(dispatch) {
    return {
      showModalClose: () => {
        dispatch(Actions.modalclose('showmodal'));
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Enter);