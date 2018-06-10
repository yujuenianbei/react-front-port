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

import Content from './content/content'
import About from './content/About'

class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { showModalClose, showmodal } = this.props;
        return (
            <Router>
                <div className='main'>
                    {/* 加载器 */}
                    <Loader style={{ display: this.props.showLoading ? 'block' : 'none' }} size="md" backdrop content="加载中..." vertical center />
                    {/* 模态框 */}
                    <ModalText />
                    <HeaerTop />
                    <Left />
                    <div className={`${this.props.openLeftList === true ? 'bodyLeftActive' : 'bodyLeftDefault'} content`}>
                        <Route path="/home" component={Content} />
                        <Route path="/about" component={About} />
                    </div>
                    <Right />
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);