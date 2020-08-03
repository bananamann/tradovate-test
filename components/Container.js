import React from 'react'
import ColumnSetup from './ColumnSetup'

class Container extends React.Component {
  constructor(props) {
    super(props);
    
    this.availableColumns = [
      { id: "startTime", name: "Start Time" },
      { id: "stopTime", name: "Stop Time" },
      { id: "perPoint", name: "Per Point" },
      { id: "initialMargin", name: "Initial Margin" },
      { id: "changePercent", name: "Change %" },
      { id: "change", name: "Change" },
      { id: "lastVolume", name: "Last Volume" },
      { id: "last", name: "Last" },
      { id: "bid", name: "Bid" },
      { id: "bidSize", name: "Bid Size" },
      { id: "ask", name: "Ask" },
      { id: "askSize", name: "Ask Size" },
      { id: "totalVolume", name: "Total Volume" },
      { id: "high", name: "High" },
      { id: "low", name: "Low" }
    ]

    this.visibleColumns = [
      "startTime",
      "perPoint",
      "askSize"
    ]
  }
  

  render() {
    return (
      <div className='hello-world'>
        <ColumnSetup
          availableColumns={this.availableColumns}
          visibleColumns={this.visibleColumns}
          fixedColumns={2}
        />
      </div>
    )
  }
}

export default Container