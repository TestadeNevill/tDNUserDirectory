import React, { Component, Fragment } from "react";
import DataTable from "./DataTable";
import Nav from "./Nav";
import API from "../utils/API";
// import "../styles/DataArea.css";

export default class DataArea extends Component {
  state = {
    users: [],
    filteredUsers: []
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
