import { Button, Flex, Heading, Radio, RadioGroup, Textarea, VStack, } from "@yamada-ui/react"

function Vote() {
    const sendHandler = (data: React.FormEvent<HTMLFormElement>) => {
        data.preventDefault()
        const formData = new FormData(data.currentTarget)
        const pass = formData.get("pass")
        const voteResult = formData.get("voteResult")
        console.log(pass)
        console.log(voteResult)
    }

    return (
        <Flex
            height="100vh"
            justify="center"
            align="center"
        >
            <form onSubmit={sendHandler}>
                    <Heading as="h1" size="lg" isTruncated>投票</Heading><br />

                <VStack>
                        <RadioGroup name="voteResult" direction="row" defaultValue="賛成">
                        <Radio value="賛成">賛成</Radio>
                        <Radio value="反対">反対</Radio>

                    </RadioGroup>


                </VStack>
                    <label>パスワード</label><br />
                    <Textarea name="pass" variant='flushed' placeholder="入力してください" rows={1}></Textarea>

                    <Button type="submit" colorScheme={"secondary"} variant={"outline"} marginTop="2rem">
                    送信
                </Button>
            </form>
        </Flex>
    )
}
export default Vote