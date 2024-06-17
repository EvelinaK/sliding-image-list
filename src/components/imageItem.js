import React from "react";
import "../App.css";

export default function ImageItem({
  start,
  index,
  updatedList,
  refImg,
  dimensions,
  item,
}) {
  const lastIndexOfArr = updatedList.length - 1;
  const left = `${dimensions?.width * (index + start)}px`;
  const id = index === 0 ? "top" : index === lastIndexOfArr ? "bottom" : "";

  return (
    <li
      className="gallery-container-item"
      style={{
        position: "absolute",
        left,
        display: "flex",
        flexDirection: "column",
        width: `${dimensions?.width - 20}px`,
      }}
      ref={refImg}
      id={id}
      data-index={start + index}
    >
      <div className="gallery-img-overlay"></div>
      <img
        src={item?.url || item?.src}
        alt={item?.alt_description}
        loading={"lazy"}
      />

      {item.index}
    </li>
  );
}
