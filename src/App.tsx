/* eslint-disable no-alert */
import { useCallback, useEffect, useMemo, useState } from "react";

import "./App.css";

function App() {
  const [heading, setHeading] = useState(0);

  const isIOS = useMemo(() => navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/), []);

  const handler = useCallback((e: DeviceOrientationEvent) => {
    setHeading(Math.round((e as any).webkitCompassHeading || Math.abs(e.alpha! - 360)));
  }, []);

  useEffect(() => {
    console.log(isIOS);
    if (!isIOS) {
      console.log("not ios");
      window.addEventListener("deviceorientationabsolute", handler as any);
    }
    return () => { window.removeEventListener("deviceorientationabsolute", handler as any); };
  }, [handler, isIOS]);

  const start = () => {
    (DeviceOrientationEvent as any).requestPermission()
      .then((response: unknown) => {
        if (response === "granted") {
          window.addEventListener("deviceorientation", handler, true);
        } else {
          alert("has to be allowed!");
        }
      })
      .catch(() => alert("not supported"));
  };

  return (
    <div className="App">
      <button type='button' onClick={start}>Start compass</button>
      <p>
        Heading:{heading}
      </p>
    </div>
  );
}

export default App;