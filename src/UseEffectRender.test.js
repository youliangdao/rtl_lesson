import { React } from "react";
import { render, screen } from "@testing-library/react";
import UseEffectRender from "./UseEffectRender";

describe("useEffectRenderコンポーネントの動作確認", () => {
  it("非同期でデータ取得してからレンダリングされることを確認", async () => {
    render(<UseEffectRender />);
    expect(screen.queryByText(/I am /)).toBeNull();
    expect(await screen.findByText(/I am /)).toBeInTheDocument();
  });
});
