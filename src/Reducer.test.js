import { screen, render } from "@testing-library/react";
import { useEvent } from "@testing-library/user-event";
import { useDispatch, useSelector } from "react-redux";

import reducer, {
  increment,
  incrementByAmount,
} from "./features/customCounter/customCounterSlice";

describe("customCounterSliceに登録されたreducerのテスト", () => {
  describe("increment action", () => {
    let initialState = {
      mode: 0,
      value: 1,
    };

    it("modeが0のとき、1だけインクリメントすることを確認", () => {
      const action = { type: increment.type };
      const state = reducer(initialState, action);
      expect(state.value).toBe(2);
    });

    it("modeが1のとき、100インクリメントすることを確認", () => {
      initialState.mode = 1;
      const action = { type: increment.type };
      const state = reducer(initialState, action);
      expect(state.value).toBe(101);
    });

    it("modeが2のとき、10000インクリメントすることを確認", () => {
      initialState.mode = 2;
      const action = { type: increment.type };
      const state = reducer(initialState, action);
      expect(state.value).toBe(10001);
    });
  });

  describe("incrementByAmount action", () => {
    let initialState = {
      value: 0,
      mode: 0,
      username: "",
    };
    it("modeが0のとき、引数で渡された値だけインクリメントすることを確認", () => {
      const action = { type: incrementByAmount.type, payload: 5 };
      const newState = reducer(initialState, action);
      expect(newState.value).toBe(5);
    });
    it("modeが1のとき、引数で渡された値*100だけインクリメントすることを確認", () => {
      initialState.mode = 1;
      const action = { type: incrementByAmount.type, payload: 5 };
      const newState = reducer(initialState, action);
      expect(newState.value).toBe(500);
    });
    it("modeが2のとき、引数で渡された値*10000だけインクリメントすることを確認", () => {
      initialState.mode = 2;
      const action = { type: incrementByAmount.type, payload: 5 };
      const newState = reducer(initialState, action);
      expect(newState.value).toBe(50000);
    });
  });
});
