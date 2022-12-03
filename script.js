const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// SHOW LOADING

function loading () {

    loader.hidden = false;
    quoteContainer.hidden = true;
}


// HIDE LOADING

function complete () {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


// SHOW NEW QOUTE
// MATH FLOOR ZAOKROŽI ŠTEVILKO BREZ DECIMALK!

function newQuote() {
    loading();

  //PICK A RANDOM QUOTE FROM API QUOTES ARRAY

  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // CHECK IF AUTHOR FIELD IS BLANK AND REPLACE IT WITH "UKNKNOWN"

  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  // CHECK QUOTE LENGTH TO DETERMINE STYLING

  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

//   SET QUOTE, HIDE LOADER

  quoteText.textContent = quote.text;
  complete();
  
}

// GET QUOTES FROM API

async function getQuotes() {
    loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // CATCH ERROR HERE
  }
}

// TWEET QUOTE

function tweetQuote() {
  const twitterUrl = 
  `https://twitter.com/intent/tweet?text=${quoteText.textContent}
    - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// EVENT LISTENERS

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// ON LOAD


getQuotes();



// LOCAL QUOTES NAMESTO APIQUOTES

// function newQuote () {

//     //PICK A RANDOM QUOTE FROM API QUOTES ARRAY

//         const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//         console.log(quote);
//     }

//     newQuote ();
