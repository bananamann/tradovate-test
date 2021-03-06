import * as React from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable
} from 'react-beautiful-dnd'
import {
  Container,
  Row,
  Col,
  Button
} from 'react-bootstrap'
import ListItem from './ListItem'
import * as Icon from 'react-bootstrap-icons';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
* Moves an item from one list to another list.
*/
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  paddingTop: grid,
  paddingBottom: grid,
  paddingLeft: 6,
  margin: 0,

  // change background colour if dragging
  background: isDragging ? '#666' : '',

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? '' : '',
  padding: grid,
  width: 250
});

class ColumnSetup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      availableColumns: this.props.availableColumns,
      visibleColumns: this.props.visibleColumns,
      numFixedColumns: this.props.fixedColumns,
      displayAvailableColumns: this.props.availableColumns.filter((c) => !this.props.visibleColumns.includes(c.id)).map((c) => c.name),
      displayVisibleColumns: this.props.visibleColumns.map((id) => this.props.availableColumns.find((c) => c.id === id).name),
      showIconAvailableIndex: undefined,
      showIconVisibleIndex: undefined
    }
  }

  id2List = {
    droppable: 'displayAvailableColumns',
    droppable2: 'displayVisibleColumns'
  };

  getList = id => this.state[this.id2List[id]];

  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = { items };

      if (source.droppableId === 'droppable') {
        state = { displayAvailableColumns: items };
      }

      if (source.droppableId === 'droppable2') {
        state = { displayVisibleColumns: items };
      }

      this.setState(state);
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      this.setState({
        displayAvailableColumns: result.droppable,
        displayVisibleColumns: result.droppable2
      }, () => {
        this.setState({
          visibleColumns: this.state.displayVisibleColumns.map((v) => this.state.availableColumns.filter((c) => c.name === v)[0].id)
        })
      });
    }
  };

  updateFixedColumns = (index = this.state.numFixedColumns) => {
    if (index < this.state.numFixedColumns) {
      index -= 1;
    }

    this.setState({
      numFixedColumns: index + 1
    });
  }

  handleSave = () => {
    // normally a Fetch API call or something in here to send state data to backend server
    alert(`Visible Columns (ids): ${this.state.visibleColumns} \n\nFixed Columns: ${this.state.numFixedColumns}`)
  }

  handleCancel = () => {
    // normally some code that takes you back where you were
    alert('Canceling changes. Bye bye!');
  }

  render = () => {
    return (
      <>
        <Container className={'main-container'}>
          <Row className={'header header-text-row'}>
            <h3 className={'header-text'}>Configure Data Fields</h3>
            <Icon.X
              onClick={() => alert("Man you guys even checked the useless close button. I'm impressed. \n\nClosing App!")}
              style={{ color: '#666', marginLeft: '65%' }}
              size={30}
            />
          </Row>
          <Row className={'header header-subtext'}>
            <p>Drag & drop between columns to configure visible data.</p>
            <br />
            <br />
          </Row>
          <DragDropContext className={'content-container'} onDragEnd={this.onDragEnd}>
            <Row>
              <Col>
                <p className={'column-header'}>Available</p>
              </Col>
              <Col>
                <p className={'column-header'}>Visible</p>
              </Col>
            </Row>
            <Row className={'list-container'}>
              <Col className={'list available-list'}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {this.state.displayAvailableColumns.map((item, index) => (
                        <Draggable
                          key={item}
                          draggableId={item}
                          index={index}>
                          {(provided, snapshot) => (
                            <div
                              onMouseEnter={() => this.setState({ showIconAvailableIndex: index })}
                              onMouseLeave={() => this.setState({ showIconAvailableIndex: undefined })}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}>
                              <ListItem
                                index={index}
                                showListIcon={this.state.showIconAvailableIndex == index}
                                itemText={item}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Col>
              <Col className={'list visible-list'}>
                <Droppable droppableId="droppable2">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {this.state.displayVisibleColumns.map((item, index) => ([
                        index < this.state.numFixedColumns && 
                        <ListItem
                          updateFixedColumnsCB={() => this.updateFixedColumns(index)}
                          index={index}
                          locked={true}
                          showListIcon={this.state.showIconVisibleIndex == index}
                          itemText={item}
                        />,
                        index > this.state.numFixedColumns - 1 &&
                        <Draggable
                          key={item}
                          draggableId={item}
                          index={index}>
                          {(provided, snapshot) => (
                            <div
                              onMouseEnter={() => this.setState({ showIconVisibleIndex: index })}
                              onMouseLeave={() => this.setState({ showIconVisibleIndex: undefined })}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}>
                              <ListItem
                                updateFixedColumnsCB={() => this.updateFixedColumns(index)}
                                index={index}
                                showListIcon={this.state.showIconVisibleIndex == index}
                                itemText={item}
                              />
                            </div>
                          )}
                        </Draggable>
                      ]))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Col>
            </Row>
          </DragDropContext>
        </Container>
        <Container className={'action-container'}>
          <Row>
            <Button 
              className={'btn-save'}
              onClick={this.handleSave}
            >
              Save
            </Button>
            <Button 
              className={'btn-cancel'}
              onClick={this.handleCancel}
            >
              Cancel
            </Button>
          </Row>
        </Container>
      </>
    )
  }
}

export default ColumnSetup