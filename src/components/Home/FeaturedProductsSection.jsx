import { useEffect, useState } from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import {
  bannerImg1,
  bannerImg2,
  bannerImg3,
  bannerImg4,
  bannerImg5,
} from "../../assets/images";

const featuredProductsImages = [
  bannerImg1,
  bannerImg2,
  bannerImg3,
  bannerImg4,
  bannerImg5,
];

const FeaturedProductsSection = () => {
  const [slideImagePosition, setSlideImagePosition] = useState(0);

  const handlePrevProductClick = () => {
    setSlideImagePosition((prevPosition) =>
      prevPosition === 0
        ? -(featuredProductsImages.length - 1)
        : prevPosition + 1
    );
  };

  const handleNextProductClick = () => {
    setSlideImagePosition((prevPosition) =>
      prevPosition === -(featuredProductsImages.length - 1)
        ? 0
        : prevPosition - 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextProductClick();
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <section name="hero-featured" className="h-max relative">
        <div name="slider-container" className="overflow-hidden">
          <div
            name="slider"
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(${slideImagePosition * 100}%)`,
            }}
          >
            {featuredProductsImages.map((image, index) => (
              <div name="slides" key={index} className="min-w-[100%]">
                <img src={image} alt="featured-product-image" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex h-[50%] absolute left-0 right-0 top-0 text-white justify-between ">
          <button
            className="md:px-2 flex items-center rounded-[5px] justify-center cursor-pointer"
            onClick={handlePrevProductClick}
          >
            <NavigateBeforeIcon
              style={{
                fontSize: "2rem",
              }}
            />
          </button>
          <button
            className="md:px-2 flex items-center justify-center rounded-[5px] cursor-pointer"
            onClick={handleNextProductClick}
          >
            <NavigateNextIcon
              style={{
                fontSize: "2rem",
              }}
            />
          </button>
        </div>
      </section>
    </>
  );
};

export default FeaturedProductsSection;
