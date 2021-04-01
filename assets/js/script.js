const getDateTimeAndAppend = () => {
  const pElement = $("#currentDay");

  const dateTime = moment().format("dddd Do [of] MMMM YYYY,  HH:mm:ss");
  pElement.text(dateTime);
};

const secondsTicking = () => {
  const renderDateTime = () => {
    getDateTimeAndAppend();
  };

  setInterval(renderDateTime, 1000);
};

const renderDailyScheduleEvents = () => {
  const plannerEvents = JSON.parse(localStorage.getItem("plannerEvents"));

  if (plannerEvents !== null) {
    const currentHour = moment().hour();
    const timeBlocks = $(".container .row");
    const callback = function () {
      const textarea = $(this).find("textarea");
      const timeBlockTime = Number.parseInt($(this).data("time"), 10);
      if (timeBlockTime === currentHour) {
        textarea.removeClass("past").addClass("present");
      }
      if (timeBlockTime > currentHour) {
        textarea.removeClass("past").addClass("future");
      }

      const plannedEvent = plannerEvents[timeBlockTime];
      textarea.text(plannedEvent);
    };

    timeBlocks.each(callback);
  } else {
    // to do if you want try adding a modal that says you have no plans put in
    localStorage.setItem("plannerEvents", JSON.stringify({}));
  }
};

const onReady = () => {
  secondsTicking();
  renderDailyScheduleEvents();
};

$(document).ready(onReady);

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
