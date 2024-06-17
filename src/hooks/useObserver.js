/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useCallback } from "react";
import useResizeObserver from "./useResizeScrollObserver";
const useSlidingWindowScroll = (
  list,
  lastIndex,
  setLastIndex,
  THRESHOLD,
  containerRef
) => {
  const _THRESHOLD = list.length < THRESHOLD ? list.length : THRESHOLD;
  const [range, setRange] = useState({ start: 0, end: _THRESHOLD - 1 });
  const bottomElement = useRef(null);
  const topElement = useRef(null);
  const observer = useRef(null);
  // const { isScrollable } = useResizeObserver(containerRef);

  const resetObservation = useCallback(() => {
    if (observer.current) {
      if (bottomElement.current) {
        observer.current.unobserve(bottomElement.current);
      }
      if (topElement.current) {
        observer.current.unobserve(topElement.current);
      }
    }
  }, []);

  const updateState = useCallback(
    (newStart, newEnd) => {
      const { start, end } = range;
      if (start !== newStart || end !== newEnd) {
        resetObservation();

        setRange({ start: newStart, end: newEnd });
      }
    },
    [range, resetObservation]
  );

  const correctiveRangeCallback = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        const { start, end } = range;

        if (entry.isIntersecting && entry.target.id === "bottom") {
          const maxStartIndex = Math.max(list.length - _THRESHOLD, 0);
          const maxEndIndex = list.length - 1;

          const thresHoldOffset = Math.round(_THRESHOLD / 3);
          const newEnd = Math.min(
            end + _THRESHOLD - thresHoldOffset,
            maxEndIndex
          );

          const newStart = Math.min(end - thresHoldOffset, maxStartIndex);
          updateState(newStart, newEnd);

          if (
            Number(entry.target.attributes.getNamedItem("data-index").value) ===
            list.length - 1
          ) {
            setLastIndex(
              Number(entry.target.attributes.getNamedItem("data-index").value)
            );
            setRange({ start: 0, end: _THRESHOLD - 1 });
          }
        }

        if (entry.isIntersecting && entry.target.id === "top") {
          const newStart = Math.max(start - 10, 0);
          const newEnd = Math.max(end - _THRESHOLD - 1, _THRESHOLD - 1);

          updateState(newStart, newEnd);
        }
      });
    },
    [range, list.length, updateState, setLastIndex, lastIndex, setRange]
  );

  const initiateScrollObserver = useCallback(() => {
    // if (!isScrollable) {
    //   return;
    // }

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.99,
      // threshold: 1,
    };
    observer.current = new IntersectionObserver(
      correctiveRangeCallback,
      options
    );

    if (topElement.current) {
      observer.current.observe(topElement.current);
    }
    if (bottomElement.current) {
      observer.current.observe(bottomElement.current);
    }
  }, [correctiveRangeCallback]);

  useEffect(() => {
    initiateScrollObserver();
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [initiateScrollObserver, range]);

  return { range, topElement, bottomElement, lastIndex };
};

export default useSlidingWindowScroll;
