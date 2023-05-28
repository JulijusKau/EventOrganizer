import detectiveImage from "../assets/detectiveImage.png";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <div
      style={{
        margin: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "black",
      }}
    >
      <img
        src={detectiveImage}
        style={{ width: "300px", paddingBottom: "50px" }}
        alt="sinking boat"
      />
      <h2
        style={{ color: "white", fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        Are you sure you will find something here?
      </h2>
      <h4
        style={{ color: "white", fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        Don't worry, we've got your{" "}
        <Link
          style={{
            color: "white",
            fontWeight: "700",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
          to="/"
        >
          BACK
        </Link>
      </h4>
    </div>
  );
};
