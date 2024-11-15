import { Button, Container } from "@yamada-ui/react"
import { Link } from "react-router-dom"

function Home() {
    return (
         <Container>
            <Link to={"/contact"}>
                <Button colorScheme={"secondary"} variant={"outline"}>
                    連絡
                </Button>
                
            </Link>
            <Link to={"/vote"}>
            <Button colorScheme={"secondary"} variant={"outline"}>
                    投票
                </Button>
            </Link>
         </Container>
    )
}

export default Home