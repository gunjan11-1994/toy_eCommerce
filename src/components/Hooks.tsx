import { Button } from "@mui/material";
import { useState } from "react";

function Hooks() {
  const [count, setCount] = useState<number>(0);
  const [light, setLight] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(true);

  return (
    <div>
      <h1>{count}</h1>
      <br />
      <h1>{light ? "Light is ON" : "Light is OFF"}</h1>

      <h1>{count % 2 === 0 ? "Even" : "Odd"}</h1>
      <Button
        variant="contained"
        color="success"
        onClick={() => setCount(count + 1)}
      >
        Increase
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={() => setCount(count - 1)}
      >
        Decrease
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={() => setLight(!light)}
      >
        {light ? "Turn Off" : "Turn On"}
      </Button>

      <Button
        variant="contained"
        color="success"
        onClick={() => setShow(!show)}
      >
        {show ? "Hide" : "Show"}
      </Button>
      {show && <h1>This is a Secrete Message</h1>}
    </div>
  );
}

export default Hooks;
