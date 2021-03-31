// Wednesday, 31st of March, 13:35:12

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

secondsTicking();
