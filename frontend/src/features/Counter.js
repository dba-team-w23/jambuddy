import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset, incrementByAmount } from "./counterSlice";
import { useState } from "react";

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  const [incrementAmount, setIncrementAmount] = useState(0);

  const addValue = Number(incrementAmount) || 0;

  const resetAll = () => {
    setIncrementAmount(0);
    dispatch(reset());
  };

  return (
    <section>
      <p className="text-center">{count}</p>
      <div className="flex items-center justify-center">
        <button
          className="text-white bg-blue-500 p-2 m-2"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <button
          className="text-white bg-blue-500 p-2 m-2"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      <div className="w-full flex justify-center">
        <input
          className="border-2 border-blue-500 p-2 m-2 w-20"
          type="text"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className="text-white bg-blue-500 p-2 m-2"
          onClick={() => dispatch(incrementByAmount(addValue))}
        >
          Add Amount
        </button>
        <button className="text-white bg-blue-500 p-2 m-2" onClick={resetAll}>
          Reset
        </button>
      </div>
    </section>
  );
};

export default Counter;
