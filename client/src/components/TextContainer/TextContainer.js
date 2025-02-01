import React from "react";
import "./TextContainer.css";
import onlineIcon from "../../icons/onlineIcon.png";

function TextContrainer({ onlineUsers}) {
  return (
    <div className="textContainer">
      <div>
        <h1>
          Realtime Chat Application{" "}
          <span role="img" aria-label="emoji">
            💬
          </span>
        </h1>
        <h2>
          Created with React, Express, Node and Socket.IO{" "}
          <span role="img" aria-label="emoji">
            ❤️
          </span>
        </h2>
        <h2>
          Try it out right now!{" "}
          <span role="img" aria-label="emoji">
            ⬅️
          </span>
        </h2>
      </div>
      {onlineUsers ? (
        <div>
          <h1>People currently chatting:</h1>
          <div className="activeContainer">
            <h2>
              {onlineUsers.map(( user ) => (
                <div key={user} className="activeItem">
                  {user}
                  <img alt="Online Icon" src={onlineIcon} />
                </div>
              ))}
            </h2>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default TextContrainer;
