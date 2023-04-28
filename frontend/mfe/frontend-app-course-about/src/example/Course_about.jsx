
import React, { useState, useEffect } from "react";
import { Button, Container, Col, Carousel } from "@edx/paragon";

import Row from "react-bootstrap/Row";
import axios from "axios";
import TabItemComponent from "./TabItem";

import { getConfig } from "@edx/frontend-platform";
import { useParams } from "react-router";

import TabsComponent from "./Tabs";

const tabItems = [
  {
    id: 1,
    title: "About",
    section_class: "about",
  },
  {
    id: 2,
    title: "info",
    section_class: "content",
  },
  {
    id: 3,
    title: "Syllabus",
    section_class: "prerequisites",
  },
  {
    id: 4,
    title: "Instructors",
    section_class: "course-staff",
  },
  {
    id: 5,
    title: "FAQs",
    section_class: "faqs",
  },
];

const About = () => {
  const params = useParams();
  const [data, setData] = useState(null);
  const [courseDetails, setCourseDetails] = useState(null);
  const [active, setActive] = useState(1);

  const Course =
    getConfig().LMS_BASE_URL + "/api/courses/v1/courses/" + "course-v1:test+test01+test2023";

  const Enrolment =
    getConfig().LMS_BASE_URL + "/api/enrollment/v1/course/" + "course-v1:test+test01+test2023";

  const update_data = async function () {
    const [firstResponse, secondResponse] = await Promise.all([
      axios.get(Course),
      axios.get(Enrolment),
    ]);
    console.log(firstResponse.data)
    setData(firstResponse.data);

    setCourseDetails(secondResponse.data);
  };
  useEffect(() => {
    update_data();
  }, []);

  let date = (str) => {
    let unformatData = new Date(str);
    const options = {
      day: "numeric",
      month: "short",
    };
    return unformatData.toLocaleDateString("en-US", options);
  };

  const toggleButtons = document.querySelectorAll('.toggle-button');

  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const answer = button.parentElement.nextElementSibling;
      answer.classList.toggle('show-answer');
      button.textContent = answer.classList.contains('show-answer') ? '-' : '+';
    });
  });

  //customers section

  const carousel = document.querySelector(".carousel");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  const cards = document.querySelectorAll(".card");
  
  if(cards & leftArrow & rightArrow & carousel){
    let cardWidth = cards[0].offsetWidth;
    let cardMarginRight = parseInt(window.getComputedStyle(cards[0]).marginRight);
    let cardCount = cards.length;
    let carouselWidth = (cardWidth + cardMarginRight) * cardCount - cardMarginRight;
    
    carousel.style.width = `${carouselWidth}px`;
    
    rightArrow.addEventListener("click", () => {
      let currentScrollPosition = carousel.scrollLeft;
      let newScrollPosition = currentScrollPosition + cardWidth + cardMarginRight;
      if (newScrollPosition < carouselWidth) {
        carousel.scroll({
          left: newScrollPosition,
          behavior: "smooth"
        });
      } else {
        carousel.scroll({
          left: carouselWidth,
          behavior: "smooth"
        });
      }
    });
    
    leftArrow.addEventListener("click", () => {
      let currentScrollPosition = carousel.scrollLeft;
      let newScrollPosition = currentScrollPosition - cardWidth - cardMarginRight;
      if (newScrollPosition > 0) {
        carousel.scroll({
          left: newScrollPosition,
          behavior: "smooth"
        });
      } else {
        carousel.scroll({
          left: 0,
          behavior: "smooth"
        });
      }
    });
  }

  return (
    <main>
    <Container className="py-5">
      <div className="white-continer-claim">
        <div className="wrapper-continer wrapper">
          <div>
            <span> {data?.org}</span>
            <h2>{data?.name}</h2>
          </div>
          <div>{data?.short_description} </div>
        </div>
        <div className="">
          <div className="course-info-banner">
            <span className="info-tab">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
              </svg>
              <div className="text-block">
                <strong className="text-block-header"> +/-2 months</strong>
                <br />
                <strong className="text-block-footer">2-4h per week</strong>
              </div>
            </span>
            <span className="info-tab">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-cup-hot" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M.5 6a.5.5 0 0 0-.488.608l1.652 7.434A2.5 2.5 0 0 0 4.104 16h5.792a2.5 2.5 0 0 0 2.44-1.958l.131-.59a3 3 0 0 0 1.3-5.854l.221-.99A.5.5 0 0 0 13.5 6H.5ZM13 12.5a2.01 2.01 0 0 1-.316-.025l.867-3.898A2.001 2.001 0 0 1 13 12.5ZM2.64 13.825 1.123 7h11.754l-1.517 6.825A1.5 1.5 0 0 1 9.896 15H4.104a1.5 1.5 0 0 1-1.464-1.175Z"/>
                <path d="m4.4.8-.003.004-.014.019a4.167 4.167 0 0 0-.204.31 2.327 2.327 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.593.593 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3.31 3.31 0 0 1-.202.388 5.444 5.444 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 3.6 4.2l.003-.004.014-.019a4.149 4.149 0 0 0 .204-.31 2.06 2.06 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.593.593 0 0 0-.09-.252A4.334 4.334 0 0 0 3.6 2.8l-.01-.012a5.099 5.099 0 0 1-.37-.543A1.53 1.53 0 0 1 3 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a5.446 5.446 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 4.4.8Zm3 0-.003.004-.014.019a4.167 4.167 0 0 0-.204.31 2.327 2.327 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.593.593 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3.31 3.31 0 0 1-.202.388 5.444 5.444 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 6.6 4.2l.003-.004.014-.019a4.149 4.149 0 0 0 .204-.31 2.06 2.06 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.593.593 0 0 0-.09-.252A4.334 4.334 0 0 0 6.6 2.8l-.01-.012a5.099 5.099 0 0 1-.37-.543A1.53 1.53 0 0 1 6 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a5.446 5.446 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 7.4.8Zm3 0-.003.004-.014.019a4.077 4.077 0 0 0-.204.31 2.337 2.337 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.593.593 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3.198 3.198 0 0 1-.202.388 5.385 5.385 0 0 1-.252.382l-.019.025-.005.008-.002.002A.5.5 0 0 1 9.6 4.2l.003-.004.014-.019a4.149 4.149 0 0 0 .204-.31 2.06 2.06 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.593.593 0 0 0-.09-.252A4.334 4.334 0 0 0 9.6 2.8l-.01-.012a5.099 5.099 0 0 1-.37-.543A1.53 1.53 0 0 1 9 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a5.446 5.446 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 10.4.8Z"/>
              </svg>
              <div className="text-block">
                <strong className="text-block-header">Self-placed</strong>
                <br />
                <strong className="text-block-footer">Go at your own speed</strong>
              </div>
            </span>
            <span>
              {courseDetails?.course_modes[0].min_price == 0 ? (
                <span className="info-tab">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-award" viewBox="0 0 16 16">
                    <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z"/>
                    <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
                  </svg>
                  <div className="text-block">
                    <strong className="text-block-header">Free!</strong>
                    <br />
                    <strong className="text-block-footer">100% free course</strong>
                  </div>
                </span>
              ) : (
                courseDetails?.course_modes[0].min_price +
                courseDetails?.course_modes[0].currency
              )}
            </span>
            <span className="info-tab">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-display" viewBox="0 0 16 16">
                <path d="M0 4s0-2 2-2h12s2 0 2 2v6s0 2-2 2h-4c0 .667.083 1.167.25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75c.167-.333.25-.833.25-1.5H2s-2 0-2-2V4zm1.398-.855a.758.758 0 0 0-.254.302A1.46 1.46 0 0 0 1 4.01V10c0 .325.078.502.145.602.07.105.17.188.302.254a1.464 1.464 0 0 0 .538.143L2.01 11H14c.325 0 .502-.078.602-.145a.758.758 0 0 0 .254-.302 1.464 1.464 0 0 0 .143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.757.757 0 0 0-.302-.254A1.46 1.46 0 0 0 13.99 3H2c-.325 0-.502.078-.602.145z"/>
              </svg>
              <div className="text-block">
                <strong className="text-block-header">Start: {date(data?.start)}</strong>
                <br />
                <strong className="text-block-footer">End: {date(data?.end)}</strong>
              </div>
            </span>
            <Button className="">Enroll</Button>
          </div>
          <div>
            <img
              className="course-image"
              src={data?.media.image.large}
              alt={data?.course_name}
            />
          </div>
          <div className="course-info-banner2">
            <div className="tabs">
              {tabItems.map(({ id, title }) => (
                <TabItemComponent
                  key={title}
                  title={title}
                  onItemClicked={() => setActive(id)}
                  isActive={active === id}
                />
              ))}
            </div>
            <div className="tabs">
              <Button className="tab-item enroll-button">
                {" "}
                Enroll now <br /> Starts {date(data?.start)}
              </Button>
            </div>
          </div>

          <div className="content wrapper-continer">
            {tabItems.map(({ id, section_class }) => {
              return active === id ? (
                <div
                  key={id}
                  className={`about-course-tabs ${section_class}`}
                  dangerouslySetInnerHTML={{ __html: data?.overview }}
                ></div>
              ) : (
                ""
              );
            })}
            </div>
            <img class="course-image" src="http://local.overhang.io:8000/asset-v1:test+test01+2023+type@asset+block@photo-1515378960530-7c0da6231fb1.jpeg"></img>
            <div className="content wrapper-continer">
            <h2>Happy Students</h2>
            <div className="about-course-tabs">
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-25"
                    src="https://pic.onlinewebfonts.com/svg/img_237553.png"
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h3>Michael Jones</h3>
                    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-25"
                    src="https://pic.onlinewebfonts.com/svg/img_237553.png"
                    alt="Third slide"
                  />

                  <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-25"
                    src="https://pic.onlinewebfonts.com/svg/img_237553.png"
                    alt="Third slide"
                  />

                  <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      </Container>
    </main>
  );
};

export default About;