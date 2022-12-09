import { configureStore } from "@reduxjs/toolkit";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Provider } from "react-redux";
import customCounterReducer from "./features/customCounter/customCounterSlice";
import ReduxAsync from "./ReduxAsync";

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: "Bred dummy" }));
  })
);
beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());

describe("ReduxAsync API Mocking", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterReducer,
      },
    });
  });
  it("FetchJSONが成功した場合、Bred dummyが画面に表示される", async () => {
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );
    expect(screen.queryByRole("heading")).toBeNull();
    const user = userEvent.setup();
    await user.click(screen.getByText("FetchJSON"));
    expect(
      await screen.findByRole("heading", { name: "Bred dummy" })
    ).toBeInTheDocument();
  });
  it("FetchJSONが失敗した場合、anonymousが画面に表示される", async () => {
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/users/1",
        (req, res, ctx) => {
          return res(ctx.status(404));
        }
      )
    );
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );
    const user = userEvent.setup();
    await user.click(screen.getByText("FetchJSON"));
    expect(await screen.findByText("anonymous")).toBeInTheDocument();
  });
});
