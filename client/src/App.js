import React, { useState } from "react";
import "./App.css";
import FormText from "./Components/FormText";
import ResultCard from "./Components/ResultCard";

function App() {
  const [matches, setMatches] = useState([]);

  return (
    <div className="App">
      <FormText callback={matches => setMatches(matches)} />

      {matches.map((m, index) => (
        <ResultCard key={index} result={m} />
      ))}

      <footer>Made by Quang Son with ❤</footer>
    </div>
  );
}

export default App;
