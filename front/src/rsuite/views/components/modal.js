import React from 'react';
import * as Actions from '../../action/actions'
import { connect } from 'react-redux';
import { Table, Alert,Notification, Paragraph, Button, IconButton, ButtonGroup, ButtonToolbar, Icon, Modal, Input } from 'rsuite';

class ModalText extends React.Component {
  render() {
      console.log(this.props)
      return(
        <Modal
        show={this.props.showmodal}
        onHide={this.props.showModalClose}
      >
        <Modal.Header>
            <Modal.Title>弹出层</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            123231
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={this.props.showModalClose} appearance="primary">确定</Button>
            <Button onClick={this.props.showModalClose} appearance="subtle">取消</Button>
        </Modal.Footer>
      </Modal>
      )
    }
}


function mapStateToProps(state) {
  return {
      showmodal: state.showmodal,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    showModalClose: () => {
      dispatch(Actions.modalclose('showmodal'));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalText);

