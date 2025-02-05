import React /*,{ useState }*/ from "react";
import "../App.css";

function AboutPage({ navigateTo }) {
  return (
    <>
      <div className="page">
        <div className="dialog">
          <div className="centered-text-box">Developed by Dakota Mumford</div>
          <button onClick={() => navigateTo("homepage")}>home</button>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
