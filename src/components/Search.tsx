import React from 'react';
import { Form } from 'react-bootstrap';

interface SearchInterface {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchInterface> = ({ onChange }: SearchInterface) => {
  return (
    <Form>
      <Form.Group controlId='formBasicEmail'>
        <Form.Control
          type='email'
          placeholder='Search for pokemon'
          onChange={onChange}
        />
      </Form.Group>
    </Form>
  );
};

export default Search;
