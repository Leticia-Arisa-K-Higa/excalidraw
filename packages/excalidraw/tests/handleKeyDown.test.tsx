import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

import { ProjectName } from "../components/ProjectName";

describe("ProjectName - handleKeyDown", () => {
  const renderComponent = () =>
    render(
      <ProjectName value="nome-projeto" label="Projeto" onChange={vi.fn()} />
    );

  it("não faz nada se a tecla não for Enter", () => {
    const { getByTestId } = renderComponent();
    const input = getByTestId("projectname-input");

    const blurSpy = vi.spyOn(input, "blur");

    fireEvent.keyDown(input, { key: "a" });

    expect(blurSpy).not.toHaveBeenCalled();
  });

  it("não chama blur se isComposing for true", () => {
    const { getByTestId } = renderComponent();
    const input = getByTestId("projectname-input");
  
    const blurSpy = vi.spyOn(input, "blur");
  
    const event = new KeyboardEvent("keydown", {
      key: "Enter",
      bubbles: true,
      cancelable: true,
      composed: true,
    });
  
    Object.defineProperty(event, "isComposing", {
      get: () => true,
    });
  
    input.dispatchEvent(event);
  
    expect(blurSpy).not.toHaveBeenCalled();
  });
  

  it("não chama blur se keyCode for 229", () => {
    const { getByTestId } = renderComponent();
    const input = getByTestId("projectname-input");

    const blurSpy = vi.spyOn(input, "blur");

    fireEvent.keyDown(input, {
      key: "Enter",
      keyCode: 229,
      nativeEvent: { isComposing: false },
    });

    expect(blurSpy).not.toHaveBeenCalled();
  });

  it("chama blur se tecla for Enter e não estiver compondo", () => {
    const { getByTestId } = renderComponent();
    const input = getByTestId("projectname-input");

    const blurSpy = vi.spyOn(input, "blur");

    fireEvent.keyDown(input, {
      key: "Enter",
      keyCode: 13,
      nativeEvent: { isComposing: false },
    });

    expect(blurSpy).toHaveBeenCalled();
  });
});
