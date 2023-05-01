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
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const Topics = () => {
  const { chapter } = useParams();
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState("");

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

  return (
    <Box>
      <h1>Topics for {chapter}</h1>
      <Input
        placeholder="New Topic"
        value={newTopic}
        onChange={(e) => setNewTopic(e.target.value)}
      />
      <Button onClick={handleAddTopic}>Add Topic</Button>
      <Table mt={4}>
        <Thead>
          <Tr>
            <Th>Topic Name</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {topics.map((topic, index) => (
            <Tr key={index}>
              <Td>{topic}</Td>
              <Td>
                <Button onClick={() => handleDeleteTopic(index)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Topics;
