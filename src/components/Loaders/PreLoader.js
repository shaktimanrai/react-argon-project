import React from "react";
import { Image } from "@themesberg/react-bootstrap";

// import ReactLogo from "../assets/img/technologies/react-logo-transparent.svg";
import ReactLogo from "../../assets/scales.svg";

const PreLoader = (props) => {
  return (
    // <div
    //   //   className={`preloader bg-soft flex-column justify-content-center align-items-center ${
    //   //     show ? "" : "show"
    //   //   }`}
    //   className="justify-content-center align-items-center"
    // >
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        // className="loader-element animate__animated animate__jackInTheBox"
        src={ReactLogo}
        height={50}
      />
    </div>
  );
};

export default PreLoader;
