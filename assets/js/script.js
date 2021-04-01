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

const renderPresentOrFuture = () => {
  const plannerEvents = JSON.parse(localStorage.getItem("plannerEvents"));
  const currentHour = moment().hour();
  const timeBlocks = $(".container .row");
  const callback = function () {
    const textarea = $(this).find("textarea");
    const timeBlockTime = Number.parseInt($(this).data("time"), 10);
    if (timeBlockTime < currentHour) {
      textarea.addClass("past");
    }

    if (timeBlockTime === currentHour) {
      textarea.removeClass("past").addClass("present");
    }
    if (timeBlockTime > currentHour) {
      textarea.addClass("future");
    }

    const plannedEvent = plannerEvents[timeBlockTime];
    textarea.text(plannedEvent);
  };

  timeBlocks.each(callback);
};

const renderDailyScheduleEvents = () => {
  const plannerEvents = JSON.parse(localStorage.getItem("plannerEvents"));

  if (plannerEvents !== null) {
    renderPresentOrFuture();
  } else {
    // to do if you want try adding a modal that says you have no plans put in
    localStorage.setItem("plannerEvents", JSON.stringify({}));
  }
};

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

    localStorage.setItem("plannerEvents", JSON.stringify({ newObject }));
  }
};

const onReady = () => {
  $(".container").click(onClick);
  secondsTicking();
  renderDailyScheduleEvents();
};

$(document).ready(onReady);
