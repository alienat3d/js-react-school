function timer(id, deadline) {

  const getTimeRemaining = (endTime) => {
    let days, hours, minutes, seconds;
    const time = Date.parse(endTime) - Date.parse(new Date());

    if (time <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      (days = Math.floor(time / (1000 * 60 * 60 * 24))), (hours = Math.floor((time / (1000 * 60 * 60)) % 24)), (minutes = Math.floor((time / (1000 * 60)) % 60)), (seconds = Math.floor((time / 1000) % 60));
    }

    return {
      total: time,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  };

  const addZero = (num) => {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  };

  const setTimer = (selector, endTime) => {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds');

    const updateTimer = () => {
      const time = getTimeRemaining(endTime);

      days.textContent = addZero(time.days);
      hours.textContent = addZero(time.hours);
      minutes.textContent = addZero(time.minutes);
      seconds.textContent = addZero(time.seconds);

      if (time.total <= 0) {
        clearInterval(timeInterval);
      }
    };

    updateTimer();

    const timeInterval = setInterval(updateTimer, 1000);
  };

  getTimeRemaining();
  setTimer(id, deadline);
}

export default timer;