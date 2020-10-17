import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import LoadingIcon from '../../components/LoadingIcon';
import TypeDropdown from '../../components/TypeDropdown';
import { getAllPokeTypes } from '../../redux/poke-types/actions';
import { PokeTypeRequest } from '../../type';
import PokeList from '../../container/PokeList/PokeList';
import { RootState } from '../../redux/store';

const Home = () => {
  const [type, setType] = useState('Choose a pokemon type');
  const dispatch = useDispatch();

  const types = useSelector<RootState, PokeTypeRequest>(
    (state) => state.pokemonTypes.types
  );
  const loading = useSelector<RootState, boolean>(
    (state) => state.pokemonTypes.loading
  );

  // Fetch all poke types
  useEffect(() => {
    dispatch(getAllPokeTypes());
  }, [dispatch]);

  // onload get type from local storage
  useEffect(() => {
    const type = localStorage.getItem('type');
    type && setType(type);
  }, [setType]);

  // add type to local storage
  useEffect(() => {
    localStorage.setItem('type', type);
  }, [type]);

  if (loading) return <LoadingIcon />;
  return (
    <>
      <Row>
        <Col className='justify-content-md-center text-center'>
          <h1>Pokemon catcher</h1>
        </Col>
      </Row>
      <Row>
        <Col className='justify-content-md-center'>
          <TypeDropdown type={type} types={types} setType={setType} />
        </Col>
      </Row>
      {type !== 'Choose a pokemon type' && (
        <Row>
          <Col className='justify-content-md-center'>
            <PokeList type={type} />
          </Col>
        </Row>
      )}
    </>
  );
};

export default Home;
