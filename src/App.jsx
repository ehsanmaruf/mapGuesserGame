import React, { useEffect, useState } from 'react';
import haversine from 'haversine';
import cities from './data/cities.json';
import MapComponent from './components/MapComponent';

const style = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const App = () => {
  const [score, setScore] = useState(1500);
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const currentCity = cities.cities[currentCityIndex];

 /**
 * Handles the selection of a city on the map.
 * This function calculates the distance between the selected position and the
 * current city's position, updates the score based on this distance, and checks
 * if the game is over. If the score is still positive, it updates the message
   to indicate whether the guess was correct or the distance to the target city.
 * It also progresses to the next city or ends the game if all cities have been found.
 */
  const handleCitySelect = (position) => {
    const start = {
      latitude: position.lat,
      longitude: position.lng,
    };

    const end = {
      latitude: currentCity.position.lat,
      longitude: currentCity.position.lng,
    };

    //calculating the distance using haversine method and newScroe!
    const distance = haversine(start, end);
    const newScore = score - distance;

    if (newScore <= 0) {
      setGameOver(true);
      setMessage('Game Over!');
    } else {
      setScore(newScore);
      const isCorrect = distance <= 50;
      setMessage(isCorrect ? 'Correct!' : `Distance: ${Math.round(distance)} km`);

      if (currentCityIndex < cities.cities.length - 1) {
        setCurrentCityIndex(currentCityIndex + 1);
      } else {
        setGameOver(true);
        setMessage('You found all cities!');
      }
    }
  };

  return (
    <div>
      <h1 style={style.container}>City Finder</h1>
      <h2 style={style.container}>Score: {Math.round(score)}</h2>
      {gameOver ? (
        <h3>{message}</h3>
      ) : (
        <div>
          <h3 style={style.container}>Find: {currentCity?.name}</h3>
          <MapComponent onCitySelect={handleCitySelect} />
          <h3 style={style.container}>{message}</h3>
        </div>
      )}
    </div>
  );
};

export default App;
