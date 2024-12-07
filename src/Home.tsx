import { Button, ButtonGroup, Container, Flex } from "@yamada-ui/react"
import { Link } from "react-router-dom"

function Home() {
    return (
        <Flex
            height="100vh"
            justify="center"
            align="center"
        >
            <Container>
                <ButtonGroup gap={"md"} margin="0 auto" display="flex" justifyContent="center">
                    <Link to={"/contact"}>
                        <Button colorScheme={"secondary"} size="2xl" variant={"outline"}>連絡</Button>
                    </Link>
                    <Link to={"/SelectVote"}>
                        <Button colorScheme={"secondary"} size="2xl" variant={"outline"}>投票</Button>
                    </Link>
                </ButtonGroup>

            </Container>
        </Flex>
    )
}

export default Home