import { useEffect } from "react";

export function useVerticalScroll(
  elRef,
  lastIndex,
  setActiveIndex,
  extendedImagesLength
) {
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const wheelListener = (e) => {
        e.preventDefault();

        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
        });
      };
      el.addEventListener("wheel", wheelListener);
      return () => el.removeEventListener("wheel", wheelListener);
    }
  }, [lastIndex, extendedImagesLength, elRef, setActiveIndex]);

  useEffect(() => {
    if (Number(lastIndex) === extendedImagesLength - 1) {
      const element = elRef.current;
      if (element) {
        element.scrollLeft = 0;
        setActiveIndex(0);
      }
    }
  }, [lastIndex, extendedImagesLength, elRef, setActiveIndex]);
}
