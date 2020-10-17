import React, { MouseEvent } from 'react';
import { Col, Form } from 'react-bootstrap';

interface SearchBarInterface {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => void;
}
const SearchBar: React.FC<SearchBarInterface> = ({
  onChange,
  onClick,
}: SearchBarInterface) => {
  return (
    <Form>
      <Form.Row>
        <Col>
          <Form.Group controlId='pokemonSearch'>
            <Form.Control
              type='text'
              placeholder='SearchBar for pokemon'
              onChange={onChange}
            />
          </Form.Group>
        </Col>
        <Col className='my-2'>
          <Form.Group controlId='caughtCheckbox'>
            <Form.Check
              type='checkbox'
              label='Show only caught pokemon'
              onClick={onClick}
            />
          </Form.Group>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default SearchBar;
