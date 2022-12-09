import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDummy,
  fetchJSON,
  selectCount,
  selectUser,
} from "./features/customCounter/customCounterSlice";

const ReduxAsync = () => {
  const count = useSelector(selectCount);
  const username = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <div>
      <span data-testid="count-value">{count}</span>
      <button onClick={() => dispatch(fetchDummy(5))}>FetchDummy</button>
      {username && <h3>{username}</h3>}
      <button onClick={() => dispatch(fetchJSON())}>FetchJSON</button>
    </div>
  );
};

export default ReduxAsync;
