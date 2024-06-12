import { useEffect } from "react";

const useBlurOnScroll = (containerRef, blurThreshold = 0.5) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(".gallery-container-item");

    const observerOptions = {
      root: container,
      threshold: blurThreshold,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio < blurThreshold) {
          entry.target.classList.add("blurred");
        } else {
          entry.target.classList.remove("blurred");
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    items.forEach((item) => observer.observe(item));

    return () => {
      items.forEach((item) => observer.unobserve(item));
    };
  }, [containerRef, blurThreshold]);
};
export default useBlurOnScroll;
