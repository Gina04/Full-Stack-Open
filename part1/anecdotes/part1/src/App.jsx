import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return <button onClick={onClick} style={{
    border: '2px solid #007BFF', 
    borderRadius: '5px',         
    padding: '10px 15px',        
    backgroundColor: '#ffffff',  
    cursor: 'pointer',          
  }}>{text}</button>;
};

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
 // Estado para manejar el índice de la anécdota actual
  const [selected, setSelected] = useState(0)
  // Estado para manejar los votos de las anécdotas
  const[votes, setVotes]= useState(Array(anecdotes.length).fill(0))


  const showRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  // Función para votar por la anécdota actual
const handleVote = () =>{
  const copy = [...votes];
  copy[selected] +=1; // Incrementa el voto de la anécdota actual
  setVotes(copy);
  
}

// Encontra el índice de la anécdota con más votos

const mostVotedIndex = votes.indexOf(Math.max(...votes));
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}

      <div style={{ marginTop: '20px' }}>
      <Button onClick={showRandomAnecdote}text = 'next anecdote'/>
      <Button onClick={handleVote}text = 'vote'/>
      </div>
      
      <h2>Anecdote with most votes</h2>
      {votes[mostVotedIndex] > 0 ?(
        <>
          <p>{anecdotes[mostVotedIndex]}</p>
          <p>has {votes[mostVotedIndex]} votes.</p>
        
        </>
      ): (
        <p>No votes yet.</p>
      )}
  </div>
  )
}

export default App
