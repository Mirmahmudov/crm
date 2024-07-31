import React from "react";
import "./Home.css";

function Home({toast}) {
  const salom =()=>{
    toast.info("sasajjsajjkjkfjhfjhfdhjfhjdhjdf")
    toast.success("sasajjsajjkjkfjhfjhfdhjfhjdhjdf")
    toast.warn("sasajjsajjkjkfjhfjhfdhjfhjdhjdf")
    toast.error("sasajjsajjkjkfjhfjhfdhjfhjdhjdf")
    toast.info("sasajjsajjkjkfjhfjhfdhjfhjdhjdf")
    toast.info("sasajjsajjkjkfjhfjhfdhjfhjdhjdf")
  }
  return (
    <>
      <div className="home">
        <div className="homeContainer">
          <div className="widgets">
            {/* <AppointWidget /> */}

            <div className="breaker">
              <h1 onClick={salom} >home</h1>
            </div>
            {/* <TasksWidget /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
