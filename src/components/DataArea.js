import React, { Component, Fragment } from "react";
import DataTable from "./DataTable";
import Nav from "./Nav";
import API from "../utils/API";
// import "../styles/DataArea.css";

export default class DataArea extends Component {
  state = {
    users: [],
    filteredUsers: [],
    sortUsers: "ascend"
  };

  headings = [
    { name: "Image", width: "10%" },
    { name: "Name", width: "10%" },
    { name: "Phone", width: "20%" },
    { name: "Email", width: "20%" },
    { name: "DOB", width: "10%" }
  ]

  handleSearchChange = event => {
    const searched = event.target.value;
    const filtered = this.state.users.filter((term) => {

      let matched = Object.values(term).join("").toLowerCase();
      return matched.indexOf(searched.toLowerCase()) !== -1;


    })
    this.setState({
      filteredUsers: filtered,
    })
  };

  handleSortChange = heading => {
    if (this.state.sortUsers === "ascend") {
      this.setState({
        sortUsers: "descend",
      })

    }
    else {
      this.setState({
        sortUsers: "acsend",
      })
    }
    const CompareSort = (value1, value2) => {
      if (this.state.sortUsers === "ascend") {
        if (heading === "name") {
          return value1[heading].first.localCompare(value2[heading].first);
        } else {
          return value1[heading] - value2[heading]
        }
      }
      else {
        if (heading === "name") {
          return value2[heading].first.localCompare(value1[heading].first);
        } else {
          return value2[heading] - value1[heading]
        }
      }
    }
    const sortedValue = this.state.filteredUsers.sort(CompareSort);
    this.setState({
      filteredUsers: sortedValue
    })
  }

  componentDidMount() {
    API.allUsers().then((value) => {
      console.log(value);
      // expected output: "Success!"
      this.setState({
        users: value.data.results,
        filteredUsers: value.data.results,
      })

    });
  }
  render() {
    return (
      <Fragment>
        <Nav handleSearchChange={this.handleSearchChange} />
        <div className="data-area">
          <DataTable
            headings={this.headings}
            users={this.state.filteredUsers}
          />
        </div>
      </Fragment>
    );
  }
}
