import React from 'react'
import ColumnSetup from './ColumnSetup'
import { List } from 'react-bootstrap-icons'

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
  

  render() {
    return (
        <div>
            <List 
                visibility={this.props.showListIcon ? 'visible' : 'hidden'}
            />
            {this.props.itemText}
        </div>
    )
  }
}

export default ListItem