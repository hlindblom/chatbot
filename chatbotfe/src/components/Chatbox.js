import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Chatbox() {
  const [prompt, setPrompt] = useState("");
  const [quesAns, setQuesAns] = useState([]);

  useEffect(() => {
    const chatText = document.getElementById("chat-text");
    chatText.scrollTop = chatText.scrollHeight;
  }, [quesAns]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setQuesAns([...quesAns, { role: "system", message: "loading..." }]);
    setPrompt("");
    // https://chatbotbe.onrender.com/api
    const { data } = await axios.post("/api", {
      prompt: [...quesAns, { role: "user", content: prompt }],
    });
    setQuesAns([
      ...quesAns,
      { role: "user", content: prompt },
      { role: "assistant", content: data.content },
    ]);
  };
  return (
    <div className="card bg-light" style={{ width: "50rem" }}>
      <div className="card-body">
        <h5 className="card-title">Talk to Me 🤖</h5>
        <div className="card-text">
          <div
            id={"chat-text"}
            className="overflow-auto m-3 p-3 rounded bg-dark"
            style={{ height: "25rem" }}
          >
            {quesAns &&
              quesAns.map((text, i) => (
                <p
                  className={
                    text.role === "assistant" ? "text-info" : "text-white"
                  }
                  key={i}
                >
                  {text.role === "assistant" ? "Sir Edward III" : "User"}
                  {": " + text.content}
                </p>
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
