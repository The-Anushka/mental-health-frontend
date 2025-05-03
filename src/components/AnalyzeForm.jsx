import React, { useState } from "react";
import "./AnalyzeForm.css"; // optional for styling

const AnalyzeForm = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    try {
      const response = await fetch("https://mental-health-backend-h40i.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to analyze text.");
    }
  };

  return (
    <div className="analyze-form">
      <h2>Mental Health Text Analyzer</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your thoughts..."
        rows={6}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <button onClick={handleAnalyze}>Analyze</button>

      {result && (
        <div className="results" style={{ marginTop: "20px" }}>
          <h3>Results:</h3>
          <p><strong>Sentiment:</strong> {result.sentiment}</p>
          <p><strong>Emotions:</strong> {JSON.stringify(result.emotions)}</p>
          <p><strong>Distress Score:</strong> {result.distress_score}</p>
        </div>
      )}
    </div>
  );
};

export default AnalyzeForm;
