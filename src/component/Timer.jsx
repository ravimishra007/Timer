import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Timer = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  useEffect(() => {
    if (time === 60) {
        toast.info("Timer reached 1 minute!");
    }
    if (time === 120) {
        toast.info("Timer reached 2 minute!");
    }
    if (time === 180) {
        toast.info("Timer reached 3 minute!");
    }
    if (time === 240) {
        toast.info("Timer reached 4 minute!");
    }
    if (time === 300) {
        toast.info("Timer reached 5 minute!");
    }
  }, [time]);

  const formatTime = (seconds) => {
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = `${Math.floor(seconds / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const stopTimer = () => {
    setIsActive(false);
    setTime(0);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(0);
    setLaps([]);
  };

  const lapTimer = () => {
    setLaps([...laps, time]);
  };

  return (
    <>
          <ToastContainer />
      <div className="card">
        <div className="card-info">
          <div>
            <h1>{formatTime(time)}</h1>
          </div>
          <div className="main-div">
            <button className="btn1" onClick={startTimer}>
              Start
            </button>
            <button className="btn2" onClick={pauseTimer}>
              Pause
            </button>
            <button className="btn3" onClick={stopTimer}>
              Stop
            </button>
            <button className="btn4" onClick={resetTimer}>
              Reset
            </button>
            <button className="btn5" onClick={lapTimer}>
              Lap
            </button>
          </div>
          <div className="lap">
            <ul>
              {laps.map((lap, index) => (
                <p key={index}>{`Lap ${index + 1} : ${formatTime(lap)}`}</p>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Timer;
