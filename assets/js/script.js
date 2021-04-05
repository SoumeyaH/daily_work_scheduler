// using moment js gets current date time and appends
const getDateTimeAndAppend = () => {
  const pElement = $("#currentDay");

  const dateTime = moment().format("dddd Do [of] MMMM YYYY,  HH:mm:ss");
  pElement.text(dateTime);
};

// ensures that the time gets updated every second
const secondsTicking = () => {
  const renderDateTime = () => {
    getDateTimeAndAppend();
  };

  setInterval(renderDateTime, 1000);
};

//using moment js checks current hour and accordingly changes css classes to render past/present/future textarea colouring
const renderPastPresentOrFuture = () => {
  const plannerEvents = JSON.parse(localStorage.getItem("plannerEvents"));
  const currentHour = moment().hour();
  const timeBlocksArray = $(".container .row");
  const callback = function () {
    const textarea = $(this).find("textarea");
    const timeBlockTime = Number.parseInt($(this).data("time"), 10);

    if (timeBlockTime === currentHour) {
      textarea.removeClass("past").addClass("present");
    }
    if (timeBlockTime > currentHour) {
      textarea.addClass("future");
    }

    const plannedEvent = plannerEvents[timeBlockTime];
    textarea.text(plannedEvent);
  };

  timeBlocksArray.each(callback);
};

// if user events stored in local storage then they are rendered to page, otherwise empty array added to local storage
const renderDailyScheduleEvents = () => {
  const plannerEvents = JSON.parse(localStorage.getItem("plannerEvents"));

  if (plannerEvents !== null) {
    renderPastPresentOrFuture();
  } else {
    localStorage.setItem("plannerEvents", JSON.stringify({}));
  }
};

// on click of save button text area user input is added to local storage
const onClick = function (event) {
  const plannerEvents = JSON.parse(localStorage.getItem("plannerEvents"));
  const target = $(event.target);

  if (target.is("button")) {
    const key = target.attr("id");
    const value = target.parent().find("textarea").val();

    const newObject = {
      ...plannerEvents,
      [key]: value,
    };

    localStorage.setItem("plannerEvents", JSON.stringify(newObject));
    renderDailyScheduleEvents();
  }
};

// invokes function that renders time, function that saves user input to local storage, and function that reads from local storage and renders if anything is available
const onReady = () => {
  secondsTicking();
  $(".container").click(onClick);
  renderDailyScheduleEvents();
};

// On ready method initiates all the code inside callback function on ready
$(document).ready(onReady);
