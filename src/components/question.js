import React from "react";

export default function Question (props) {
  function decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }
  return (
    <div className="question">
      {decodeHtml(props.question)}
    </div>
  )
}