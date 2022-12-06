import React from "react";
import { render, screen } from "@testing-library/react";
import { useEvent } from "@testing-library/user-event";
import FrameworkList from "./FrameworkList";

describe("FrameworkListコンポーネントが正しくレンダリングされるかどうか確認", () => {
  it("propsを受け取らない場合に正しくレンダリングされるか確認", () => {
    render(<FrameworkList />);
    expect(
      screen.getByRole("heading", { name: "No data !" })
    ).toBeInTheDocument();
  });

  it("propsを受け取った場合に正しくレンダリングされる確認", () => {
    const dummyData = [
      { id: 1, item: "React dummy" },
      { id: 2, item: "Vue dummy" },
      { id: 3, item: "Angular dummy" },
    ];
    render(<FrameworkList frameworks={dummyData} />);
    const frameworkItems = screen
      .getAllByRole("listitem")
      .map((ele) => ele.textContent);
    const dummyItems = dummyData.map((data) => data.item);
    expect(frameworkItems).toEqual(dummyItems);
    expect(screen.queryByText("No data !")).toBeNull();
  });
});
