import React, { useState } from "react";
import Select from "react-select";
import standard from "./data/standard";
import subjects from "./data/subjects";

export default function App() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const subjectOptions = subjects.map((subject) => {
    return {
      value: subject.id,
      label: subject.name,
    };
  });
  return (
    <>
      <div style={{ margin: 20, width: 500 }}>
        <Select options={standard} placeholder="select standard" />
      </div>
      <div style={{ margin: 20, width: 500 }}>
        <Select
          options={subjectOptions}
          value={selectedSubject}
          placeholder="Select Subject"
          onChange={setSelectedSubject}
        />
      </div>
    </>
  );
}
