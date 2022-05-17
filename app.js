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
  "Hey, hope you're good.. that was a nice greeting.. but Beyonce has the greatest message of all time!",
  "Hello? How'd you get my number?",
  "Yo.. any idea where Kim's at? I miss her..",
];

const matchesForGoodBye = ["cya", "bye"];
const responseForGoodBye = [
  "Peace",
  "Laters..Dont forget to buy my next album!!",
  "Yoo! Dont go! I'm so lonely since Kim left.. ",
];

const matchForFortune = ["fortune", "fortune?"];
const responseForFortune = [
  "A beautiful, smart, and loving person will be coming into your life",
  "A dubious friend may be an enemy in camouflage",
  "A faithful friend is a strong defense",
  "A feather in the hand is better than a bird in the air",
  "A fresh start will put you on your way",
  "A friend asks only for your time not your money",
  "A friend is a present you give yourself",
  "Kim is not your wife, shes mine!",
  "A gambler not only will lose what he has, but also will lose what he doesn't have",
  "A golden egg of opportunity falls into your lap this month",
  "A good friendship is often more important than a passionate romance",
  "A good time to finish up old tasks",
];

const matchForAge = ["old", "age", "born", "born?", "age?", "old?"];
const responseForAge = [
  "I just dont care maaaannnn.. But let me tell you, I was born on June 8, 1977.. in Atlanta, GA",
];

const matchForBirthday = ["birthday", "birthday?"];
const responseForBirthday = ["Yeah.. birthdays.. mines June 8, 1977.. "];

const matchForKim = ["kim", "kardashian", "kim?", "kardashian?"];
const responseForKim = [
  "Yo get my wifes name out your mouth!!",
  "I dont speak about her anymore",
  "Let's change the subject.. 😒",
];

const matchForFood = [
  "burger",
  "cheeseburger",
  "taco",
  "tacos",
  "salmon",
  "chicken",
  "vegetables",
  "soup",
  "rice",
  "chinese",
  "curry",
  "pizza",
];

// Response Functions

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
      para.classList.add("chat-box__kanye-text");
      chatBox.appendChild(para);
    };
  }, 2000);
};

const kanyeFood = (foodItem) => {
  const MEALDB_API = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodItem}`;
  setTimeout(() => {
    axios
      .get(MEALDB_API)
      .then((response) => {
        const meals = {
          mealData: response.data.meals,
          mealName: response.data.meals[0].strMeal,
          mealURL: response.data.meals[0].strSource,
        };
        console.log(meals);
        const reply = `Yo you should try ${meals.mealName}.. Heres a link ${meals.mealURL}`;
        kanyeReply(reply);
      })
      .catch((err) => console.error("Meal DB API ERROR: ", err));

    const kanyeReply = (reply) => {
      console.log(reply);
      const kanyeReply = logThis(reply);
      const para = document.createElement("p");
      para.innerHTML = kanyeReply;
      para.classList.add("chat-box__kanye-text");
      chatBox.appendChild(para);
    };
  }, 2000);
};

const kanyeResponse = (responseArray) => {
  setTimeout(() => {
    const para = document.createElement("p");
    para.innerHTML =
      responseArray[Math.floor(Math.random() * responseArray.length)];
    para.classList.add("chat-box__kanye-text");
    chatBox.appendChild(para);
  }, 2000);
};

// Helper functions
const logThis = (message) => {
  return message;
};

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
  para.classList.add("chat-box__user-text");
  para.innerHTML = userMsg;
  chatBox.appendChild(para);
  userInput.value = "";
  //=======================================//
  // POST SHOULD BE RENDERED TO PAGE AS IS BEFORE CHANGING TO LOWERCASE

  const lowerCaseString = allLowerCase(userMsg);
  console.log(lowerCaseString);
  const yourMessageArr = lowerCaseString.split(" ");
  console.log(yourMessageArr);

  // if ((yourMessageArr, matchForFood)) {
  //   kanyeFood(yourMessageArr);
  // }

  // Kim Response
  if (doesItMatch(yourMessageArr, matchForKim)) {
    kanyeResponse(responseForKim);
    return;
  }

  // Birthday Response
  if (doesItMatch(yourMessageArr, matchForBirthday)) {
    kanyeResponse(responseForBirthday);
    return;
  }

  // Age Response
  if (doesItMatch(yourMessageArr, matchForAge)) {
    kanyeResponse(responseForAge);
    return;
  }

  // Fortune Response
  if (doesItMatch(yourMessageArr, matchForFortune)) {
    kanyeResponse(responseForFortune);
    return;
  }

  // Leaving Response
  if (doesItMatch(yourMessageArr, matchesForGoodBye)) {
    kanyeResponse(responseForGoodBye);
    return;
  }
  // Greeting Response
  if (doesItMatch(yourMessageArr, matchesForHello)) {
    kanyeResponse(responseForHello);
  } else {
    kanyeReplyAPI();
  }

  // if ((yourMessageArr, matchForFood)) {
  //   kanyeFood(yourMessageArr);
  // } else {
  //   kanyeReplyAPI();
  // }

  console.log(userMsg);
});
