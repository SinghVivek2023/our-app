import React, { useState } from "react";
import Select from "react-select";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
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

  const StandardSelect = ({ value, onChange }) => (
    <FormControl p={4}>
      <FormLabel fontSize="xl" fontWeight="bold">
        Select standards
      </FormLabel>
      <Select
        value={{ label: value, value }}
        options={standards.map((standard) => ({
          label: standard,
          value: standard,
        }))}
        onChange={(selectedOption) => onChange(selectedOption.value)}
        placeholder="Select Standards"
        size="lg"
      />
    </FormControl>
  );

  const SubjectSelect = ({ value, onChange }) => (
    <FormControl p={4}>
      <FormLabel fontSize="xl" fontWeight="bold">
        Select subjects
      </FormLabel>
      <Select
        value={{ label: value, value }}
        options={subjects[selectedStandard].map((subject) => ({
          label: subject,
          value: subject,
        }))}
        onChange={(selectedOption) => onChange(selectedOption.value)}
        placeholder="Select Subjects"
        size="lg"
      />
    </FormControl>
  );

  const ChapterTable = () => (
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
  );
  const steps = [
    {
      id: "0",
      message: "Hey!",

      // This calls the next id
      // i.e. id 1 in this case
      trigger: "1",
    },
    {
      id: "1",

      // This message appears in
      // the bot chat bubble
      message: "Please, write your Username",
      trigger: "2",
    },
    {
      id: "2",

      // Here we want the user
      // to enter input
      user: true,
      trigger: "3",
    },
    {
      id: "3",
      message: " hi {previousValue}, how can I help you?",
      trigger: 4,
    },
    {
      id: "4",
      options: [
        // When we need to show a number of
        // options to choose we create alist
        // like this
        { value: 1, label: "View Courses" },
        { value: 2, label: "Read Articles" },
      ],
      end: true,
    },
  ];

  // Creating our own theme
  const theme = {
    background: "#C9FF8F",
    headerBgColor: "#144696",
    headerFontSize: "20px",
    botBubbleColor: "#0F3789",
    headerFontColor: "white",
    botFontColor: "white",
    userBubbleColor: "#FF5733",
    userFontColor: "white",
  };

  // Set some properties of the bot
  const config = {
    botAvatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDQaEXf51KtdMsOqYzUUQ7gVjQrNs7X2NI8g&usqp=CAU",
    floating: true,
  };

  return (
    <Box>
      <StandardSelect value={selectedStandard} onChange={setSelectedStandard} />
      {selectedStandard && (
        <SubjectSelect value={selectedSubject} onChange={setSelectedSubject} />
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
          <ChapterTable />
        </Box>
      )}
      <Routes>
        <Route path="/topics/:chapter" element={<Topics />} />
      </Routes>
      <div className="App">
        <ThemeProvider theme={theme}>
          <ChatBot
            // This appears as the header
            // text for the chat bot
            headerTitle="Syllabus Management"
            steps={steps}
            {...config}
          />
        </ThemeProvider>
      </div>
    </Box>
  );
};

export default App;
