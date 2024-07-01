import { useState } from "react";

import { Button } from "../../components";

import "./Sandbox.css";

const Sandbox = () => {
  const [count, setCount] = useState(0);

  const increase = () => setCount((prev) => prev + 1);
  const decrease = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
    }
  };

  return (
    <div className="sandbox">
      <div className="counter-container">
        <h1>Counter: {count}</h1>
        <div className="button-group">
          <Button onClick={increase} className="btn btn-success">
            Increase
          </Button>
          <Button onClick={decrease} className="btn btn-danger">
            Decrease
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sandbox;
