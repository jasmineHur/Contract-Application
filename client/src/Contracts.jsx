import React, { useCallback, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "@ag-grid-community/react"; // React Grid Logic
import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme

import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
ModuleRegistry.registerModules([ClientSideRowModelModule]);
// npm i @ag-grid-community/client-side-row-model

const Contacts = () => {
  // Given URL, bring the json data from this URL
  const URL = "https://jsonplaceholder.typicode.com/users";
  // Bring the data using fetch and async
  const onGridReady = useCallback((params) => {
    async function fecthContract() {
      let response = await fetch(URL);
      response = await response.json();
      setContacts(response);
    }
    fecthContract();
  }, []);

  const navigate = useNavigate();
  const gridRef = useRef();

  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [contacts, setContacts] = useState([]);
  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "name" },
    { field: "username" },
    { field: "email" },
    { field: "phone" },
    { field: "website" }
  ]);
  // Column option
  const defaultColDef = {
    flex: 1,
    editable: true,
    filter: true
  };

  // If click the row it goes to the personal detail
  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    return navigate(`/info`, { state: selectedRows[0] });
  }, []);

  // const URL = "http://localhost:3000/api/contacts";
  // const URL = "https://jsonplaceholder.typicode.com";

  return (
    <div>
      <h1>Contacts</h1>
      <div style={gridStyle} className={"ag-theme-quartz"}>
        <AgGridReact
          ref={gridRef}
          rowData={contacts}
          columnDefs={colDefs}
          onGridReady={onGridReady}
          defaultColDef={defaultColDef}
          rowSelection={"single"}
          onSelectionChanged={onSelectionChanged}
        />
      </div>
    </div>
  );
};

export default Contacts;
