import {
  Box,
  Button,
  CircleProgress,
  Flex,
  Heading,
  Text,
} from "@yamada-ui/react";
import { useEffect, useState } from "react";

type GetReportsRes = {
  reportId: string;
  userName: string;
  className: string;
};

const SelectVote = () => {
  const url =
    "https://script.google.com/macros/s/AKfycbxmlNsEeqe9Iw1rDDCkxNrfmmglIjGuoSHCTobuhCUulTCQ7luvr1X5R14o2wPFVWpseg/exec";
  const [reports, setReports] = useState<GetReportsRes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      const body = {
        api: "getTodayReports",
      };

      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
      });
      const resText = await res.text();
      const json = JSON.parse(resText);
      setReports(json.data.reports);
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
    <Box>
      <Heading as="h1" size="lg" isTruncated>
        欠席報告者一覧
      </Heading>

      {reports.map((report) => (
        <Box>
          <Button>{report.userName}</Button>
        </Box>
      ))}
    </Box>
  );
};

export default SelectVote;
