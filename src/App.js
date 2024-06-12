import React from "react";
import "./App.css";
import SlidingImageList from "./components/SlidingImageList";

function App() {
  const exampleSlideData = [
    {
      index: 0,
      id: 0,
      headline: "New Fashion Apparel",
      button: "Shop now",
      src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/fashion.jpg",
    },
    {
      index: 1,
      id: 1,
      headline: "In The Wilderness",
      button: "Book travel",
      src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/forest.jpg",
    },
    {
      index: 2,
      id: 2,
      headline: "For Your Current Mood",
      button: "Listen",
      src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/guitar.jpg",
    },
    {
      index: 3,
      id: 3,
      headline: "Focus On The Writing",
      button: "Get Focused",
      src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/typewriter.jpg",
    },
    {
      index: 4,
      headline: "New Fashion Apparel",
      button: "Shop now",
      src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/fashion.jpg",
    },
    {
      index: 5,
      headline: "In The Wilderness",
      button: "Book travel",
      src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/forest.jpg",
    },
    {
      index: 6,
      headline: "For Your Current Mood",
      button: "Listen",
      src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/guitar.jpg",
    },
    {
      index: 7,
      headline: "Focus On The Writing",
      button: "Get Focused",
      src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/typewriter.jpg",
    },
    {
      index: 8,
      headline: "New Fashion Apparel",
      button: "Shop now",
      src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/fashion.jpg",
    },
    {
      index: 9,
      headline: "In The Wilderness",
      button: "Book travel",
      src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/forest.jpg",
    },
    {
      index: 10,
      src: "https://via.placeholder.com/300x200",
      width: 300,
      height: 200,
    },
    {
      index: 11,
      src: "https://via.placeholder.com/400x300",
      width: 400,
      height: 300,
    },
    {
      index: 12,
      src: "https://via.placeholder.com/600x400",
      width: 600,
      height: 400,
    },
    {
      index: 13,
      src: "https://via.placeholder.com/800x600",
      width: 800,
      height: 600,
    },
    {
      index: 14,
      src: "https://via.placeholder.com/200x300",
      width: 200,
      height: 300,
    },
    {
      index: 15,
      src: "https://via.placeholder.com/200x300",
      width: 200,
      height: 300,
    },
  ];

  const config = {
    slidesToShow: 3,
    breakpoints: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      // {
      //   breakpoint: 480,
      //   settings: {
      //     slidesToShow: 1,
      //     slidesToScroll: 1,
      //   },
      // },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="App">
      <div className="text">
        <div className="divider"></div>
        <div className="text-sibTitle">image slider</div>
        <div className="divider left-margin"></div>
      </div>
      <h1 className="heading">Sliding Infinite Scroll</h1>

      <SlidingImageList
        list={exampleSlideData}
        ContainerHeight={280}
        config={config}
      />
    </div>
  );
}

export default App;
