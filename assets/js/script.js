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

const renderPastPresentOrFuture = () => {
  const plannerEvents = JSON.parse(localStorage.getItem("plannerEvents"));
  const timeBlocksArray = $(".container .row");

  const callback = function () {
    const currentHour = moment().hour();
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

const renderDailyScheduleEvents = () => {
  const plannerEvents = JSON.parse(localStorage.getItem("plannerEvents"));

  if (!plannerEvents) {
    localStorage.setItem("plannerEvents", JSON.stringify({}));
  }

  renderPastPresentOrFuture();
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

    localStorage.setItem("plannerEvents", JSON.stringify(newObject));
    renderDailyScheduleEvents();
  }
};

const onReady = () => {
  getDateTimeAndAppend();

  secondsTicking();

  renderDailyScheduleEvents();

  $(".container").click(onClick);
};

$(document).ready(onReady);
