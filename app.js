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

const matchesForGoodBye = ["cya", "bye", "adios", "laters", "goodbye"];
const responseForGoodBye = [
  "Peace",
  "Laters..Dont forget to buy my next album!!",
  "Yoo! Dont go! I'm so lonely since Kim left.. ",
];

const matchesForTime = ["time", "time?"];
const responseForTime = [
  `It's my time.. Yeezy Season!! But I'm pretty sure your time is.. ${new Date().toLocaleTimeString()}`,
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
  "A hunch is creativity trying to tell you something",
  "A lifetime friend shall soon be made",
  "A lifetime of happiness lies ahead of you",
  "A new perspective will come with the new year",
  "A pleasant surprise is waiting for you",
  "A short pencil is usually better than a long memory any day",
  "Be careful or you could fall for some tricks today",
  "Because you demand more from yourself, others respect you deeply",
  "Believe in yourself and others will too",
  "Chance favors those in motion",
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
  "burgers",
  "cheeseburger",
  "taco",
  "tacos",
  "salmon",
  "chicken",
  "soup",
  "rice",
  "curry",
  "pizza",
  "pasta",
  "tuna",
  "salad",
  "fish",
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
        const meal =
          response.data.meals[
            Math.floor(Math.random() * response.data.meals.length)
          ];
        const meals = {
          mealData: meal,
          mealName: meal.strMeal,
          mealURL: meal.strSource,
        };
        console.log(meals);
        const reply = `Yo you should try ${meals.mealName}.. here's a link..`;
        kanyeReply(reply, "p");
        kanyeReply(`${meals.mealURL}`, "a");
      })
      .catch((err) => console.error("Meal DB API ERROR: ", err));
    const kanyeReply = (reply, tag) => {
      console.log(reply);
      const kanyeReply = logThis(reply);
      const para = document.createElement(tag);
      console.log(para.nodeName);
      if (para.nodeName === "A") {
        para.setAttribute("href", kanyeReply);
        para.setAttribute("target", "_blank");
      }
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
  const yourMessageArr = lowerCaseString.split(" ");

  // Food API
  if (doesItMatch(yourMessageArr, matchForFood)) {
    const match = matchForFood.filter((element) =>
      yourMessageArr.includes(element)
    );
    console.log(match);
    kanyeFood(match);
    return;
  }

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

  // Time Response
  if (doesItMatch(yourMessageArr, matchesForTime)) {
    kanyeResponse(responseForTime);
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
});

// Change Header
const header = document.querySelector(".header__title");

header.addEventListener("mouseenter", () => {
  header.innerText = "How to interact with Kanye";
});

header.addEventListener("mouseleave", () => {
  header.innerText = "Chat with Kanye";
});
