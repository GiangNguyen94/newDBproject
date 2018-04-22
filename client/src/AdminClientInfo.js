import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeDataPerson, Logo, Tips } from "./Utils";
import matchSorter from 'match-sorter'


class AdminClientInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeDataPerson()
    };
  }

  

  render() {
    const { data } = this.state;


    return (
      <div>
      <div>
      <button type="button"> Add New Patient </button>
      </div>
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
          filterable
          columns={[
            {
              Header: "Details",
              filterable: false,
              columns: [
                {
                  Header: "PID",
                  accessor: "PID",
                  filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["PID"] }),
                  filterAll: true,
                  width: 50
                  },
                {
                  Header: "Name",
                  accessor: "name",
                  filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["name"] }),
                  filterAll: true,
                  width: 100
                },
                {
                  Header: "Sex",
                  accessor: "gender",
                  id: "sex",
                  //filterMethod: (filter, rows) =>
                  //      matchSorter(rows, filter.value, { keys: ["gender"] }),
                  filterMethod: (filter, row) => {
                    if (filter.value === "all") {
                      return true;
                    }
                    if (filter.value === "true") {
                      return row[filter.id] =="M" ;
                    }
                    if (filter.value ==="false"){
                      return row[filter.id] == "F";
                    }
                  },
                  Filter: ({ filter, onChange }) =>
                    <select
                      onChange={event => onChange(event.target.value)}
                      style={{ width: "100%" }}
                      value={filter ? filter.value : "all"}
                    >
                      <option value="all">Show All</option>
                      <option value="true">Male</option>
                      <option value="false">Female</option>
                    </select>,
                
                  width: 45
                },
                {
                  Header: "Age",
                  accessor: "age",
                  filterMethod: (filter, rows) =>
                       matchSorter(rows, filter.value, { keys: ["age"] }),
                  
                  
                  width: 50
                },
                {
                  Header: "SSN",
                  accessor: "SSN",
                  filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["SSN"] }),
                  filterAll: true,
                  width: 100
                }

              ]
            },
            
            {
              Header: "Room",
              //accessor: "age"
              filterable: false,
              columns:[
                {
                  Header: "RID",
                  accessor: "RID",
                  width: 50
                },
                {
                  Header: "Leave",
                  filterable: false,
                  width: 65,
                  Cell: row => (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "coral",
                        borderRadius: "2px"
                      }}
                    > Leave </div>   )            
                },
                {
                  Header: "Book",
                  //accessor: "age"
                  filterable: false,
                  width: 65,
                  Cell: row => (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "coral",
                        borderRadius: "2px"
                      }}
                    > Book </div>   ) 
                }
              ]

            },
            {
              Header: "Admission",
              filterable: false,
              columns:[
                {
                  Header: "History",
                  //accessor: "age"
                  filterable: false,
                  width: 75,
                  Cell: row => (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "coral",
                        borderRadius: "2px"
                      }}
                    > History </div>   )   
                },
                {
                  Header: "New",
                  //accessor: "age"
                  filterable: false,
                  width: 50,
                  Cell: row => (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "coral",
                        borderRadius: "2px"
                      }}
                    > New </div>   ) 
                }
              ]
            },
            {
              Header: "Report",
              //accessor: "age"
              filterable: false,
              columns:[
                {
                  Header: "History",
                  //accessor: "age"
                  filterable: false,
                  width: 75,
                  Cell: row => (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "coral",
                        borderRadius: "2px"
                      }}
                    > History </div>   ) 
                }
                
              ]
            },
            {
              Header: "Operation",
              //accessor: "age"
              filterable: false,
              
              columns:[
                {
                  Header: "Modify",
                  //accessor: "age"
                  filterable: false,
                  width: 75,
                  Cell: row => (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "coral",
                        borderRadius: "2px"
                      }}
                    > Modify </div>   ) 
                },
                {
                  Header: "Delete",
                  //accessor: "age"
                  filterable: false,
                  width: 75,
                  Cell: row => (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "coral",
                        borderRadius: "2px"
                      }}
                    > Delete </div>   ) 
                }
                
              ]
            }
            
          ]}
          
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
        
      </div>
    );
  }
}

export default AdminClientInfo
