import React from 'react';
import Drawer from 'material-ui/Drawer';
import RightList from './list'


import * as Actions from '../../action/actions'
import {connect} from 'react-redux';

class Right extends React.Component{
    render(){
        const {onClose,openRightList} = this.props
        return(
            <div>
                <Drawer
                docked={true}
                width={300}
                containerStyle={{top:'50px'}}
                openSecondary={true}
                open={openRightList}
                onRequestChange={onClose}
                >
                <RightList />
                </Drawer>
            </div> 
        )
    }
}

function mapStateToProps(state) {
    return {
        openRightList: state.openRightList
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      onOpen: () => {
        dispatch(Actions.openRight('openRightList'));
      },
      onClose: () => {
        dispatch(Actions.closeRight('openRightList'));
      }
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Right);