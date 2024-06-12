import { useState, useLayoutEffect } from "react";

const useResizeObserver = (ref) => {
  const [isScrollable, setIsScrollable] = useState(false);

  useLayoutEffect(() => {
    const checkIfScrollable = (element) => {
      const { scrollWidth, clientWidth } = element;

      setIsScrollable(scrollWidth > clientWidth);
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        checkIfScrollable(entry.target);
      }
    });

    const element = ref.current;
    if (element) {
      resizeObserver.observe(element);
      checkIfScrollable(element);
    }

    return () => {
      if (element) {
        resizeObserver.unobserve(element);
      }
    };
  }, [ref]);

  return { isScrollable };
};

export default useResizeObserver;
