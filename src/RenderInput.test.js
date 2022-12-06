import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RenderInput from "./RenderInput";

describe("Rendering", () => {
  it("各要素が正しく画面に表示されているか確認", () => {
    render(<RenderInput />);
    const inputEl = screen.getByPlaceholderText("Enter");
    const butttonEl = screen.getByRole("button");
    expect(inputEl).toBeInTheDocument();
    expect(butttonEl).toBeInTheDocument();
  });
});

describe("input要素のonChangeイベントが正しく機能しているのか確認", () => {
  it("入力値を変更 > 画面更新", async () => {
    const user = userEvent.setup();
    render(<RenderInput />);
    const inputEl = screen.getByPlaceholderText("Enter");

    await user.type(inputEl, "こんにちは");
    expect(inputEl.value).toBe("こんにちは");
  });
});

describe("Consoleボタンを押したときの挙動が条件分岐によって変化する", () => {
  it("outputConsole関数が呼び出されないことを検証", () => {
    const user = userEvent.setup();
    const outputConsole = jest.fn();
    render(<RenderInput {...{ outputConsole }} />);
    const butttonEl = screen.getByRole("button");
    user.click(butttonEl);
    expect(outputConsole).not.toHaveBeenCalled();
  });
  it("outputConsole関数が呼び出されることを検証", async () => {
    const user = userEvent.setup();
    const outputConsole = jest.fn();
    render(<RenderInput {...{ outputConsole }} />);
    const inputEl = screen.getByPlaceholderText("Enter");
    const butttonEl = screen.getByRole("button");

    await user.type(inputEl, "こんにちは");
    await user.click(butttonEl);
    expect(outputConsole).toHaveBeenCalledTimes(1);
  });
});
