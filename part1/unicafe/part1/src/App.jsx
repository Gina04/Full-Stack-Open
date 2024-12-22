import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

/*const Statistics = ({ good, neutral, bad, total }) => {
  const average = total === 0 ? 0 : total / 3;
  const positivePercentage = total === 0 ? 0 : (good/total) * 100;
  return (
    <>
      <h2>Statics</h2>
         <p>Good: {good}</p>
         <p>Neutral:{neutral}</p>
         <p>Bad: {bad}</p>
         <p>All Click {total}</p>
         <p>Average: {average.toFixed(2)}</p>
         <p>Positive Feedback: {positivePercentage.toFixed(2)} %</p>
    
    </>
  );
};*/

/*const StatisticsFeedback = ({ good, neutral, bad, total }) => {
  if (total == 0) {
    return(<div>No feedback given</div>);
  }
  return (
    <div>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  );
};*/

const Statistics = (props) => {
  const average = props.all === 0 ? 0 : props.all / 3;
  const positivePercentage =
    props.all === 0 ? 0 : (props.good / props.all) * 100;

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="All" value={props.all} />
          <StatisticLine text="Average" value={average} />
          <StatisticLine
            text="Positive Percentage"
            value={positivePercentage}
          />
        </tbody>
      </table>
    </div>
  );
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};
function App() {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState([]);

  const handleGoodClick = () => {
    const updatedGood = good + 1; // Calcula el nuevo valor
    setGood(updatedGood);
    setAll(updatedGood + neutral + bad); // Usa el valor actualizado
  };

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    setAll(good + updatedNeutral + bad);
  };

  const handleBadClick = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    setAll(good + neutral + updatedBad);
  };

  return (
    <div>
      <h1>Give Feedback</h1>

      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <Button onClick={handleGoodClick} text="good" />

      <h2>Statistics</h2>

      {all == 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statistics good={good} neutral={neutral} bad={bad} all={all} />
      )}
    </div>
  );
}

export default App;
