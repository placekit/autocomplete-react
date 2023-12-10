import { useState } from 'react';

// dequal borrowed from https://github.com/lukeed/dequal/blob/master/src/lite.js
const has = Object.prototype.hasOwnProperty;

function dequal(foo, bar) {
  let ctor;
  let len;
  if (foo === bar) return true;

  if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
    if (ctor === Date) return foo.getTime() === bar.getTime();
    if (ctor === RegExp) return foo.toString() === bar.toString();

    if (ctor === Array) {
      if ((len = foo.length) === bar.length) {
        while (len-- && dequal(foo[len], bar[len]));
      }
      return len === -1;
    }

    if (!ctor || typeof foo === 'object') {
      len = 0;
      // eslint-disable-next-line guard-for-in
      for (ctor in foo) {
        if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
        if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;
      }
      return Object.keys(bar).length === len;
    }
  }

  return foo !== foo && bar !== bar;
}

// prevent re-renders when options prop is an object literal
export function useStableValue(value) {
  const [stableValue, setStableValue] = useState(() => value);
  if (!dequal(stableValue, value)) {
    setStableValue(value);
  }
  return stableValue;
}
