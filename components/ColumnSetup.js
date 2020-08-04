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
} from 'react-bootstrap'
import ListItem from './ListItem'

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
  margin: `0 0 ${grid}px 0`,

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
      displayFixedColumns: this.props.visibleColumns.slice(0, this.props.fixedColumns),
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
      });
    }
  };

  // getLockedStatus = index => {
  //   if (index > this.state.numFixedColumns - 1) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  render = () => {
    return (
      <Container className={'container'}>
        <Row className={'header header-text-row'}>
          <h3 className={'header-text'}>Configure Data Fields</h3>
        </Row>
        <Row className={'header header-subtext'}>
          <p>Drag & drop between columns to configure visible data.</p>
          <br />
          <br />
        </Row>
        <DragDropContext onDragEnd={this.onDragEnd}>
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
                        locked={true}
                        showListIcon={this.state.showIconVisibleIndex == index}
                        itemText={item}
                      />,
                      index > this.state.numFixedColumns -1 &&
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
                              // locked={this.getLockedStatus(index)}
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
    )
  }
}

export default ColumnSetup