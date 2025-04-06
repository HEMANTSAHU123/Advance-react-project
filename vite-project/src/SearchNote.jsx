import React, { useState, useContext } from "react";
import notecontext from "./store/Context";
import { Form, FormControl, InputGroup, ListGroup, Button } from 'react-bootstrap';

const SearchNote = () => {
  const context = useContext(notecontext);
  const [search, setSearch] = useState("");
  const [update, setUpdate] = useState(context.userList);

  const searchhandle = (event) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);
    const filterlist = context.searchNote(searchTerm);
    setUpdate(filterlist);
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="searchForm">
          <Form.Label>Search Notes:</Form.Label>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Enter note title or description"
              value={search}
              onChange={searchhandle}
            />
          </InputGroup>
        </Form.Group>
      </Form>

      <div className="mt-2">
        <h4>Total Notes: {context.total}</h4>
        <h4>Showing: {context.showing}</h4>
      </div>

      <ListGroup className="mt-3">
        {update.map((note) => (
          <ListGroup.Item
            key={note.id}
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              <h5>{note.name}</h5>
              <p className="mb-0">{note.desc}</p>
            </div>
            <Button variant="danger" size="sm" onClick={() => context.deleteNote(note.id)}>
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default SearchNote;