import { Flex, Heading, Link } from "@yamada-ui/react";

type GetReportsRes = {
    reportId: string
    targetUserName: string
}

interface Props {
    reports: GetReportsRes[]
}
const SelectVote = (props: Props) => {
    const sendHandler = () => { }
    if (props.reports.length == 0) {
        return (<Flex height="100vh"
            justify="center"
            align="center">
            <Heading as="h2" >欠席報告はありません</Heading>
        </Flex>)
    }
    return (
        <form onSubmit={sendHandler}>
            <Flex
                height="100vh"
                justify="center"
                align="center"
            >
                <Heading as="h1" size="lg" isTruncated>欠席報告者一覧</Heading><br/>
                <Link href={"/vote"}>
                    {props.reports.map((report) => (
                        <button value={report.reportId}>{report.targetUserName}</button>
                    ))}

                </Link>
            </Flex>
        </form>
    )
}

export default SelectVote;
