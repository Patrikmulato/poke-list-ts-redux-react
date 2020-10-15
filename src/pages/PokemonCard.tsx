import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import LoadingIcon from '../components/LoadingIcon';
import { getOnePokemon } from '../redux/one-pokemon/actions';
import { RootState } from '../redux/store';
import { OnePokemonRequest } from '../type';
import { isCaughtFunc } from '../utils/isCaughtFunc';

const PokemonCard = () => {
  const [isCaught, setIsCaught] = useState(false);
  const dispatch = useDispatch();

  let { id } = useParams<{ id: string }>();

  const pokemon = useSelector<RootState, OnePokemonRequest>(
    (state) => state.onePokemon.OnePokemon
  );
  const loading = useSelector<RootState, boolean>(
    (state) => state.onePokemon.loading
  );

  useEffect(() => {
    dispatch(getOnePokemon(id));
  }, [id, dispatch]);

  useEffect(() => {
    setIsCaught(isCaughtFunc(pokemon.name));
  }, [pokemon.name]);

  const Catch = () => {
    alert(`You caught ${id}`);
    let caughtPokemon = localStorage.getItem('caughtPokemon');

    if (caughtPokemon === null) {
      localStorage.setItem('caughtPokemon', id);
    } else {
      let arrayCaughtPokemon: string[] = [];

      if (caughtPokemon.includes('[')) {
        arrayCaughtPokemon = JSON.parse(caughtPokemon).concat(
          arrayCaughtPokemon
        );
      } else {
        arrayCaughtPokemon.push(caughtPokemon);
      }
      arrayCaughtPokemon.push(id);

      localStorage.setItem('caughtPokemon', JSON.stringify(arrayCaughtPokemon));
    }
    setIsCaught(true);
  };

  const Release = () => {
    let caughtPokemon = localStorage.getItem('caughtPokemon');

    if (caughtPokemon === null) return null;

    if (caughtPokemon.includes('[')) {
      let filtered = JSON.parse(caughtPokemon).filter(
        (c: string) => c !== pokemon.name
      );
      localStorage.setItem('caughtPokemon', JSON.stringify(filtered));
    } else {
      localStorage.clear();
    }
    setIsCaught(false);
  };

  if (loading) return <LoadingIcon />;

  return (
    <>
      <Row>
        <Col>
          <BackButton />
        </Col>
      </Row>
      <Row>
        <Col className='justify-content-md-center'>
          <Card
            className='text-center'
            style={{ width: '25rem', marginLeft: 'auto', marginRight: 'auto' }}
          >
            {isCaught && <Card.Text>Caught</Card.Text>}

            <Card.Img variant='top' src={pokemon.sprites.front_default} />
            <Card.Body>
              <Card.Title>{pokemon.name}</Card.Title>
              <Card.Text>weight: {pokemon.weight}</Card.Text>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Abilities</th>
                  </tr>
                </thead>
                <tbody>
                  {pokemon.abilities
                    .filter((ability) => !ability.is_hidden)
                    .map((ability) => (
                      <tr key={ability.ability.name}>
                        <td>{ability.ability.name}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              {!isCaught ? (
                <Button variant='primary' onClick={Catch}>
                  Catch
                </Button>
              ) : (
                <Button variant='primary' onClick={Release}>
                  Release
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PokemonCard;
