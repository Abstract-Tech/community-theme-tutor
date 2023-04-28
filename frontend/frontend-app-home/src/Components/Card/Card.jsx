import React, { useEffect, useMediaQuery } from "react";
import { Button } from "react-bootstrap";
import { Card, Hyperlink } from "@edx/paragon";
import { getConfig } from "@edx/frontend-platform";

const CourseCard = (data) => {
  useEffect(() => {
    console.log(data);
  });
  let date = (str) => {
    let unformatData = new Date(str);
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return unformatData.toLocaleDateString("en-US", options);
  };

  return (
    <>
      {/* <a className="card-link" href={"/courses/" + data.course_id + "/about"}>
        <div className="card pgn__card card">
          <div className="top-btn-container">
            <button type="button" className="cost-tag-btn btn btn-primary free">
              Free
            </button>
          </div>
          <div className="card-image pgn__card-wrapper-image-cap vertical">
            <img
              className="pgn__card-image-cap"
              src={data.media.image.large}
              alt="Card image"
            />
          </div>
          <div className="card-body">
            <div className="pgn__card-header">
              <span className="pgn__card-header-content">{data.org}</span>
            </div>
            <div className="pgn__card-section">
              <h3>{data.name}</h3>
            </div>
            <div className="pgn__card-footer vertical">
              <button type="button" className="date-btn btn btn-primary">
                Started: {date(data.start)}
              </button>
            </div>
          </div>
        </div>
      </a> */}
      <Hyperlink destination={"/courses/course-v1:"+ data.name +"/about"}>
      <Card isClickable>
      <div className="top-btn-container">
            <button type="button" className="cost-tag-btn btn btn-primary free">
              Free
            </button>
          </div>

        <Card.ImageCap
          style={{display: "block"}}
          src={data.media.image.large}
          srcAlt="Card image"
        />
        <div className="card-body">
        <div className="pgn__card-header">
              <span className="pgn__card-header-content">{data.org}</span>
          </div>
        <Card.Header title={data.name}/>
        <br/>
        <div className="pgn__card-footer vertical">
              <button type="button" className="date-btn btn btn-primary">
                Started: {date(data.start)}
              </button>
            </div>
        </div>    
      </Card>
    </Hyperlink>
    </>
  );
};

export default CourseCard;