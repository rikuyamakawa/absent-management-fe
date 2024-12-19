import {
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
} from "@yamada-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAPI } from "../core/fetchAPI";
import { Loading } from "../components/Loading";
import { CustomHeading } from "../components/CustomHeading";

type GetReportsRes = {
  reportId: string;
  userName: string;
  className: string;
};

const SelectVote = () => {
  const [reports, setReports] = useState<GetReportsRes[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      const reports: GetReportsRes[] = await fetchAPI(
        {
          api: "getTodayReports",
        },
        "reports"
      );

      setReports(reports);
      setLoading(false);
    };
    fetchReports();
  }, []);

  if (loading) return <Loading />;

  if (reports.length == 0) {
    return (
      <Flex height="100vh" justify="center" align="center">
        <Heading as="h2">欠席報告はありません</Heading>
      </Flex>
    );
  }

  return (
    <Container
      textAlign={"center"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"100vh"}
    >
      <CustomHeading>欠席報告者一覧</CustomHeading>
      <VStack>
        {reports.map((report) => (
          <Card
            key={report.reportId}
            onClick={() => {
              navigate("/vote", { state: { reportId: report.reportId } });
            }}
          >
            <CardBody>
              <Heading>{report.userName}</Heading>
              <Text>{report.className}</Text>
            </CardBody>
          </Card>
        ))}
      </VStack>
    </Container>
  );
};

export default SelectVote;
