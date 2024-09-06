// document.querySelector("");
// document.querySelectorAll("")

(() => {
  let hour = document.querySelector(".hours");
  let minute = document.querySelector(".minutes");
  let second = document.querySelector(".seconds");

  let start = document.querySelector(".start");
  let stop = document.querySelector(".stop");
  let reset = document.querySelector(".reset");

  var countDownTimer = null;

  let stopInterval = (action) => {
    start.innerHTML = action == "pause" ? "Continue" : "Start";

    start.style.display = "initial";
    stop.style.display = "none";

    clearInterval(countDownTimer);
  };

  // Rest Logic Start
  let resetTimer = () => {
    hour.value = "";
    minute.value = "";
    second.value = "";

    stopInterval();
  };

  // Reset Logic End

  var timer = () => {
    if (second.value > 60) {
      minute.value = minute.value + 1;
      second.value = (second.value % 60) - 1;
    }

    if (minute.value > 60) {
      hour.value = hour.value + 1;
      minute.value = minute.value % 60;
    }

    if (hour.value == 0 && minute.value == 0 && second.value == 0) {
      hour.value = "";
      minute.value = "";
      second.value = "";

      stopInterval();
    } else if (second.value != 0) {
      second.value = `${second.value <= 10 ? "0" : ""}${second.value - 1}`;
    } else if (minute.value != 0) {
      minute.value = `${minute.value <= 10 ? "0" : ""}${minute.value - 1}`;
      second.value = 59;
    } else if (hour.value != 0) {
      hour.value = `${hour.value <= 10 ? "0" : ""}${hour.value - 1}`;
      minute.value = 60;
    }
  };

  start.addEventListener("click", () => {
    if (hour.value == 0 && minute.value == 0 && second.value == 0) return;

    let startInterval = () => {
      start.style.display = "none";
      stop.style.display = "initial";
      countDownTimer = setInterval(() => {
        timer();
      }, 1000);
    };

    startInterval();
  });

  stop.addEventListener("click", () => {
    stopInterval("pause");
  });

  reset.addEventListener("click", () => {
    resetTimer();
  });
})();
