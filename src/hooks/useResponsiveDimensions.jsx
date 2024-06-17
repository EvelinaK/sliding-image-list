/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useLayoutEffect } from "react";

const useResponsiveDimensions = (containerRef, config) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const { breakpoints = null, slidesToShow } = config;

  const findClosestBreakpoint = (width) => {
    const sortedBreakpoints = breakpoints.sort(
      (a, b) => a.breakpoint - b.breakpoint
    );

    let closestBreakpoint = null;

    for (let i = 0; i < sortedBreakpoints.length; i++) {
      if (sortedBreakpoints[i].breakpoint >= width) {
        closestBreakpoint = sortedBreakpoints[i];
        break;
      }
    }

    if (!closestBreakpoint) {
      return sortedBreakpoints[sortedBreakpoints.length - 1];
    }

    return closestBreakpoint;
  };

  // useLayoutEffect(() => {
  //   containerRef.current &&
  //     setDimensions(containerRef.current.getBoundingClientRect());
  // }, []);

  useLayoutEffect(() => {
    const observeTarget = containerRef.current;
    if (!observeTarget) return;

    const observerCallback = (entries) => {
      window.requestAnimationFrame(() => {
        for (let entry of entries) {
          const { width } = entry.contentRect;

          setDimensions({
            width: width / slidesToShow,
          });

          if (breakpoints && width <= findClosestBreakpoint(width).breakpoint) {
            setDimensions({
              width: width / findClosestBreakpoint(width).settings.slidesToShow,
            });
          }
        }
      });
    };

    const resizeObserver = new ResizeObserver(observerCallback);
    resizeObserver.observe(observeTarget);

    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [containerRef, slidesToShow, setDimensions, breakpoints]);

  return { dimensions };
};

export default useResponsiveDimensions;
