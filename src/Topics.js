import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import topicsData from "./data/topics";

const Topics = ({ location }) => {
  const { chapter } = useParams();
  const [topics, setTopics] = useState(topicsData[chapter] || []);
  const [newTopic, setNewTopic] = useState("");
  const [topicFilter, setTopicFilter] = useState("");

  const handleAddTopic = () => {
    if (newTopic !== "") {
      setTopics([...topics, newTopic]);
      setNewTopic("");
    }
  };

  const handleDeleteTopic = (index) => {
    const updatedTopics = [...topics];
    updatedTopics.splice(index, 1);
    setTopics(updatedTopics);
  };

  const handleFilterChange = (e) => {
    setTopicFilter(e.target.value);
  };

  const filteredTopics = topics.filter((topic) =>
    topic.toLowerCase().includes(topicFilter.toLowerCase())
  );

  return (
    <Box>
      <h1
        style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}
      >
        Topics for {chapter}
      </h1>
      <Input
        placeholder="New Topic"
        value={newTopic}
        onChange={(e) => setNewTopic(e.target.value)}
        size="lg"
        marginBottom="1rem"
      />
      <Button
        onClick={handleAddTopic}
        colorScheme="blue"
        size="lg"
        marginBottom="1rem"
      >
        Add Topic
      </Button>
      <Select
        value={topicFilter}
        onChange={handleFilterChange}
        size="lg"
        marginBottom="1rem"
      >
        <option value="" disabled>
          All Topics
        </option>
        {topics.map((topic, index) => (
          <option key={index} value={topic}>
            {topic}
          </option>
        ))}
      </Select>
      <Table variant="simple" marginTop="2rem">
        <Thead>
          <Tr>
            <Th>Topic Name</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredTopics.map((topic, index) => (
            <Tr key={index}>
              <Td>{topic}</Td>
              <Td>
                <Button
                  onClick={() => handleDeleteTopic(index)}
                  colorScheme="red"
                  size="sm"
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Topics;
