import React from "react";
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="text-teal-600 dark:text-teal-300 flex">
              <img className=" h-10 mr-2" src="/logo-bg.png" />
              <div className="font-BungeeSpice text-4xl mt-0 pl-2 translate-y-[1px]">
                SYN
              </div>
            </div>

            <p className="mt-4 max-w-xs text-gray-500 dark:text-gray-400">
              I am Harsh Parmar, The Developer of this site.If you want to
              Contact me then choose any of this Links.
            </p>

            <ul className="mt-8 flex gap-6">
              <li>
                <Link
                  to="https://www.instagram.com/darksoul_5052/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                >
                  <span className="sr-only">Instagram</span>
                  <BsInstagram className=" text-2xl" />
                </Link>
              </li>

              <li>
                <Link
                  to="https://twitter.com/Darksoul5052"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                >
                  <span className="sr-only">Twitter</span>
                  <BsTwitter className=" text-2xl" />
                </Link>
              </li>

              <li>
                <Link
                  to="https://github.com/herik25"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                >
                  <span className="sr-only">GitHub</span>
                  <BsGithub className=" text-2xl" />
                </Link>
              </li>

              <li>
                <Link
                  to="https://linkedin.com/in/parmar-harsh-5a7361221"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                >
                  <span className="sr-only">LinkedIn</span>

                  <BsLinkedin className=" text-2xl" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Customer Services
              </p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    Contact Us
                  </Link>
                </li>

                <li>
                  <Link
                    to="/"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    Track Order
                  </Link>
                </li>

                <li>
                  <Link
                    to="/"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    Return Order
                  </Link>
                </li>

                <li>
                  <Link
                    to="/"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    Cancle Order
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Company
              </p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    to="/aboutus"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    Privicy Policy
                  </Link>
                </li>

                <li>
                  <Link
                    to="/terms"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Helpful Links
              </p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    Talk with us
                  </Link>
                </li>

                <li>
                  <Link
                    to="#"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    FAQs
                  </Link>
                </li>

                <li>
                  <Link
                    to="#"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    Suggesitions
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900 dark:text-white">Legal</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    Accessibility
                  </Link>
                </li>

                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    Returns Policy
                  </Link>
                </li>

                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          &copy; 2023. Parmar Harsh. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
