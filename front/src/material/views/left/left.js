import React from 'react';
import Drawer from 'material-ui/Drawer';
import LeftList from './list'


import * as Actions from '../../action/actions'
import {connect} from 'react-redux';

class Left extends React.Component{
    render(){
        const {onClose,openLeftList} = this.props
        return(
            <div>
                <Drawer
                containerStyle={{top:'50px'}}
                docked={true}
                width={200}
                open={openLeftList}
                onRequestChange={onClose}
                >
                <LeftList />
                </Drawer>
            </div> 
        )
    }
}

function mapStateToProps(state) {
    return {
      openLeftList: state.openLeftList
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      onOpen: () => {
        dispatch(Actions.openLeft('openLeftList'));
      },
      onClose: () => {
        dispatch(Actions.closeLeft('openLeftList'));
      }
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Left);