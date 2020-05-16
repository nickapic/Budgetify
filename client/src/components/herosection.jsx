import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ReactComponent as HeroSVG } from "../assets/hero.svg";

export const HeroSection = () => {
  useEffect(() => {
    document.body.className += "js-loading";
    window.addEventListener("load", showPage, false);

    function showPage() {
      document.body.className = document.body.className.replace(
        "js-loading",
        ""
      );
    }
  }, []);
  return (
    <div className="un-authorised-main-container">
      <div className="hero-section">
        <div className="hero-section-right">
          <h2 className="hero-section-heading">
            A Simple Budget manager application
          </h2>
          <p className="hero-section-paragraph">
            Budgetify provides very easy to use Interface for people to track
            where there money is being spent it and track their monthly expenses
            with ease.
          </p>
          <a className="hero-section-btn" href="#aboutus">
            Learn more <i className="fas fa-arrow-right"></i>
          </a>
        </div>
        <div className="hero-section-left">
          <HeroSVG width="100%" />
        </div>
      </div>
      <div className="about-section-container" id="aboutus">
        <div className="about-section-right">
          <div className="about-section-content">
            <h3 className="about-section-headline">What Budgetify Does ?</h3>
            <p className="about-section-paragraph">
              Budgetify provides very easy to use interface for people to track
              where there money is being spent .It can track their monthly
              expenses with ease.
            </p>
          </div>
          <div className="about-section-content">
            <h3 className="about-section-headline">
              Frequently Asked Questions{" "}
            </h3>
            <p className="about-section-paragraph">
              <span className="question">
                Is Budgetify a open source Project?
              </span>
              <br />
              <br />
              Yes Budgetify is a open source project.The code for the project
              can be accessed on my Github Page.
            </p>
            <p className="about-section-paragraph">
              <span className="question">
                Can i set a default Value for my Balance without adding it to my
                Income?
              </span>
              <br />
              <br />
              Yes , All the calculations will be done with that in mind and the
              Initial Value wont be added to your Income Calculations.
            </p>
            <p className="about-section-paragraph">
              <span className="question">
                Are Recurring Payments supported?
              </span>
              <br />
              <br />
              Not yet , But they will be implemented super soon.
            </p>
          </div>
        </div>
        <div className="about-section-left">
          <div className="about-section-content">
            <h3 className="about-section-headline">
              What Features does Budgetify have?
            </h3>
            <p className="about-section-paragraph">
              Budgetify as of now provides basic functionality like adding
              Income and Expenses.Searching for past Income and Expenses and
              more features like Monthly, Quaterly Tracking, Categorization,
              Recurring Payments and Graphs on the way.
            </p>
          </div>
          <div className="about-section-content">
            <h3 className="about-section-headline">
              Have any Suggestions ? Feel Free to tell us about it.
            </h3>
            <form action="" className="form-hero-section">
              <label className="form-label" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="form-hero-section-input"
                placeholder="Your Name Here"
                required
              />
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-hero-section-input"
                placeholder="Your Email Here"
                required
              />
              <label className="form-label" htmlFor="subject">
                Your message
              </label>
              <textarea
                name="subject"
                id="subject"
                className="form-hero-section-textarea"
                placeholder="Your message here"
                cols="70"
                rows="10"
                required
                res
              ></textarea>
              <input
                type="submit"
                className="form-hero-section-submit"
                value="Submit"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
