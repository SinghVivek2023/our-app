import React, { useState } from "react";
import Select from "react-select";
import standard from "./data/standard";
import subjects from "./data/subjects";
import chapters from "./data/chapters";

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
    .filter((subject) => {
      return subject.standardId === selectedStandard?.value;
    })
    .map((subject) => {
      return {
        value: subject.id,
        label: subject.name,
        isDisabled: !selectedStandard,
      };
    });
  const chapterOptions = chapters
    .filter((chapter) => {
      return chapter.subjectId === selectedSubject?.value;
    })
    .map((chapter) => {
      return {
        value: chapter.id,
        label: chapter.name,
        isDisabled: !selectedSubject,
      };
    });

  return (
    <>
      <div style={{ margin: 20, width: 500 }}>
        <Select
          options={standardOptions}
          placeholder="Select Standard"
          value={selectedStandard}
          onChange={setSelectedStandard}
        />
      </div>
      <div style={{ margin: 20, width: 500 }}>
        <Select
          options={subjectOptions}
          placeholder="Select Subject"
          value={selectedSubject}
          onChange={setSelectedSubject}
        />
      </div>
      <div style={{ margin: 20, width: 500 }}>
        <Select options={chapterOptions} placeholder="Select Chapter" />
      </div>
    </>
  );
}
