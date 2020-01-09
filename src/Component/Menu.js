import React from 'react';
import { Tree, Spin } from 'antd';
import 'antd/dist/antd.css';
const { TreeNode } = Tree;
const axios = require('axios');

class Menu extends React.Component
{
    state = {
      data:[],
      loading: true
    }
    onSelect = (selectedKeys, info) => {
        const { setSelectedItem } = this.props;
        setSelectedItem(selectedKeys);  
    };
    componentDidMount() {
      
      axios.get(`https://agile-beyond-52653.herokuapp.com/api/categories`)
        .then(res => {
          let _items;
          Object.values([Object.values(res.data)[1]]).map(items => { 
            _items = items;
          })
          this.setState({
              data: _items.categories
          });
          this.setState({ loading: false})
        })
    }
  
    render() {
      

      const loop = data => data.map(item => {
          if (item.categories && item.categories.length) {
            return(
              <TreeNode key={item.id} title={item.name}>
                 {loop(item.categories)}
              </TreeNode>
            )
          }
          
          return <TreeNode key={item.id} title={item.name} />;
      });
      
        return(
          
            this.state.data.length ? (
              <Tree onSelect={this.onSelect} loading={this.state.loading}>
                {loop(this.state.data)}
              </Tree>
            ) : 
            (
              <div>
                  <Spin /> <div>Loading Categories</div>
              </div>
            ) 
         )
        }  
}

export default Menu;

