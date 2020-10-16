import React, { MouseEvent } from 'react';
import { Col, Form } from 'react-bootstrap';

interface SearchInterface {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => void;
}
const Search: React.FC<SearchInterface> = ({
  onChange,
  onClick,
}: SearchInterface) => {
  return (
    <Form>
      <Form.Row>
        <Col>
          <Form.Group controlId='formBasicEmail'>
            <Form.Control
              type='email'
              placeholder='Search for pokemon'
              onChange={onChange}
            />
          </Form.Group>
        </Col>
        <Col className='my-2'>
          <Form.Group controlId='formBasicCheckbox'>
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

export default Search;
