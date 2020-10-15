import React, { Dispatch, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { PokeTypeRequest } from '../type';

interface DropdownInterface {
  setType: Dispatch<React.SetStateAction<string>>;
  types: PokeTypeRequest;
  type: string;
}

const Dropdown: React.FC<DropdownInterface> = ({
  setType,
  types,
  type,
}: DropdownInterface) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setType(e.target.value);
  };

  return (
    <Form>
      <Form.Group controlId='typeSelector'>
        <Form.Control
          as='select'
          defaultValue={type}
          size='lg'
          onChange={onChange}
        >
          <option>Choose a pokemon type</option>
          {types?.results.map((type) => (
            <option key={type.name}>{type.name}</option>
          ))}
        </Form.Control>
      </Form.Group>
    </Form>
  );
};

export default Dropdown;
