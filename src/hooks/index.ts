import React, { useState, useEffect, useRef } from "react";
type Props = {
  key: string;
  defaultValue: any;
};
export function useLocalStorageState({ key, defaultValue }: Props) {
  const [state, setState] = useState(() => {
    if (typeof window !== "undefined") {
      const value = localStorage.getItem(key);
      if (value) {
        try {
          return value;
        } catch (error) {
          localStorage.removeItem(key);
        }
      }
      return typeof defaultValue === "function" ? defaultValue() : defaultValue;
    }
  });
  const prevKeyRef = useRef(key);
  useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
}
