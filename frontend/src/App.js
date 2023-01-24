import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [currentDate, setCurrentDate] = useState(0);
  useEffect(() => {
  fetch(' http://localhost:8000').then(res => res.json()).then(data => {
    const timeOptions = { timeZone: 'UTC', hour: 'numeric', minute: 'numeric', hour12: true };
    const dateOptions = { timeZone: 'UTC', weekday: 'long', month: 'long', day: 'numeric' };
    const formatter = new Intl.DateTimeFormat([], timeOptions);
    const dateFormatter = new Intl.DateTimeFormat([], dateOptions);
    const localTime = formatter.format(new Date(data.utc_time));
    const localDate = dateFormatter.format(new Date(data.utc_date));
    setCurrentTime(localTime);
    setCurrentDate(localDate);
  });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
      <p>The date is {currentDate} and the time is {currentTime}.</p> <br/>

      </header>
    </div>
  );
}

export default App;