import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import customCounterReducer from "./features/customCounter/customCounterSlice";
import ReduxAsync from "./ReduxAsync";

describe("ReduxAsyncThunk Integration test", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterReducer,
      },
    });
  });

  it("FetchDummyボタンを押下 > 105が表示されることを確認", async () => {
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );
    const user = userEvent.setup();
    await user.click(screen.getByText("FetchDummy"));
    expect(await (await screen.findByTestId("count-value")).textContent).toBe(
      "105"
    );
  });
});
