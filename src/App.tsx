import { useState } from "preact/hooks";
import "./App.css";

type Scores = {
  politeness: number;
  reasonable: number;
  efficient: number;
};

function checkPoliteness(_message: string): Scores {
  return { politeness: 5, reasonable: 5, efficient: 5 };
}

function App() {
  const [message, setMessage] = useState("");
  const [scores, setScores] = useState<Scores | null>(null);

  function handleSubmit(e: Event) {
    e.preventDefault();
    if (!message.trim()) return;
    setScores(checkPoliteness(message));
  }

  return (
    <main class="container">
      <h1>Politeness Check</h1>

      <form class="check-form" onSubmit={handleSubmit}>
        <textarea
          id="message-input"
          value={message}
          onInput={(e) => {
            setMessage(e.currentTarget.value);
            setScores(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Enter your message..."
          rows={5}
        />
        <button type="submit">Check</button>
      </form>

      {scores && (
        <div class="scores">
          <div class="score-card">
            <span class="score-label">Politeness</span>
            <span class="score-value">{scores.politeness}/5</span>
          </div>
          <div class="score-card">
            <span class="score-label">Reasonable</span>
            <span class="score-value">{scores.reasonable}/5</span>
          </div>
          <div class="score-card">
            <span class="score-label">Efficient</span>
            <span class="score-value">{scores.efficient}/5</span>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
