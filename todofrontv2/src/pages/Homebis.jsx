import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import { AuthContext } from "../Contexts/AuthContext";

function Homebis() {
  const { auth, setAuth } = useContext(AuthContext);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (auth?.data?.email) {
      fetchTableData();
    }
  }, [auth?.data?.email]);

  function fetchTableData() {
    const url = `http://localhost:5000/todo/table/${auth.data.email}`;
    const options = {
      headers: {
        Authorization: config.api.authorization,
        "content-type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .get(url, options)
      .then((response) => {
        const todoItems = response.data.data;
        setTableData(todoItems);
      })
      .catch((error) => {
        console.log("Error fetching table data", error);
      });
  }

  let content;
  if (tableData) {
    content = (
      <ul>
        {tableData?.map((item) => (
          <li key={item.id}>{item.title}</li>
        )) ?? null}
      </ul>
    );
  }

  return (
    <div>
      <p>Logged as: {auth?.data?.email ? auth.data.email : "Not logged"}</p>
      {content}
    </div>
  );
}

export default Homebis;
