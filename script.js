const timer = document.getElementById("timer");
setInterval(function () {
  let time = new Date().toLocaleTimeString();
  timer.textContent = `${time}`;
  ringAlarm();
}, 1000);

const selectHourElement = document.getElementById("hours");
const selectMinuteElement = document.getElementById("minutes");
const selectSecondElement = document.getElementById("seconds");

function selectHour() {
  for (let i = 1; i <= 12; i++) {
    const optionElement = document.createElement("option");
    optionElement.innerHTML = i;
    optionElement.value = i.toString();
    selectHourElement.append(optionElement);
  }
}

function selectMinutes() {
  for (let i = 1; i < 60; i++) {
    const optionElement = document.createElement("option");
    if (i < 10) {
      optionElement.innerHTML = `0${i}`;
      optionElement.value = `0${i.toString()}`;
    } else {
      optionElement.innerHTML = i;
      optionElement.value = i.toString();
    }
    selectMinuteElement.append(optionElement);
  }
}

function selectSeconds() {
  for (let i = 1; i < 60; i++) {
    const optionElement = document.createElement("option");
    if (i < 10) {
      optionElement.innerHTML = `0${i}`;
      optionElement.value = `0${i.toString()}`;
    } else {
      optionElement.innerHTML = i;
      optionElement.value = i.toString();
    }
    selectSecondElement.append(optionElement);
  }
}

selectHour();
selectMinutes();
selectSeconds();

const alarmBoxElement = document.getElementById("set-alarm-container");
const setAlarmBtnElement = document.getElementById("set-alarm");
const selectTimeZoneElement = document.getElementById("am-pm");

setAlarmBtnElement.addEventListener("click", () => {
  alarmContainer();
});

const alarmArray = [];
let idNumber = 0;

function alarmContainer() {
  const alarmElement = document.createElement("div");
  alarmElement.classList.add("alarm-element");
  alarmElement.id = idNumber++;

  const hours = selectHourElement.value;
  const minutes = selectMinuteElement.value;
  const seconds = selectSecondElement.value;
  const timeZone = selectTimeZoneElement.value;
  const time = `${hours}:${minutes}:${seconds} ${timeZone}`;

  if (
    time !== "HH:MM:SS AM" &&
    time !== "HH:MM:SS PM" &&
    !alarmArray.includes(time) &&
    alarmArray.length <= 5
  ) {
    alarmArray.push(time);

    console.log(alarmArray);

    alarmElement.innerHTML = `<h4>${time}</h4> 
      <button class="delete-btn">Delete</button>`;

    alarmBoxElement.append(alarmElement);

    alarmElement.querySelector(".delete-btn").addEventListener("click", () => {
      alarmElement.remove();
    });
  }
}

function ringAlarm() {
  const currentTime = new Date().toLocaleTimeString();
  if (alarmArray.includes(currentTime)) {
    ring();
  }
}
const stopAlarmElement = document.getElementById("stop-alarm");
function ring() {
  const audioElement = document.createElement("audio");
  const stopAlarm = document.createElement("button");
  stopAlarm.classList.add("stop-alarm-btn");
  stopAlarm.innerHTML = "Stop Alarm";
  audioElement.src = "Faded.mp3";
  audioElement.autoplay = true;
  stopAlarmElement.append(audioElement, stopAlarm);
  alert("Alarm started successfully");
  stopAlarm.addEventListener("click", () => {
    audioElement.remove();
    stopAlarm.remove();
  });
}
