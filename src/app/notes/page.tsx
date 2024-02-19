import React from "react";
// import  '../../../public/index.css';
// import  '../../../public/jquery.min.js';
// import  '../../../public/new.js';

const Notes = () =>{

    return (
        <div>
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0" />
<script src="../../../public/new.js" defer></script>
  <button id="chatbot-toggler">
    <span id="material-symbols-rounded"
    >Note</span>
    <span id="material-symbols-outlined">close</span>
  </button>
  <div className="chatbot">
    <header>
      <h2>Bloc-notes</h2>
      <span className="close-btn material-symbols-outlined">close</span>
    </header>
    <ul className="chatbox">
      <li className="chat incoming">
        <span className="material-symbols-outlined">search</span>
        <input type="text" placeholder="Rechercher des notes"/>
      </li>
        <div id="notes">
          {/* {% for note in notes %} */}
          {/* {% if note.grossesse == grossesse %}  */}
            <div className="note">
              {/* <h3>{{ note.titre }}</h3> */}
              {/* <p>{{ note.objet }}</p> */}
            </div>
            <div className="d-flex justify-content-between">
              <a href="" className="btn btn-primary">Modifier</a>
              <a href="" className="btn btn-danger">Supprimer</a>
            </div>
            {/* {% endif %} */}
          {/* {%endfor%} */}
        </div>
    </ul>
    <div className="chat-input">
      <form id="noteForm">
        {/* {% csrf_token %} */}
        <div>
          <label for="title">Titre:</label>
          <input type="text" id="note-title"  name="title"/>
        </div>
        
        <textarea placeholder="Prendre des notes..." spellcheck="false" id="note-objet" name="objet" required></textarea>
        
        <button id="send-btn" className="material-symbols-rounded" type="submit">send</button>
    </form>
      </div>
      {/* <!-- <button className="nouvelle-note">Nouvelle note</button> --> */}
  {/* </div> */}

        </div>
        </div>

    );
}

export default Notes;