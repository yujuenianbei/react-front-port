import React from 'react';
import * as Actions from '../../action/actions'
import { connect } from 'react-redux';
import './userCenter.css'
import { Table, Alert, Notification, Paragraph, Button, IconButton, ButtonGroup, ButtonToolbar, Icon, Modal, InputGroup, Divider } from 'rsuite';
import { Input } from 'antd';
const { Column, HeaderCell, Cell, Pagination } = Table;


class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      addModalState: false,
      addUserName: '',
      addUserPassword: '',
      deleteModalState: false,
      deleteRowId: '',
      editModalState: false,
      editId: '',
      editUserName: '',
      editUserPassord: '',
    };
    // 调试
    this.console = this.console.bind(this);
    this.userRemoveAll = this.userRemoveAll.bind(this)
    // 新增弹出框
    this.insertOpen = this.insertOpen.bind(this);
    this.insertClose = this.insertClose.bind(this);
    // 新增输入框
    this.addInputChange = this.addInputChange.bind(this);
    this.addInputUsernameChange = this.addInputUsernameChange.bind(this);
    this.addInputUserPasswordChange = this.addInputUserPasswordChange.bind(this);

    // 新增弹出框
    this.editOpen = this.editOpen.bind(this);
    this.editClose = this.editClose.bind(this);
    // 新增输入框
    this.editInputChange = this.editInputChange.bind(this);
    this.editInputUsernameChange = this.editInputUsernameChange.bind(this);
    this.editInputUserPasswordChange = this.editInputUserPasswordChange.bind(this);

    // 删除弹出框
    this.deleteModalOpen = this.deleteModalOpen.bind(this); 
    this.deleteModalClose = this.deleteModalClose.bind(this);
    // 删除
    this.deletRowData =this.deletRowData.bind(this);
    this.deleteData = this.deleteData.bind(this);

    // 导出excel
    this.outPutExcel = this.outPutExcel.bind(this);
  }
  // 获取数据
  componentDidMount() {
    // 可直接调用props中的函数
    const { showLoadingOpen, showLoadingClose } = this.props;
    showLoadingOpen();
    const apiUrl = '/search'
    fetch(apiUrl).then((response) => {
      if (response.status !== 200) {
        throw new Error('Fail to get response with status ' + response.status);
      }
      response.json().then((responseJson) => {
        this.setState({ tableData: responseJson.reqData });
        showLoadingClose();
        // alert
        Alert.success('请求成功')
        // Notification
        Notification.open({
          // title: '消息',
          duration: 2000,
          description: (
            <div>
              <p>请求成功</p>
            </div>
          )
        });
      })
        .catch((error) => {
          showLoadingClose();
          Alert.success('数据查询失败')
        });
    })
      .catch((error) => {
        showLoadingClose();
        Alert.success('数据查询失败')
      });
  }
  // 调试console.log
  console(text) {
    console.log(text);
  }
  // 打开新增弹出框
  insertOpen() {
    this.setState({ addModalState: true })
  }
  // 关闭新增弹出框
  insertClose() {
    this.setState({ addModalState: false })
  }
  // 用户名写入state
  addInputUsernameChange(event) {
    this.setState({ addUserName: event.target.value });
  }
  // 密码写入state
  addInputUserPasswordChange(event) {
    this.setState({ addUserPassword: event.target.value });
  }
  // 确定新增
  addInputChange() {
    const { showLoadingOpen, showLoadingClose } = this.props;
    showLoadingOpen();
    const url = '/add'
    const opts = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.addUserName, 
          password: this.state.addUserPassword
        })
    }
    fetch(url, opts)
      .then((res) => {
        //网络请求成功,执行该回调函数,得到响应对象,通过response可以获取请求的数据
        //json text等
        //你可以在这个时候将Promise对象转换成json对象:response.json()
        //转换成json对象后return，给下一步的.then处理
        return res.json();
        //或 return response.json();
      })
      .then((res) => {
        // console.log(res)
        //处理请求得到的数据
        fetch('/search', { // 在URL中写上传递的参数
          method: 'GET'
        })
          .then((response) => {
            // console.log(response)
            return response.json()
          })
          .then((response) => {
            // console.log(response)
            this.setState({ tableData: response.reqData , addModalState: false, addUserName:'',addUserPassword:'' })
            showLoadingClose();
            Alert.success('请求成功')
          })
          .catch((error) => {
            showLoadingClose();
            this.setState({ addModalState: false, addUserName:'',addUserPassword:'' })
            Alert.success('数据查询失败')
            //网络请求失败,执行该回到函数,得到错误信息
          })
      })
      .catch((error) => {
        showLoadingClose();
        this.setState({ addModalState: false, addUserName:'',addUserPassword:'' })
        Alert.success('数据添加失败')
        //网络请求失败,执行该回到函数,得到错误信息
      })
  }

  // 打开编辑弹出框
  editOpen() {
    this.setState({ editModalState: true })
  }
  // 关闭编辑弹出框
  editClose() {
    this.setState({ editModalState: false })
  }
  // 用户名写入state
  editInputUsernameChange(event) {
    this.setState({ editUserName: event.target.value });
  }
  // 密码写入state
  editInputUserPasswordChange(event) {
    this.setState({ editUserPassord: event.target.value });
  }
  editInputChange() {
    const { showLoadingOpen, showLoadingClose } = this.props;
    showLoadingOpen();
    const url = '/update'
    const opts = {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id:this.state.editId,
          name: this.state.editUserName, 
          password: this.state.editUserPassord
        })
    }
    fetch(url, opts)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        fetch('/search', {
          method: 'GET'
        })
          .then((response) => {
            return response.json()
          })
          .then((response) => {
            this.setState({ tableData: response.reqData , editModalState: false, editId:'', editUserName:'',editUserPassord:'' })
            showLoadingClose();
            Alert.success('请求成功')
          })
          .catch((error) => {
            showLoadingClose();
            this.setState({ editModalState: false, editId: '', editUserName:'',editUserPassord:'' })
            Alert.success('数据查询失败')
          })
      })
      .catch((error) => {
        showLoadingClose();
        this.setState({ editModalState: false, editId: '', editUserName:'',editUserPassord:'' })
        Alert.success('数据编辑失败')
      })
  }




  // 打开删除弹出框
  deleteModalOpen() {
    this.setState({ deleteModalState: true })
  }
  // 关闭删除弹出框
  deleteModalClose() {
    this.setState({ deleteModalState: false })
  }
  // row click事件
  deletRowData(id) {
    console.log(id)
  }
  // 确定删除
  deleteData() {
    const { showLoadingOpen, showLoadingClose } = this.props;
    showLoadingOpen();
    const url = '/remove'
    const opts = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id:this.state.deleteRowId
        })
    }
    fetch(url, opts)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        //处理请求得到的数据
        fetch('/search', {
          method: 'GET'
        })
          .then((response) => {
            return response.json()
          })
          .then((response) => {
            this.setState({ tableData: response.reqData, deleteModalState: false, deleteRowId: '' })
            showLoadingClose();
            Alert.success('请求成功')
          })
          .catch((error) => {
            this.setState({ deleteModalState: false, deleteRowId: '' })
            Alert.success('数据查询失败')
          })
      })
      .catch((error) => {
        this.setState({ deleteModalState: false, deleteRowId: '' })
        Alert.success('数据删除失败')
      })
  }

  // 导出excel
  outPutExcel() {
    fetch('/exceljs', { // 在URL中写上传递的参数
      method: 'GET'
    })
      .then((res) => {
        console.log(res)
        return res.json()
      })
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        Alert.success('数据清空失败')
      })
  }
// 清空表
  userRemoveAll() {
    const { showLoadingOpen, showLoadingClose } = this.props;
    showLoadingOpen();
    fetch('/truncat',{
      method: 'GET'
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        //处理请求得到的数据
        fetch('/search', {
          method: 'GET'
        })
          .then((response) => {
            return response.json()
          })
          .then((response) => {
            this.setState({ tableData: response.reqData });
            showLoadingClose();
            Alert.success('请求成功')
          })
          .catch((error) => {
            showLoadingClose();
            Alert.success('数据查询失败')
          })
      })
      .catch((error) => {
        showLoadingClose();
        Alert.success('数据清空失败')
      })
  }

  render() {
    const { showmodal } = this.props
    // cell操作
    const ActionCell = ({ rowData, dataKey, ...props }) => {
      // 将选取的id写入state
      const removeAction = ({ ...props }) => {
        this.setState({ deleteRowId: rowData[dataKey],deleteModalState: true })
      }
      const editAction = ({ ...props }) => {
        this.setState({ editId: rowData[dataKey], editUserName:rowData.name,editUserPassord:rowData.password, editModalState: true })
      }
      return (
        <Cell {...props}>
          <a onClick={editAction}> 编辑 </a>
          <Divider vertical />
          <a onClick={removeAction}> 删除 </a>
        </Cell>
      );
    };
    return (
      <div className='content'>
        <div>
          <ButtonToolbar>
            <Button color="green" onClick={this.insertOpen}>
              <Icon icon="expand-o" /> 新增
            </Button>
            <Modal
              show={this.state.addModalState}
              onHide={this.insertClose}
            >
              <Modal.Header>
                <Modal.Title>新增</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <InputGroup className="userInput">
                  <Input type="text" value={this.state.addUserName} onChange={this.addInputUsernameChange} placeholder="用户名" />
                </InputGroup>
                <InputGroup className="userInput">
                  <Input type="text" value={this.state.addUserPassword} onChange={this.addInputUserPasswordChange} placeholder="密码" />
                </InputGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.addInputChange} appearance="primary">确定</Button>
                <Button onClick={this.insertClose} appearance="subtle">取消</Button>
              </Modal.Footer>
            </Modal>
            {/* 下载 */}
            <Button color="blue" onClick={this.outPutExcel} >
              <Icon icon="download" /> 下载
            </Button>

            {/* 下载 */}
            <Button color="red" onClick={this.userRemoveAll}>
              <Icon icon="refresh2" /> 清表
            </Button>

            {/* 编辑 */}
            <Modal
              show={this.state.editModalState}
              onHide={this.editClose}
            >
              <Modal.Header>
                <Modal.Title>编辑</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <InputGroup className="userInput">
                  <Input type="text" value={this.state.editId} disabled />
                </InputGroup>
                <InputGroup className="userInput">
                  <Input type="text" value={this.state.editUserName} onChange={this.editInputUsernameChange} placeholder="用户名" />
                </InputGroup>
                <InputGroup className="userInput">
                  <Input type="text" value={this.state.editUserPassord} onChange={this.editInputUserPasswordChange} placeholder="密码" />
                </InputGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.editInputChange} appearance="primary">确定</Button>
                <Button onClick={this.editClose} appearance="subtle">取消</Button>
              </Modal.Footer>
            </Modal>
            {/* 删除 */}
            <Modal
              show={this.state.deleteModalState}
              onHide={this.deleteModalClose}
            >
              <Modal.Header>
                <Modal.Title>删除</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                是否删除 id={this.state.deleteRowId} 这条信息
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.deleteData} appearance="primary">确定</Button>
                <Button onClick={this.deleteModalClose} appearance="subtle">取消</Button>
              </Modal.Footer>
            </Modal>
          </ButtonToolbar>
        </div>
        <div>
          <Table
            height={800}
            data={this.state.tableData}
            onRowClick={tableData => {
              console.log(tableData);
              this.deletRowData(tableData.id)
            }}
          >
            <Column width={70} align="center" fixed>
              <HeaderCell>编号</HeaderCell>
              <Cell dataKey="id" />
            </Column>

            <Column width={200} fixed>
              <HeaderCell>姓名</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column width={200}>
              <HeaderCell>密码</HeaderCell>
              <Cell dataKey="password" />
            </Column>

            <Column width={200}>
              <HeaderCell>操作</HeaderCell>
              <ActionCell dataKey="id" />
            </Column>
          </Table>
        </div>
      </div>
    )
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
