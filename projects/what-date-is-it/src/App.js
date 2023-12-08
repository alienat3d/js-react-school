import { useState } from "react";
import './App.css';

const dateHeading = 'Current date',
  timeHeading = 'Current time',
  date = new Date(),
  weekDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  weekDayNum = date.getDay(),
  monthNum = date.getMonth(),
  hours = date.getHours(),
  minutes = date.getMinutes();
let dateNum = date.getDate();

switch (dateNum) {
  case 1:
    dateNum += 'st';
    break;
  case 2:
    dateNum += 'nd';
    break;
  case 3:
    dateNum += 'rd';
    break;
  default:
    dateNum += 'th';
}

const App = () => {

  // let seconds = setInterval(() => date.getSeconds());



  let time = new Date().toLocaleTimeString();
  const [ctime, setTime] = useState(time);
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString()
    setTime(time)
  }
  setInterval(UpdateTime);

  return (
    <div className="App">
      <h1>{dateHeading}</h1>
      <p className='what-day-is-it'>
        Today is {weekDayNames[weekDayNum]}. {dateNum} of {monthNames[monthNum]}.
      </p>
      <h2>{timeHeading}</h2>
      <p className='what-time-is-it'>
        It is {ctime.slice(0, 1)} hours, {ctime.slice(2, -6)} minutes and {ctime.slice(5, -3)} seconds on the clock right now.
      </p>
    </div>
  );
}

export default App;
