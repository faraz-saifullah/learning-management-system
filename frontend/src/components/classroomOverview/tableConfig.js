import React from "react";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Search from "@material-ui/icons/Search";
import SortArrow from "@material-ui/icons/Sort";
import ClearIcon from "@material-ui/icons/Clear";

export function getIcons() {
  return {
    FirstPage: () => <FirstPage />,
    LastPage: () => <LastPage />,
    NextPage: () => <ChevronRight />,
    PreviousPage: () => <ChevronLeft />,
    Search: () => <Search />,
    SortArrow: () => <SortArrow />,
    Clear: () => <ClearIcon />,
  };
}

export function getColumnConfig() {
  return [
    { title: "ID", field: "userId" },
    { title: "Name", field: "name" },
    { title: "Phone", field: "phone" },
    { title: "Enrolled on", field: "dateEnrolled" },
    { title: "Email", field: "email" },
    { title: "City", field: "city" },
    { title: "State", field: "state" },
    { title: "DOB", field: "dateOfBirth" },
  ];
}

export function getRowsList(students) {
  const tableRows = [];
  if (students.length !== 0) {
    for (let i = 0; i < students.length; i++) {
      const object = {
        userId: students[i].user_id,
        name: students[i].name,
        phone: students[i].phone,
        email: students[i].email,
        city: students[i].city,
        state: students[i].state,
        dateOfBirth: students[i].date_of_birth,
        dateEnrolled: students[i].date_enrolled,
      };
      tableRows.push(object);
    }
  }
  return tableRows;
}

export function getTableOptions() {
  return {
    pageSizeOptions: [],
    toolbar: true,
    paging: true,
  };
}
