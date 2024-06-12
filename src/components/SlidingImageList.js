import React, { useState, useRef } from "react";
import useSlidingWindowScroll from "../hooks/useObserver";
import { useVerticalScroll } from "../hooks/useHorizontalScroll";
import useResponsiveDimensions from "../hooks/useResponsiveDimensions";
import useBlurOnScroll from "../hooks/useBlurOnScroll";
import ImageItem from "./imageItem";

const SlidingImageList = ({ list, ContainerHeight, config }) => {
  const THRESHOLD = 15;
  const containerRef = useRef(null);
  const [lastIndex, setLastIndex] = useState(0);

  const { range, topElement, bottomElement } = useSlidingWindowScroll(
    list,
    lastIndex,
    setLastIndex,
    THRESHOLD,
    containerRef
  );

  const { dimensions } = useResponsiveDimensions(containerRef, config);

  useVerticalScroll(containerRef, lastIndex, setLastIndex, list.length);

  useBlurOnScroll(containerRef, 0.5);

  const { start, end } = range;

  const updatedList = list?.slice(start, end + 1);
  const lastIndexOfArr = updatedList.length - 1;

  const getReference = (index, isLastIndex) => {
    if (index === 0) return topElement;
    if (isLastIndex) return bottomElement;
    return null;
  };

  return (
    <>
      {updatedList?.length > 0 && (
        <div
          className="gallery"
          style={{
            height: `${ContainerHeight}px`,
          }}
        >
          <ul
            className="gallery-container"
            style={{
              position: "relative",
            }}
            ref={containerRef}
          >
            {updatedList.map((item, index) => {
              const ref = getReference(index, index === lastIndexOfArr);
              return (
                <ImageItem
                  start={start}
                  index={index}
                  updatedList={updatedList}
                  refImg={ref}
                  dimensions={dimensions}
                  item={item}
                  key={item.id}
                />
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default SlidingImageList;
