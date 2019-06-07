export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function randomFail() {
  return new Promise((resolve, reject) => {
    if (Math.random() < 0.01) {
      reject();
    } else {
      resolve();
    }
  });
}
