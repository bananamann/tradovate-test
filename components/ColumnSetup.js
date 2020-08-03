import * as React from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable
} from 'react-beautiful-dnd'

class ColumnSetup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      availableColumns: this.props.availableColumns,
      visibleColumns: []
    }
  }

  render() {
    return (
      <div className={'container'}>
        <div className={'header-row'}>
          <h1>Configure Data Fields</h1>
        </div>
        <div className={'list-container'}>
          <div className={'list'}>

          </div>
          <div className={'list'}>
            
          </div>
        </div>
        <div className={'actions-row'}>
          <div className={'btn-save'}>

          </div>
          <div className={'btn-cancel'}>

          </div>
        </div>
      </div> 
      // this.state.availableColumns.map((col) => <li>{col.name}</li>)
    )
  }
}

export default ColumnSetup