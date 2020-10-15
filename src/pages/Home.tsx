import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import LoadingIcon from '../components/LoadingIcon';
import Dropdown from '../components/Dropdown';
import { getAllPokeTypes } from '../redux/poke-types/actions';
import { PokeTypeRequest } from '../type';
import PokeList from '../components/PokeList';
import { RootState } from '../redux/store';

const Home = () => {
  const [type, setType] = useState('Choose a pokemon type');
  const dispatch = useDispatch();

  const types = useSelector<RootState, PokeTypeRequest>(
    (state) => state.pokemonTypes.types
  );
  const loading = useSelector<RootState, boolean>(
    (state) => state.pokemonTypes.loading
  );

  useEffect(() => {
    dispatch(getAllPokeTypes());
  }, [dispatch]);

  React.useEffect(() => {
    const type = localStorage.getItem('type');
    console.log(type);
    type && setType(type);
  }, [setType]);

  useEffect(() => {
    localStorage.setItem('type', type);
  }, [type]);

  if (loading) {
    return <LoadingIcon />;
  }
  return (
    <>
      <Row>
        <Col className='justify-content-md-center'>
          <Dropdown type={type} types={types} setType={setType} />
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
