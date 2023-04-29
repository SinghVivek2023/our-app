import React from "react";
import Select from "react-select";
import { useParams } from "react-router-dom";
import topics from "./data/topics";

export default function Topics() {
  const { id } = useParams();

  // Filter topics based on selected chapter
  const topicOptions = topics
    .filter((topic) => topic.chapterId === Number(id))
    .map((topic) => ({
      value: topic.id,
      label: topic.name,
    }));

  return (
    <div style={{ margin: 20, width: 500 }}>
      <Select options={topicOptions} placeholder="Select Topic" />
    </div>
  );
}
