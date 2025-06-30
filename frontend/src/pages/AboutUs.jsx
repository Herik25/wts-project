import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../components/Footer";

function AboutUs() {
  return (
    <div className=" font-Montserrat">
      <Navbar />
      <div className=" mx-2 md:mx-8 lg:mx-32 xl:mx-48 mb-20">
        <h1 className="text-5xl opacity-80 font-bold tracking-tight text-gray-900 pb-2 mt-24">
          Our Story
        </h1>
        <div className="h-[2px] w-[100px] bg-yellow-400 my-1"></div>
      </div>
      <div className=" mx-2 md:mx-8 lg:mx-32 xl:mx-48">
        <div className=" flex flex-col md:flex-row mb-52">
          <img
            src="https://images.bewakoof.com/uploads/campaign/our-story-1501569294.png"
            alt="aboutdoddle"
          />
          <div className=" flex flex-col mt-6 ml-4 md:mt-0 md:ml-44 w-screen">
            <span className=" text-2xl">
              Our story starts with the name
              <br />{" "}
              <b className=" relative font-Montserrat">
                Syn
                <sup className=" absolute text-[10px] translate-y-[13px] translate-x-[2px]">
                  ®
                </sup>{" "}
                &nbsp;
              </b>
              .
            </span>
            <span className=" font-serif text-lg mt-6">
              Society perceives Syn as stupid. But what does society call Syn?
              Often, it’s anything different or anything that’s done
              differently.
            </span>
            <span className=" font-serif text-lg mt-6">
              Often when people have done the right thing, without caring about
              what society thinks, they have been called Syn. These are the
              people who have changed the world and made it a better place.
            </span>
          </div>
        </div>
      </div>
      <div className=" w-[110%] bg-black h-[550px] flex items-center justify-center md:w-full">
        <div className=" text-white text-5xl text-center max-w-5xl font-serif">
          Making an impact through{" "}
          <b className=" font-Montserrat">innovation</b>,{" "}
          <b className=" font-Montserrat">honesty</b>, and{" "}
          <b className=" font-Montserrat">thoughtfulness</b>
        </div>
      </div>
      <div className=" mx-2 md:mx-8 lg:mx-32 xl:mx-48">
        <div className=" flex flex-col items-center mt-20 mb-36">
          <div className=" flex flex-col">
            <span className=" text-2xl">
              For us, Syn is the spirit of looking at things differently.
            </span>
            <span className=" text-xl font-serif mt-10">
              Trying new things even when success is not guaranteed.
              <br />
              Not stepping on others to get ahead.
              <br />
              Thinking about the benefit of others just as you’d think about
              your own.
            </span>
            <span className=" text-xl font-serif mt-16">
              <span className=" relative">
                This was the spirit on which Syn
                <sup className=" absolute text-[8px] translate-y-[10px] translate-x-[2px]">
                  ®
                </sup>{" "}
                &nbsp;was founded in 2012.
              </span>
              <br />
              With the belief that a business cannot be about financial gain
              alone.
            </span>
            <span className=" text-2xl font-serif mt-16">
              <span className=" relative">
                It is about making a positive impact. That’s what Syn
                <sup className=" absolute text-[8px] translate-y-[10px] translate-x-[2px]">
                  ®
                </sup>{" "}
                &nbsp; is about.
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className=" w-[110%] md:w-full">
        <img
          className=" w-full min-h-[250px]"
          src="https://images.bewakoof.com/uploads/campaign/our-story-innovation-1501593008.png?tr=q-90"
          alt="image"
        />
      </div>
      <div className=" mx-52">
        <div className=" flex flex-col items-center mt-16 mb-28">
          <div className=" flex flex-col">
            <span className=" text-xl font-serif mt-16">
              <span className=" relative font-Montserrat font-bold text-2xl">
                Syn
                <sup className=" absolute text-[8px] translate-y-[10px] translate-x-[2px]">
                  ®
                </sup>{" "}
                &nbsp;<span className=" font-medium font-serif">is</span>
              </span>
            </span>
            <span className=" font-serif text-5xl mt-6">
              Distinctive fashion
              <br />
              for the{" "}
              <span className=" font-Montserrat font-bold">
                contemporary Indian
              </span>
            </span>
            <span className=" font-serif text-2xl mt-8">
              with{" "}
              <span className=" font-bold font-Montserrat">
                In-house capabilities
              </span>{" "}
              in design, manufacturing, technology, data
              <br /> science, and marketing
            </span>
          </div>
        </div>
      </div>
      <div className="bg-[#fafafa] w-[110%] md:w-full">
        <div className=" mx-2 md:mx-8 lg:mx-32 xl:mx-48">
          <div className="grid grid-cols-4 py-28 text-center">
            <div className=" flex flex-col">
              <div className=" font-Montserrat text-xl sm:2xl: md:3xl lg:text-4xl xl:text5xl font-bold">
                7 years
              </div>
              <div className=" font-serif text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-2">
                of journey so far
              </div>
            </div>
            <div className=" flex flex-col">
              <div className=" font-Montserrat text-xl sm:2xl: md:3xl lg:text-4xl xl:text5xl font-bold">
                250+
              </div>
              <div className=" font-serif text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-2">
                team-members
              </div>
            </div>
            <div className=" flex flex-col">
              <div className=" font-Montserrat text-xl sm:2xl: md:3xl lg:text-4xl xl:text5xl font-bold">
                1 Crore+
              </div>
              <div className=" font-serif text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-2">
                products sold!
              </div>
            </div>
            <div className=" flex flex-col">
              <div className=" font-Montserrat text-xl sm:2xl: md:3xl lg:text-4xl xl:text5xl font-bold">
                60 Lakh+
              </div>
              <div className=" font-serif text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-2">
                app downloads
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#fdd634] w-[110%] md:w-full">
        <div className="mx-2 md:mx-8 lg:mx-32 xl:mx-48 pt-28 pb-10">
          <div className=" text-5xl font-serif text-center">
            <span>
              What makes us{" "}
              <span className=" font-Montserrat">
                Syn <sup>®</sup>
              </span>
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1 md:7 py-28 text-center">
            <div className=" flex flex-col">
              <div className=" font-Montserrat text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold">
                Innovative design
              </div>
              <div className=" font-serif text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-6">
                Creating designs that are an extension of you.
              </div>
            </div>
            <div className=" flex flex-col">
              <div className=" font-Montserrat text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold">
                Direct to consumer model
              </div>
              <div className=" font-serif text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-6">
                Bringing accessibility and value to everyday fashion.
              </div>
            </div>
            <div className=" flex flex-col">
              <div className=" font-Montserrat text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold">
                Homegrown
              </div>
              <div className=" font-serif text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-6">
                Imagined in India, Made in India.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[110%] md:w-full">
        <Footer />
      </div>
    </div>
  );
}

export default AboutUs;
