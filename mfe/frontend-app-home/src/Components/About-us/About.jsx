import React from "react";
import { Button } from "@edx/paragon";
import { getConfig } from "@edx/frontend-platform";
import { Container } from "@edx/paragon";

const AboutUS = (data) => {
  return (
    <>
      <div className="gray-continer">
        <Container className="wrapper-continer">
          <h2>What we do</h2>
          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi.
          </p>
          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis
            est et expedita distinctio. Nam libero tempore, cum soluta nobis.
          </p>
          <a className="view-more" href={getConfig().LMS_BASE_URL + "/about"}>
          <Button.Deprecated className="btn-success explore-btn">Learn more</Button.Deprecated>
          </a>
        </Container>
      </div>
    </>
  );
};

export default AboutUS;