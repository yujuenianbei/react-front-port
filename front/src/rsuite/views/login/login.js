import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../action/actions'
import { Alert, Notification, Button, IconButton, ButtonGroup, ButtonToolbar, Icon, Modal, Divider } from 'rsuite';
import { Input } from 'antd';
// router
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Login extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { showModalClose, showmodal } = this.props;
        return (
            <div className='enter'>
                <div className="userInput">
                    <Input type="text" placeholder="用户名" />
                </div>
                <div className="userInput">
                    <Input type="text" placeholder="密码" />
                </div>
                <div>
                <Button color="green" block>登录</Button>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);