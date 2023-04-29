import React, { useState } from "react";
import Select from "react-select";
import standard from "./data/standard";
import subjects from "./data/subjects";
import chapters from "./data/chapters";
import topics from "./data/topics";

export default function App() {
  const [selectedStandard, setSelectedStandard] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

  // Filter subjects based on selected standard
  const subjectOptions = subjects
    .filter((subject) => subject.standardId === selectedStandard?.value)
    .map((subject) => ({
      value: subject.id,
      label: subject.name,
      isDisabled: !selectedStandard,
    }));

  // Filter chapters based on selected subject
  const chapterOptions = chapters
    .filter((chapter) => chapter.subjectId === selectedSubject?.value)
    .map((chapter) => ({
      value: chapter.id,
      label: chapter.name,
      isDisabled: !selectedSubject,
    }));

  // Filter topics based on selected chapter
  const topicOptions = topics
    .filter((topic) => topic.chapterId === selectedChapter?.value)
    .map((topic) => ({
      value: topic.id,
      label: topic.name,
      isDisabled: !selectedChapter,
    }));

  return (
    <>
      <div style={{ margin: 20, width: 500 }}>
        <Select
          options={standard}
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
          isDisabled={!selectedStandard}
        />
      </div>
      <div style={{ margin: 20, width: 500 }}>
        <Select
          options={chapterOptions}
          placeholder="Select Chapter"
          value={selectedChapter}
          onChange={setSelectedChapter}
          isDisabled={!selectedSubject}
        />
      </div>
      <div style={{ margin: 20, width: 500 }}>
        <Select
          options={topicOptions}
          placeholder="Select Topic"
          isDisabled={!selectedChapter}
        />
      </div>
    </>
  );
}
