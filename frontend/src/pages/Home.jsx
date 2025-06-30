import React from "react";
import Navbar from "../navbar/Navbar";
import Sec1 from "../components/Sec1";
import Designs from "../components/Designs";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

function Home() {
  return (
    <div className=" overflow-hidden">
      <Navbar />
      <Hero />
      <Sec1 />
      <Designs />
      <Footer />
    </div>
  );
}

export default Home;
