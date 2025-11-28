export default function generateReqNums() {
  let lastTime = 0;
  let counter = 0;

  return function () {
    const now = Date.now();

    if (now === lastTime) {
      counter++;
    } else {
      lastTime = now;
      counter = 0;
    }

    return Number(`${now}${counter.toString().padStart(3, '0')}`);
  };
}
