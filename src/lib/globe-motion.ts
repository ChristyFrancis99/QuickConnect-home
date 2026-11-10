export type PanelMotion = {
  x: number;
  y: number;
  z: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  opacity: number;
};

const clampProgress = (progress: number) => Math.max(0, Math.min(1, progress));

export function getPanelMotion(index: number, progress: number): PanelMotion {
  const t = clampProgress(progress);
  if (t === 0) {
    return { x: 0, y: 0, z: 0, rotationX: 0, rotationY: 0, rotationZ: 0, opacity: 1 };
  }
  const eased = t * t * (3 - 2 * t);
  const seed = index + 1;
  const directionX = Math.sin(seed * 12.9898);
  const directionY = Math.cos(seed * 7.233);
  const directionZ = Math.sin(seed * 4.173 + 1.4);
  const distance = 2.7 + ((seed * 37) % 9) * 0.19;
  const fade = Math.max(0, Math.min(1, (1 - t) / 0.4));

  return {
    x: directionX * distance * eased,
    y: directionY * distance * eased,
    z: directionZ * distance * eased,
    rotationX: Math.sin(seed * 2.17) * 0.75 * eased,
    rotationY: Math.cos(seed * 1.43) * 0.75 * eased,
    rotationZ: Math.sin(seed * 0.87) * 0.55 * eased,
    opacity: fade,
  };
}

export function getGlobeCameraFov(progress: number): number {
  const t = clampProgress(progress);
  const eased = t * t * (3 - 2 * t);
  return 40 + Math.sqrt(eased) * 60;
}
