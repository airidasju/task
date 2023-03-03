import './App.scss';
import { useState, useEffect } from 'react';
import Single from './Components/Single';
import TwoPart from './Components/TwoPart';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch('https://v2.jokeapi.dev/joke/Programming?amount=10')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        },
      );
  }, []);

  const [singleLiners, setSingleLiners] = useState(false);
  const [multiLiners, setMultiLiners] = useState(false);
  const [jokeNum, setSingleNum] = useState();

  const singleHandler = () => {
    setSingleLiners(true);
    setMultiLiners(false);
    setSingleNum(
      Math.floor(
        Math.random() *
          items.jokes.filter((joke) => joke.type === 'single').length,
      ),
    );
  };

  const multiHandler = () => {
    setSingleLiners(false);
    setMultiLiners(true);
    setSingleNum(
      Math.floor(
        Math.random() *
          items.jokes.filter((joke) => joke.type === 'twopart').length,
      ),
    );
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className='App-header'>
        <div className='jokes'>
          <button className='jokeBtn' onClick={() => singleHandler()}>
            One Liner joke
          </button>
          <button className='jokeBtn' onClick={() => multiHandler()}>
            Two liner joke
          </button>
        </div>
        <ul>
          {singleLiners
            ? <span className='joke one-liner'>{items.jokes.filter((joke) => joke.type === 'single')[jokeNum].joke}</span>
            : null}
          {multiLiners ? (
            <TwoPart items={items} jokeNum={jokeNum}></TwoPart>
          ) : null}
        </ul>
      </div>
    );
  }
}

export default App;
