import { describe, it, vi, expect, beforeEach } from "vitest";
import { animateShiftUp, animateShiftDown } from "../shift";

describe("animateShift", () => {
  let targetMock, parentMock, toRectMock;

  beforeEach(() => {
    // Mock target and its parent element
    parentMock = {
      gap: "10px",
      getComputedStyle: () => ({ gap: "10px" }),
    };

    targetMock = {
      parentElement: parentMock,
      animate: vi.fn(),
    };

    // Mock toRect
    toRectMock = { height: 50 };

    // Mock global getComputedStyle
    global.getComputedStyle = vi.fn().mockImplementation(() => ({
      gap: "10px",
    }));
  });

  it("animates shift upwards", () => {
    animateShiftUp(targetMock, toRectMock, 300);

    const expectedTranslateY = toRectMock.height + parseInt(global.getComputedStyle(targetMock.parentElement).gap);
    const transformAnimation = [
      { transform: `translateY(${expectedTranslateY}px)` },
      { transform: "translateY(0)" },
    ];

    expect(targetMock.animate).toHaveBeenCalledWith(transformAnimation, {
      duration: 300,
      easing: "ease",
    });
  });

  it("animates shift downwards", () => {
    animateShiftDown(targetMock, toRectMock, 300);

    const expectedTranslateY = toRectMock.height + parseInt(global.getComputedStyle(targetMock.parentElement).gap);
    const transformAnimation = [
      { transform: `translateY(-${expectedTranslateY}px)` },
      { transform: "translateY(0)" },
    ];

    expect(targetMock.animate).toHaveBeenCalledWith(transformAnimation, {
      duration: 300,
      easing: "ease",
    });
  });

  it("throws no error if gap is not defined in parent style", () => {
    global.getComputedStyle = vi.fn().mockImplementation(() => ({}));

    expect(() => animateShiftUp(targetMock, toRectMock, 300)).not.toThrow();
    expect(() => animateShiftDown(targetMock, toRectMock, 300)).not.toThrow();
  });
});
