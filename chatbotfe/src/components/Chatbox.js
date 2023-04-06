import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Chatbox() {
  const [prompt, setPrompt] = useState("");
  const [quesAns, setQuesAns] = useState([
    { role: "user", message: "Hello World" },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setQuesAns([...quesAns, { role: "system", message: "loading..." }]);
    setPrompt("");
    const { data } = await axios.post("/api", { prompt });
    setQuesAns([
      ...quesAns,
      { role: "User", message: prompt },
      { role: "Bot", message: data.content },
    ]);
  };
  return (
    <div className="card bg-light" style={{ width: "25rem" }}>
      <div className="card-body">
        <h5 className="card-title">Talk to Me 🤖</h5>
        <div className="card-text">
          <div>
            {quesAns &&
              quesAns.map((text, i) => (
                <p key={i}>{text.role + ": " + text.message}</p>
              ))}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-group mt-5">
              <span className="input-group-text">Prompt: </span>
              <textarea
                className="form-control"
                aria-label="With textarea"
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
              ></textarea>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <button type="submit" className="btn btn-primary ps-4 pe-4">
                Ask
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}