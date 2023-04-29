import React from "react";
import Select from "react-select";
import standard from "./data/standard";

export default function App() {
  return (
    <div style={{ margin: 20, width: 500 }}>
      <Select options={standard} placeholder="select standard" />
    </div>
  );
}
