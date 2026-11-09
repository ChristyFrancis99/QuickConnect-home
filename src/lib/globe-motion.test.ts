import { describe, expect, it } from "vitest";
import { getPanelMotion } from "./globe-motion";

describe("scroll-controlled gallery panel motion", () => {
  it("keeps every panel assembled at the start of the scroll", () => {
    expect(getPanelMotion(4, 0)).toEqual({
      x: 0,
      y: 0,
      z: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      opacity: 1,
    });
  });

  it("separates and fades panels fully by the end of the scroll", () => {
    const motion = getPanelMotion(4, 1);

    expect(Math.hypot(motion.x, motion.y, motion.z)).toBeGreaterThan(2.7);
    expect(motion.opacity).toBe(0);
  });

  it("clamps scroll progress to its reversible assembled and dispersed endpoints", () => {
    expect(getPanelMotion(12, -0.5)).toEqual(getPanelMotion(12, 0));
    expect(getPanelMotion(12, 1.5)).toEqual(getPanelMotion(12, 1));
  });
});