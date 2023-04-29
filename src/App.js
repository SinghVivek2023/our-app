import React, { useState } from "react";
import Select from "react-select";
import standard from "./data/standard";
import subjects from "./data/subjects";

export default function App() {
  const [selectedStandard, setSelectedStandard] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const standardOptions = standard.map((std) => {
    return {
      value: std.value,
      label: std.label,
    };
  });

  const subjectOptions = subjects
    .filter((subject) => subject.standardId === selectedStandard?.value)
    .map((subject) => {
      return {
        value: subject.id,
        label: subject.name,
      };
    });

  return (
    <>
      <div style={{ margin: 20, width: 500 }}>
        <Select
          options={standardOptions}
          value={selectedStandard}
          placeholder="Select Standard"
          onChange={setSelectedStandard}
        />
      </div>
      <div style={{ margin: 20, width: 500 }}>
        <Select
          options={subjectOptions}
          value={selectedSubject}
          placeholder="Select Subject"
          onChange={setSelectedSubject}
          isDisabled={!selectedStandard}
        />
      </div>
    </>
  );
}
