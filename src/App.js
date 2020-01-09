import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { Table, Modal, Button } from 'antd';
import Menu from './Component/Menu';

const axios = require('axios');

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text, record) => (
      <span>
          {record.venue.name}
       </span>
    ),
  }
 
];



class App extends React.Component
{

  state = {
    data: [],
    loading: false,
    info:{},
    modalVisible: false
  }

  togleLoading = (enable) => {

      this.setState({
        loading : enable,
        modalVisible: false
      });
  }

  setSelectedItem = (query) => {
      this.setState({ loading: true });
      axios.get("https://agile-beyond-52653.herokuapp.com/api/list/?query="+query)
      .then(res => {
          this.setState({
              data: res.data.response.groups[0].items
          });
          this.setState({ loading: false });
      })
  }

  selectRow = (record, rowIndex) => {
    const info = {
        name: record.venue.name,
        address: record.venue.location.address + " - " + record.venue.location.city,
        country: record.venue.location.country
    }
    this.setState({
        info
    });
    this.setState({
      modalVisible: true,
    });
  }

  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  handleOk = e => {
    this.setState({
      modalVisible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      modalVisible: false,
    });
  };

  render() 
  {
    return (
        
        <Container fluid>
          <header>
              <Row>
                  
              </Row>
          </header>
          <main>
              <Row>
                    <Col xl={2} md={3}>
                      <aside className="left-menu">
                          <Menu setSelectedItem={this.setSelectedItem}  />
                      </aside>
                    </Col>
                    <Col xs={8} md={9}>
                          <Table columns={columns} dataSource={this.state.data} loading={this.state.loading}  onRow={(record, rowIndex) => {
                                return { onClick: event => this.selectRow(record, rowIndex)}
                            }} />
                    </Col>
                </Row>
            </main> 
            <Modal title={this.state.info.name} visible={this.state.modalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
            <p>{this.state.info.name}</p>
            <p>{this.state.info.address}</p>
            <p>{this.state.info.country}</p>
          </Modal>
        </Container>
        
    )
  }
}
export default App;