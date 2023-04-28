import React, { useState, useEffect } from "react";
import { Button, Container, Col } from "@edx/paragon";
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
    section_class: "faq",
  },
];

const About = () => {
  const params = useParams();
  const [data, setData] = useState(null);
  const [courseDetails, setCourseDetails] = useState(null);
  const [active, setActive] = useState(1);

  const Course =
    getConfig().LMS_BASE_URL + "/api/courses/v1/courses/" + params.courseId;

  const Enrolment =
    getConfig().LMS_BASE_URL + "/api/enrollment/v1/course/" + params.courseId;

  const update_data = async function () {
    const [firstResponse, secondResponse] = await Promise.all([
      axios.get(Course),
      axios.get(Enrolment),
    ]);

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

  return (
    <main>
      <div className="white-continer-claim">
        <div className="wrapper-continer wrapper">
          <div>
            <span> {data?.org}</span>
            <h2>{data?.name}</h2>
          </div>
          <div>{data?.short_description} </div>
        </div>
        <div className="wrapper-continer">
          <div className="course-info-banner">
            <span>
              <strong> +/-2 months 2-4h</strong>
              <br />
              per week
            </span>
            <span>
              <strong> Self-paced</strong>
              <br />
              Go at your own speed
            </span>
            <span>
              {courseDetails?.course_modes[0].min_price == 0 ? (
                <span>
                  <strong>Free!</strong> <br /> 100% free course
                </span>
              ) : (
                courseDetails?.course_modes[0].min_price +
                courseDetails?.course_modes[0].currency
              )}
            </span>

            <span>
              Start: {date(data?.start)}
              <br />
              End: {date(data?.end)}
            </span>
            <Button className="enroll-button">Enroll</Button>
          </div>
          <div>
            <img
              className="course-image"
              src={data?.media.image.large}
              alt={data?.course_name}
            />
          </div>
          <div className="tabs-container">
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
            <div>
              <Button className="enroll-button">
                {" "}
                Enroll now <br /> Starts {date(data?.start)}
              </Button>
            </div>
          </div>

          <div className="content">
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
        </div>
      </div>
    </main>
  );
};

export default About;