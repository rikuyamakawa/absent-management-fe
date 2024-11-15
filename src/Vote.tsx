import { Button, Heading, Radio, RadioGroup, Textarea, VStack, } from "@yamada-ui/react"

function Vote() {
    const sendHandler = (data: React.FormEvent<HTMLFormElement>) => {
        data.preventDefault()
        const formData = new FormData(data.currentTarget)
        const pass = formData.get("pass")
        console.log(pass)
    }

    return (
        <>
            <Heading as="h1" size="lg" isTruncated>
                投票
            </Heading>

            <form onSubmit={sendHandler}>
                <VStack>
                    <RadioGroup direction="row" defaultValue="賛成">
                        <Radio value="賛成">賛成</Radio>
                        <Radio value="反対">反対</Radio>

                    </RadioGroup>


                </VStack>
                <Textarea variant='flushed' placeholder="パスワード"></Textarea>

                <Button colorScheme={"secondary"} variant={"outline"}>
                    送信
                </Button>
            </form>
        </>
    )
}
export default Vote