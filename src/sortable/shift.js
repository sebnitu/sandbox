function animateShift(target, toRect, duration, direction = "") {
  const gap = parseInt(getComputedStyle(target.parentElement).gap)
  const translateY = toRect.height + gap;

  const transformAnimation = [
    { transform: `translateY(${direction}${translateY}px)` },
    { transform: "translateY(0)" },
  ];

  target.animate(transformAnimation, { duration, easing: "ease" });
}

export function animateShiftUp(...args) {
  animateShift(...args);
}

export function animateShiftDown(...args) {
  animateShift(...args, "-");
}
