import React, { useState } from "react";
import Select from "react-select";
import {
  Box,
  FormControl,
  FormLabel,
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { Link, Route, Routes } from "react-router-dom";
import standards from "./data/standard";
import subjects from "./data/subjects";
import initialChapters from "./data/chapters";
import topics from "./data/topics";
import Topics from "./Topics";

const App = () => {
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [chapters, setChapters] = useState(initialChapters);
  const [newChapter, setNewChapter] = useState("");

  const handleAddChapter = () => {
    if (newChapter !== "") {
      setChapters({
        ...chapters,
        [selectedSubject]: [...chapters[selectedSubject], newChapter],
      });
      setNewChapter("");
    }
  };

  const handleDeleteChapter = (chapter) => {
    const updatedChapters = chapters[selectedSubject].filter(
      (c) => c !== chapter
    );
    setChapters({
      ...chapters,
      [selectedSubject]: updatedChapters,
    });
  };

  return (
    <Box>
      <FormControl p={4}>
        <FormLabel fontSize="xl" fontWeight="bold">
          Select Standards
        </FormLabel>
        <Select
          value={{ label: selectedStandard, value: selectedStandard }}
          options={standards.map((standard) => ({
            label: standard,
            value: standard,
          }))}
          onChange={(selectedOption) =>
            setSelectedStandard(selectedOption.value)
          }
          placeholder="Select Standards"
          size="lg"
        />
      </FormControl>
      {selectedStandard && (
        <FormControl p={4}>
          <FormLabel fontSize="xl" fontWeight="bold">
            Select Subjects
          </FormLabel>
          <Select
            value={{ label: selectedSubject, value: selectedSubject }}
            options={subjects[selectedStandard].map((subject) => ({
              label: subject,
              value: subject,
            }))}
            onChange={(selectedOption) =>
              setSelectedSubject(selectedOption.value)
            }
            placeholder="Select Subjects"
            size="lg"
          />
        </FormControl>
      )}
      {selectedSubject && (
        <Box mt={4}>
          <Input
            placeholder="New Chapter"
            value={newChapter}
            onChange={(e) => setNewChapter(e.target.value)}
            size="lg"
            mr={4}
          />
          <Button onClick={handleAddChapter} colorScheme="blue" size="lg">
            Add Chapter
          </Button>
          <Table variant="simple" mt={4}>
            <Thead>
              <Tr>
                <Th>Chapter Name</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {chapters[selectedSubject].map((chapter) => (
                <Tr key={chapter}>
                  <Td>{chapter}</Td>
                  <Td>
                    <Button
                      onClick={() => handleDeleteChapter(chapter)}
                      colorScheme="red"
                      mr={2}
                    >
                      Delete
                    </Button>
                    <Link
                      to={`/topics/${chapter}`}
                      state={{ topics: topics[chapter] }}
                    >
                      Go For Topics
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
      <Routes>
        <Route path="/topics/:chapter" element={<Topics />} />
      </Routes>
    </Box>
  );
};

export default App;
