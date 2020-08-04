import React from 'react'
import ColumnSetup from './ColumnSetup'
import * as Icon from 'react-bootstrap-icons';

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locked: this.props.locked ? true : false
    }
  }
  

  render() {
    return (
        <div
          className={this.props.locked ? 'locked-item' : ''}
        >
            { !this.props.locked &&
              <Icon.List
                  visibility={this.props.showListIcon ? 'visible' : 'hidden'}
              />
            }
            { this.props.locked &&
              <Icon.LockFill />
            }
            {this.props.itemText}
        </div>
    )
  }
}

export default ListItem