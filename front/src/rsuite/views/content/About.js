import React from 'react';
import * as Actions from '../../action/actions'
import { connect } from 'react-redux';
import './userCenter.css'
import { Input } from 'antd';


class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    console.log(this.state.value)
  }

  render() {
    return (
      <div>
      <Input placeholder="Basic usage" />
          <Input type="text" value={this.state.value} onChange={this.handleChange} />
          </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    showmodal: state.showmodal,
    openLeftList: state.openLeftList,
    showLoading: state.showLoading
  }
}
function mapDispatchToProps(dispatch) {
  return {
    showLoadingOpen: () => {
      dispatch(Actions.loadingopen('showLoading'));
    }, 
    showLoadingClose: () => {
      dispatch(Actions.loadingclose('showLoading'));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
