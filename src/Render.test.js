import React from "react";
import { render, screen } from "@testing-library/react";
import Render from "./Render";

describe("Renderコンポーネントの初期表示確認", () => {
  it("正しくレンダリングされているかどうか確認", () => {
    const { debug } = render(<Render />);
    const h1El = screen.getByRole("heading", {
      name: "React Testing Library Lesson",
    });
    const inputEl = screen.getByRole("textbox");
    const button1El = screen.getAllByRole("button", { name: "Click1" });
    const button2El = screen.getAllByRole("button", { name: "Click2" });
    const pEl = screen.getByText("Udemy");
    const spanEl = screen.getByText("@React");
    expect(h1El).toBeTruthy();
    expect(inputEl).toBeInTheDocument();
    expect(button1El).toBeTruthy();
    expect(button2El).toBeTruthy();
    expect(pEl).toBeInTheDocument();
    expect(spanEl).toBeInTheDocument();
    expect(screen.getByTestId("copyright")).toBeTruthy();
  });
});
