const chatBox = document.querySelector(".chat-box");
const form = document.querySelector(".chat-box__form");
const userInput = document.getElementById("userInput");
const btn = document.getElementById("btn");
// Input matches
const matchesForHello = ["hi", "howdy", "hello", "yo", "hey", "sup"];
const responseForHello = [
  "Yo it's Kanye, whats up?",
  "Ayo, Kanye here",
  "Eyyy wassup!!",
  "Hey, your message was good.. but Beyonce has the greatest message of all time!",
  "Hello? How'd you get my number?",
];

const logThis = (message) => {
  return message;
};

const kanyeReplyAPI = () => {
  const KANYE_API = "https://api.kanye.rest/";

  setTimeout(() => {
    axios
      .get(KANYE_API)
      .then((response) => {
        const quote = response.data.quote;
        kanyeReply(quote);
      })
      .catch((err) => console.error("Kanye West API ERROR: ", err));

    const kanyeReply = (reply) => {
      const kanyeReply = logThis(reply);
      const para = document.createElement("p");
      para.innerHTML = kanyeReply;
      chatBox.appendChild(para);
    };
  }, 2000);
};

// Helper functions
const allLowerCase = (string) => {
  const lowerCaseString = string
    .split(" ")
    .map((word) => word.toLowerCase())
    .join(" ");
  return lowerCaseString;
};

const doesItMatch = (messageArray, messageMatches) => {
  const match = messageMatches.filter((element) =>
    messageArray.includes(element)
  );
  console.log(match);
  if (match.length > 0) {
    return true;
  } else {
    return false;
  }
};

// Click Event

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userMsg = logThis(userInput.value);
  //=== DOM STICKING PARA TO PAGE ==========//
  const para = document.createElement("p");
  para.innerHTML = userMsg;
  chatBox.appendChild(para);
  userInput.value = "";
  //=======================================//
  // POST SHOULD BE RENDERED TO PAGE AS IS BEFORE CHANGING TO LOWERCASE

  const lowerCaseString = allLowerCase(userMsg);
  console.log(lowerCaseString);
  const yourMessageArr = lowerCaseString.split(" ");
  console.log(yourMessageArr);

  // Greeting Response
  if (doesItMatch(yourMessageArr, matchesForHello)) {
    setTimeout(() => {
      const para = document.createElement("p");
      para.innerHTML =
        responseForHello[Math.floor(Math.random() * responseForHello.length)];
      chatBox.appendChild(para);
    }, 2000);
  } else {
    // Space

    // Kanyes Response //
    kanyeReplyAPI();
  }

  console.log(userMsg);
});
