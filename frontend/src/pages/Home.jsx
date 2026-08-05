import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Home.css";

function Home() {
  return (
    <>
      <Navbar />

      <div className="home-container">
        <h1>Student Management System</h1>

        <p>
          Manage student records efficiently using our Student Management
          System.
        </p>

        <Link to="/students">
          <button className="view-btn">View Students</button>
        </Link>
      </div>
    </>
  );
}

export default Home;