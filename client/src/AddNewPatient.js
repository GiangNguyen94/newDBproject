import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeOnePerson, makeDataAdmission, Logo, Tips } from "./Utils";
import matchSorter from 'match-sorter';
import AdminClientInfo from './AdminClientInfo';


class AddNewPatient extends React.Component {
  constructor() {
    super();
    this.state = {
      submit: 0,
      //1 is submit, 2 is cancel
      data: 
        [
          
          {att:"Name", content:[]},
          {att:"Gender", content:[]},
          {att:"SSN", content:[]},
          {att:"Age", content:[]},
        
        ]
    };

    this.renderEditable = this.renderEditable.bind(this);
 
  }

  //API
  

  handleChangePageClick(num){
    if (num == 1){
      var sendData = {};
      sendData.pssn = this.state.data[2].content.toString();
      sendData.pname = this.state.data[0].content.toString();
      sendData.gender = this.state.data[1].content.toString();
      sendData.age = parseInt(this.state.data[3].content);
      console.log(sendData);
      var request = new Request("/api/addPatient/",{
        method:"POST",
        mode: "cors",
        body: JSON.stringify(sendData),
        headers: {
          "Content-Type": "application/json"
        }
      });
      fetch(request)
      .then(function(response){
        response.json()
        .then(function(data){
          console.log(data)
        })
      })
    }
    this.setState({submit:num});

  }

  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }



  render() {
    const { data } = this.state;
    let page = [];

    switch(this.state.submit){
      case 0:
        page.push(
          <div>
      
            <ReactTable
              getTdProps={(state, rowInfo, column, instance) => {
                return {
                  onClick: (e, handleOriginal) => {
                    console.log("A Td Element was clicked!");
                    console.log("it produced this event:", e);
                    console.log("It was in this column:", column);
                    console.log("It was in this row:", rowInfo);
                    console.log("It was in this table instance:", instance);

                    // IMPORTANT! React-Table uses onClick internally to trigger
                    // events like expanding SubComponents and pivots.
                    // By default a custom 'onClick' handler will override this functionality.
                    // If you want to fire the original onClick handler, call the
                    // 'handleOriginal' function.
                    if (handleOriginal) {
                      handleOriginal();
                    }
                  }
                };
              }}
              data={data}
              showPagination = {false}
              defaultPageSize = {4}
              columns={[
                
                  
                {
                  Header: "Attribute",
                  accessor: "att",
                  
                },
                {
                  Header: "Content",
                  accessor: "content",
                  Cell: this.renderEditable
                }
                
              ]}
              
              
            />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button type="button" onClick={this.handleChangePageClick.bind(this,1)}> Submit </button> 
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           <button type="button" onClick={this.handleChangePageClick.bind(this,2)}> Cancel </button> 
          </div>

          );
        break;
      case 1:
        page.push(<AdminClientInfo/>);
        break;
      case 2:
        page.push(<AdminClientInfo/>);
        break;
      }
    return (
      <div className="AddNewPatient">
        {page}
      </div>
    );
  }
}

export default AddNewPatient
