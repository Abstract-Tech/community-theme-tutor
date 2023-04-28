import { Button } from "@edx/paragon";
import React, { useState } from "react";
import TabItemComponent from "./TabItem";

const tabItems = [
  {
    id: 1,
    title: "About",
    class: "about",
  },
  {
    id: 2,
    title: "Course info",
    content: "step 2 content",
  },
  {
    id: 3,
    title: "Syllabus",
    content: "prerequisites",
  },
  {
    id: 4,
    title: "Instructors",
    content: "course-staff",
  },
  {
    id: 5,
    title: "FAQs",
    content: "faq",
  },
];

const TabsComponent = () => {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="tabs">
        {tabItems.map(({ id, icon, title }) => (
          <TabItemComponent
            key={title}
            icon={icon}
            title={title}
            onItemClicked={() => setActive(id)}
            isActive={active === id}
          />
        ))}
      </div>
      <div className="content">
        {tabItems.map(({ id, content }) => {
          return active === id ? content : "";
        })}
      </div>
    </div>
  );
};

export default TabsComponent;