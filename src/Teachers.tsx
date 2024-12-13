import { Flex, Heading, Text } from "@yamada-ui/react";

type GetReportsRes = {
  targetUserName: string;
};

interface Props {
  reports: GetReportsRes[];
}

const Teachers = (props: Props) => {
  return (
    <Flex height="100vh" justify="center" align="center">
      <Heading as="h1" size="lg" isTruncated>
        欠席者一覧
      </Heading>
      <br />
      {props.reports.map((report) => (
        <Text>{report.targetUserName}</Text>
      ))}
    </Flex>
  );
};
export default Teachers;
