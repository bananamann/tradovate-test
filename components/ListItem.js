import React from 'react'
import ColumnSetup from './ColumnSetup'
import * as Icon from 'react-bootstrap-icons';

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.clicks = [];
    this.timeout;

    this.state = {
      locked: this.props.locked ? true : false
    }
  }
  
  detectDoubleClick = (event) => {
    event.preventDefault();
    this.clicks.push(new Date().getTime());
    window.clearTimeout(this.timeout);
    this.timeout = window.setTimeout(() => {
        if (this.clicks.length > 1 && this.clicks[this.clicks.length - 1] - this.clicks[this.clicks.length - 2] < 250) {
          this.props.updateFixedColumnsCB()
        }
    }, 350);
  }    


  render = () => {
    return (
        <div
          className={this.props.locked ? 'locked-item' : ''}
        >
            { !this.props.locked &&
              <Icon.List
                onClick={this.detectDoubleClick}
                visibility={this.props.showListIcon ? 'visible' : 'hidden'}
              />
            }
            { this.props.locked &&
              <Icon.LockFill 
                onClick={this.detectDoubleClick}
              />
            }
            {this.props.itemText}
        </div>
    )
  }
}

export default ListItem