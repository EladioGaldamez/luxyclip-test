import { useState, useEffect } from "react";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear the timeout if the value or delay changes, or if the component unmounts
    // This ensures that the debounced value is only updated after the delay
    // has passed without any new changes to the original value
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Re-run the effect if value or delay changes

  return debouncedValue;
}

export default useDebounce;
