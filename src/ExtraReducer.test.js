import reducer, {
  fetchDummy,
} from "./features/customCounter/customCounterSlice";

describe("customCounterSliceに登録されたextraReducerのテスト", () => {
  const initialState = {
    mode: 0,
    value: 0,
    username: "",
  };

  it("fetchDummyが正常終了した場合に、valueが100 + payloadになることを確認", () => {
    const action = { type: fetchDummy.fulfilled.type, payload: 5 };
    const newState = reducer(initialState, action);
    expect(newState.value).toBe(105);
  });
  it("fetchDummyがエラーになった場合に、valueが100 - payloadになることを確認", () => {
    const action = { type: fetchDummy.rejected.type, payload: 5 };
    const newState = reducer(initialState, action);
    expect(newState.value).toBe(95);
  });
});
