import React from "react";

// @ts-ignore
import file from "&assets/documents/jihad-al-khurfan-resume.pdf";

export function Resume() {
  return (
    <div style={{ height: "100vh" }}>
      <iframe src={file} title="resume" height="100%" width="100%" />
    </div>
  );
}
