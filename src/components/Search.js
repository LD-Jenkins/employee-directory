import React from "react";

function Search(props) {
  return (
    <div>
      <input type="text" onChange={(e) => props.updateFilter(e.target.value)} value={props.filterStr}></input>
    </div>
  )
}

export default Search;