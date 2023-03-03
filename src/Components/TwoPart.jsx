function TwoPart({ items, jokeNum }) {
  const twopart = items.jokes.filter((joke) => joke.type === 'twopart');

  return (
    <div className='joke two-liner'>
      <span>{twopart[jokeNum].setup}</span>
      <span>{twopart[jokeNum].delivery}</span>
    </div>
  );
}

export default TwoPart;
