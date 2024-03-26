import { buildFeedbackPath, extractFeedback } from "../api/feedback/index";
import { useState } from "react";
import { Fragment } from "react";
export default function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState();

  function loadFeedbackHandler(id) {
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      });
  }
  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {/* pre configuring the onClick handler function with id
            first argument = the value of this property
            second argument = the value of first parameter
           */}
            {item.text}{" "}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export async function getStaticProps() {
  // You should not use fetch() for talking to your APIs,
  // Do it only while talking to external APIs like Firebase

  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
}
