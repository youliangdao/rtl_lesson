import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import customCounterReducer from "./features/customCounter/customCounterSlice";
import Redux from "./Redux";

describe("Redux Integration Test", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterReducer,
      },
    });
  });

  it("+ボタンを1回押すごとに、1だけインクリメントすることを確認", async () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "+" }));
    expect(screen.getByTestId("count-value")).toHaveTextContent(3);
  });

  it("-ボタンを1回押すごとに、1だけデクリメントすることを確認", async () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "-" }));
    await user.click(screen.getByRole("button", { name: "-" }));
    expect(screen.getByTestId("count-value")).toHaveTextContent(-2);
  });

  it("入力フォームに値を入力して、incrementAmountボタンを押すとその値だけ足し合わされることを確認", async () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText("Enter"), "30");
    await user.click(screen.getByText("incrementByAmount"));
    expect(screen.getByTestId("count-value")).toHaveTextContent(30);
  });
});
