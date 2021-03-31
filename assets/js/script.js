const getDateTimeAndAppend = () => {
  const pElement = $("#currentDay");

  const dateTime = moment().format("dddd Do [of] MMMM YYYY,  HH:mm:ss");
  pElement.text(dateTime);
};

const secondsTicking = () => {
  const callback = () => {
    getDateTimeAndAppend();
  };

  setInterval(callback, 1000);
};

$(document).ready(secondsTicking);

// get the text area
// link it to a hour
// hour = get hour by id
//get text by id
// set text value as textarea input value
// put both in object together
// key hour, key text
//make an array of objects - each hour

//take that and put it in local storage

// local storage
// set item - pass in key and value, need to be string - JSON.stringify
// get item JSON.parse
// clear - for all, remove item - single key
