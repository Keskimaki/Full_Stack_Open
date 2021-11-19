import React from "react";
import { CoursePart } from "../types";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => (
  <div>
    {courseParts.map(coursePart => 
      <Part key={coursePart.name} coursePart={coursePart} />
    )}
  </div>
);

const Part = ( {coursePart}: { coursePart: CoursePart} ) => {
  switch (coursePart.type) {
    case "normal":
      return (
        <p>
          <strong>{coursePart.name} {coursePart.exerciseCount}</strong> <br />
          <em>{coursePart.description}</em>
        </p>
      )
    case "groupProject":
      return (
        <p>
          <strong>{coursePart.name} {coursePart.exerciseCount}</strong> <br />
          project exercises {coursePart.groupProjectCount}
        </p>
      )
    case "submission":
      return (
        <p>
          <strong>{coursePart.name} {coursePart.exerciseCount}</strong> <br />
          <em>{coursePart.description}</em> <br />
          submit to {coursePart.exerciseSubmissionLink}
        </p>
      )
    case "special":
      return (
        <p>
          <strong>{coursePart.name} {coursePart.exerciseCount}</strong> <br />
          <em>{coursePart.description}</em> <br />
          required skills: {coursePart.requirements.join(", ")}
        </p>
      )
  }
};

export default Content;