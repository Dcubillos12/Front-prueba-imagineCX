import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>{" "}
          </li>
        </ul>
      </nav>
      <h1>Home</h1>
    </>
  );
}

export default Home;
