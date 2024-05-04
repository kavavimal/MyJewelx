"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const Users = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const response = await axios.get("https://dummyjson.com/users");
    setUsers(response.data.users);
    console.log(response.data.users);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => `${row.firstName} ${row.lastName}`,
    },
    {
      name: "University",
      selector: (row) => row.university,
    },
  ];
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <DataTable data={users} columns={columns} pagination highlightOnHover />
  );
};

export default Users;
