import { Button, Container } from "@yamada-ui/react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container>
      <Link to={"/contact"}>
        <Button>連絡</Button>
      </Link>
      <Link to={"/selectVote"}>
        <Button>投票</Button>
      </Link>
      <Link to={"/teachers"}>
        <Button>先生</Button>
      </Link>
    </Container>
  );
}

export default Home;
