import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const stats = [
  { label: "Projects Completed", value: 120 },
  { label: "Ongoing Projects", value: 8 },
  { label: "Clients Helped", value: 75 },
  { label: "Total Projects", value: 128 },
];

const StatBox = ({ label, value, start }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startValue = 0;
    const duration = 1500;
    const increment = value / (duration / 10);

    const interval = setInterval(() => {
      startValue += increment;
      if (startValue >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(Math.floor(startValue));
      }
    }, 10);

    return () => clearInterval(interval);
  }, [start, value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md"
    >
      <div className="text-4xl font-bold text-blue-600">{count}</div>
      <p className="mt-2 text-lg text-gray-600 text-center">{label}</p>
    </motion.div>
  );
};

const FeaturedProduct = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <section ref={ref} className="w-full py-16 bg-gray-50 px-10 md:px-16">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Impact</h2>
        <p className="mt-4 text-gray-600 text-lg">
          Trusted by many, delivering excellence across projects and clients.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
        initial="hidden"
        animate={controls}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {stats.map((stat, index) => (
          <StatBox key={index} label={stat.label} value={stat.value} start={inView} />
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturedProduct;
