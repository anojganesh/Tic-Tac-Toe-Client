import React from "react";
import loadingGif from "../assets/loading-gif (1).gif";
import io from "socket.io-client";
function Home() {
  /*https://cs.torontomu.ca/~a3ganesh/Tic-Tac-Toe-v1/server/src/index.js*/
  /*http://localhost:3001*/
  const server = "https://cs.torontomu.ca/~a3ganesh/Tic-Tac-Toe-v1/server/src/index.js";
  const socket = io(server);
  const verifyGame = async () => {
    let name = "";
    name = document.getElementById("name").value;
    if (
      name === undefined ||
      name.length === 0 ||
      name.length > 10 ||
      name === ""
    ) {
      alert("Invalid Name!");
    } else {
      document.getElementById("loading").style.display = "block";
      document.getElementById("find").disabled = true;
      socket.emit("find", {name : name});
    }
  };

  socket.on("finderror", (e) => {
    alert("Name is already in use. Inactive games will clear in 5-10 minutes.");
    document.getElementById("loading").style.display = 'none';
    document.getElementById("find").disabled = false;
  });

  return (
    <div id = "canvas">
      <div className="row row3">
        <div className="col-md-12">
          <h1 id="enterName">Enter your name: </h1>
          <input
            type="text"
            placeholder="Player1"
            id="name"
            autoComplete="off"
          />
        </div>
      </div>
      <div className="row row4">
        <div className="col-md-12">
          <button
            onClick={(event) => {
              verifyGame();
            }}
            id="find"
          >
            Search for a player
          </button>
          <br />
          <img src={loadingGif} id="loading" alt="loading" />
        </div>
      </div>
    </div>
  );
}
export default Home;
