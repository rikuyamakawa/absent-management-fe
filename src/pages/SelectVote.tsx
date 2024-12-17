import {
  Box,
  Card,
  CardBody,
  CircleProgress,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
} from "@yamada-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAPI } from "../core/fetchAPI";

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

  if (loading) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mb={8}>
        <CircleProgress value={18} isAnimation p={5} />
        <Text>ローディング中です。</Text>
      </Box>
    );
  }

  if (reports.length == 0) {
    return (
      <Flex height="100vh" justify="center" align="center">
        <Heading as="h2">欠席報告はありません</Heading>
      </Flex>
    );
  }

  return (
    <Container>
      <Heading>欠席報告者一覧</Heading>
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
