const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null;
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    // let title = document.querySelector("#note-title")
    if (!userMessage) return;

    // Clear the input textarea and set its height to default
   
    chatInput.style.height = `${inputInitHeight}px`;

    // // Append the user's message to the chatbox
    // chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    // chatbox.scrollTo(0, chatbox.scrollHeight);

    // send an ajax post request to create a new note
    const csrfTokenElement = document.querySelector('input[name="csrfmiddlewaretoken"]');
    // const postForm = new FormData()
    let title = document.getElementById("note-title");
    let objet = document.getElementById("note-objet");
    let formNote = new Object()
    formNote.title=title.value 
    formNote.objet=objet.value
    let formNoteJson = JSON.stringify(formNote)
    fetch('create/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': csrfTokenElement.value
        },
        body: formNoteJson
    })
        // .then(response => response.json())
        .then(data => {
            // Manipulate the received data
            $('.notes').append('<div class="note"><h3>'+formNote.titre+'</h3><p>'+formNote.objet +'</p></div>');
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });
        objet.value = "";
        title.value = ""
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});
let notForm = document.getElementById("noteForm");
notForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log("la valeur de title est"+title.value+" \n celui de objet est "+ objet.value)
    handleChat()
  
  });

// sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));