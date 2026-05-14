/// <reference lib="webworker" />

declare const self: DedicatedWorkerGlobalScope;

self.onmessage = () => {
  let sum = 0;
  for (let i = 1; i <= 1_000_000_000; i++) {
    sum += i;
  }
  self.postMessage(sum);
};

export {};
