import React from 'react';
import AppBar from 'material-ui/AppBar';

import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import FlatButton from 'material-ui/FlatButton';

import * as Actions from '../../action/actions'
import { connect } from 'react-redux';

import muiThemeable from 'material-ui/styles/muiThemeable';


import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/social/people';

class Header extends React.Component {
  constructor(props){
    super(props);
    this.onClick=this.onClick.bind(this);
  }
  onClick = ()=>{
    console.log(this.props)
  }
  render() {
    const { onToggleLeft,onToggleRight } = this.props
    return (
      <AppBar
        style={{backgroundColor: this.props.muiTheme.palette.textColor}}
        title="Title"
        onLeftIconButtonClick={onToggleLeft}
        onRightIconButtonClick={onToggleRight}
        iconElementLeft={<IconButton tooltip="左侧菜单"><NavigationMenu /></IconButton>}
        iconElementRight={<IconButton tooltip="右侧菜单"><ContentAdd /></IconButton>}
      />
    )
  }
}
function mapStateToProps(state) {
  console.log(state)
  return {
    openLeftList: state.openLeftList,
    openRightList: state.openRightList
  }
}
function mapDispatchToProps(dispatch) {
  return {
    onToggleLeft: () => {
      dispatch(Actions.toggleLeft('openLeftList'));
    },
    onToggleRight: () => {
      dispatch(Actions.toggleRight('openRightList'));
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(Header));