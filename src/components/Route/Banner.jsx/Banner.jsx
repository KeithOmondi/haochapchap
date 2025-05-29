import React from "react";
import Slider from "react-slick";

// Example partner logos - replace with actual partner logo URLs
const partners = [
  "https://res.cloudinary.com/drls2cpnu/image/upload/v1748350947/Hao_Chapchap_logo_h88a00.png",
  "https://via.placeholder.com/150x80?text=Partner+2",
  "https://via.placeholder.com/150x80?text=Partner+3",
  "https://via.placeholder.com/150x80?text=Partner+4",
  "https://via.placeholder.com/150x80?text=Partner+5",
  "https://via.placeholder.com/150x80?text=Partner+6",
];

const PartnersCarousel = () => {
  const settings = {
    infinite: true,
    speed: 3000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Our Trusted Partners</h2>
      <Slider {...settings}>
        {partners.map((logo, index) => (
          <div key={index} className="flex items-center justify-center">
            <img
              src={logo}
              alt={`Partner ${index + 1}`}
              className="h-20 object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default PartnersCarousel;
