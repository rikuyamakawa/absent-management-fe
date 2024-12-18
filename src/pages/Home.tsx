import { Button, Container, Flex, Spacer } from "@yamada-ui/react";
import { Link } from "react-router-dom";
import { CustomHeading } from "../components/CustomHeading";

function Home() {
  return (
    <Container textAlign={"center"}>
      <Spacer />
      <CustomHeading>欠席者確認</CustomHeading>
      <Flex gap={"md"} justifyContent={"center"}>
        <Link to={"/contact"}>
          <Button>連絡</Button>
        </Link>
        <Link to={"/selectVote"}>
          <Button>投票</Button>
        </Link>
        <Link to={"/teachers"}>
          <Button>先生</Button>
        </Link>
      </Flex>
    </Container>
  );
}

export default Home;
