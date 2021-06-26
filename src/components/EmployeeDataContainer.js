import React, { Component } from "react";
import Table from "./Table";
import Search from "./Search";
import API from "../utils/API";

class EmployeeDataContainer extends Component {
  state = {
    filterStr: "",
    allEmpData: [],
    filteredEmpData: [],
    sortKey: "last",
    sortDir: "D",
  };

  componentDidMount() {
    API.search()
      .then(res => {
        // console.log(res.data.empdata);
        this.setState({
          allEmpData: res.data.results,
          filteredEmpData: res.data.results.sort((empA, empB) => empA.name[this.state.sortKey].localeCompare(empB.name[this.state.sortKey])),
        });
      })
      .catch(err => console.log(err));
  }

  sortList = (sortKey) => {
    if (sortKey === this.state.sortKey) {
      const mod = this.state.sortDir === "A" ? 1 : -1;
      this.setState({
        filteredEmpData: this.state.filteredEmpData.sort((empA, empB) => (empA.name[sortKey].localeCompare(empB.name[sortKey]) * mod)),
        sortDir: this.state.sortDir === "A" ? "D" : "A",
      });
    } else {
      this.setState({
        sortKey,
        filteredEmpData: this.state.filteredEmpData.sort((empA, empB) => empA.name[sortKey].localeCompare(empB.name[sortKey])),
        sortDir: "D",
      })
    }
  }

  updateFilter = (filterStr) => {
    const mod = this.state.sortDir === "A" ? 1 : -1;
    const lowerFilterStr = filterStr.toLowerCase();
    this.setState({
      filterStr: lowerFilterStr,
      filteredEmpData: this.state.allEmpData.filter(emp => {
        return emp.name.first.toLowerCase().includes(lowerFilterStr) ||
          emp.name.last.toLowerCase().includes(lowerFilterStr) ||
          emp.phone.toLowerCase().includes(lowerFilterStr) ||
          emp.email.toLowerCase().includes(lowerFilterStr);
      }).sort((empA, empB) => (empA.name[this.state.sortKey].localeCompare(empB.name[this.state.sortKey]) * mod))
    })
  }

  render() {
    const { filteredEmpData, sortKey, sortDir, filterStr } = this.state;
    return (
      <div>
        <div style={{display: "flex", marginTop: "6px", marginBottom: "6px"}}>
          <div style={{marginRight: "6px"}}>Filter: </div>
          <Search filterStr={filterStr} updateFilter={this.updateFilter} />
        </div>
        <Table filteredEmpData={filteredEmpData} sortList={this.sortList} sortKey={sortKey} sortDir={sortDir} />
      </div>
    );
  }
}

export default EmployeeDataContainer;
