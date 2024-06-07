import React, { useState, useContext, useEffect } from "react";
import Navbar from "./Navbar";
import DataTable from "react-data-table-component";
import { TableContext } from "../Context/TableContextProvider";
import { SettingData } from "./SettingData";

const Discount = () => {
  const { data, setData } = useContext(TableContext);
  useEffect(() => {
    setData(SettingData);
  }, []);
  const columns = [
    {
      name: "S.no",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.Title,
    },
    {
      name: "Value",
      selector: (row) => row.value,
    },
    {
      name: "Updated At",
      selector: (row) => row.updated_at,
    },
    {
      name: "Updated By",
      selector: (row) => row.updated_by,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            className="w-[70px] relative h-[30px] rounded-md bg-blue-600 text-white"
            onClick={() => {
              alert(`you want to edit ${row.id}`);
            }}
          >
            Edit
          </button>
          <button
            className="w-[70px] h-[30px] rounded-md bg-blue-600 text-white"
            onClick={() => deletHandler(row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  
  const deletHandler = (val) =>{
    const confirm = window.confirm("Are you sure you want to delete this row")
    if (confirm) {
      const newData = data.filter((data) =>data.id !== val)
      setData(newData)
    }
  }
  const customStyle ={
    rows:{
      style:{
        backgroundColor:'rgb(31 41 55)',
        color:'white'
      },
    },
    headCells:{
      style:{
        backgroundColor: 'rgb(3 7 18)',
        color:'white'
      }
    },
    cells:{
      style:{
        borderStyle:'solid',
        borderColor:'rgb(107 114 128)',
        borderWidth:'1px'
      }
    },
    pagination:{
      style:{
        backgroundColor: 'rgb(75 85 99)',
        color:'white'
      }
    },
    paginationButton: {
      style: {
        color: 'white', // Text color of pagination buttons
        backgroundColor: 'white', // Background color of pagination buttons
      }
  },
  header:{
    style:{
      backgroundColor: 'rgb(75 85 99)',
      color:'white'
    }
  }
}
  return (
    <div className="w-screen h-screen overflow-x-hidden bg-gray-700">
      <div className="w-full">
        <Navbar />
      </div>
      <div>
        <DataTable
        title="Discount"
          columns={columns}
          data={data}
          // selectableRows
          // selectableRowsHighlight
          highlightOnHover
          pagination
          fixedHeader
          fixedHeaderScrollHeight="400px"
          customStyles={customStyle}
        />
      </div>
    </div>
  );
};

export default Discount;
