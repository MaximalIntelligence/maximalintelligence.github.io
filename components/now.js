import {useEffect, useRef, useState} from 'react';

export function useNow() {
    const [now, setNow] = useState(()=>performance.now());
    useEffect(()=>{
        let id;
        const tick = () => { setNow(t); id=requestAnimationFrame(tick); };
        id = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(id);
    }, []);
    return now;
}

export function useElapsed(speed = 1) {
    const [t, setT] = useState(0);          // matches the server-rendered frame
    const speedRef = useRef(speed);
  
    useEffect(() => {
      speedRef.current = speed;             // change speed without restarting the loop
    }, [speed]);
  
    useEffect(() => {
      let id;
      let last = null;
      let elapsed = 0;
  
      const tick = (now) => {
        if (last !== null) {
          const dt = Math.min(now - last, 50);   // no leap after a background tab
          elapsed += dt * speedRef.current;
        }
        last = now;
        setT(elapsed);
        id = requestAnimationFrame(tick);
      };
  
      id = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(id);
    }, []);
  
    return t;   // ms since the animation started, scaled by speed
  }