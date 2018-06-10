import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../action/actions'

import { Menu, Icon } from 'antd';
// router
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Reg extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { showModalClose, showmodal } = this.props;
        return (
            <div>
              reg
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

export default connect(mapStateToProps, mapDispatchToProps)(Reg);