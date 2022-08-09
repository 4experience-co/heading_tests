/* eslint-disable no-alert */
import { useCallback, useEffect, useMemo, useState } from "react";

import "./App.css";

function App() {
  const [heading, setHeading] = useState(0);

  const isIOS = useMemo(() => navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/), []);

  const handler = useCallback((e: any) => {
    setHeading(e.webkitCompassHeading);
  }, []);

  useEffect(() => {
    if (!isIOS) {
      window.addEventListener("deviceorientationabsolute", handler, true);
    }
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
      <h1>webitCompassHeading</h1>
      <h1>
        Heading:{heading}
      </h1>
    </div>
  );
}

export default App;