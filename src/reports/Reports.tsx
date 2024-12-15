import { Card, Container, Heading, Text } from "@yamada-ui/react";
import { useEffect, useState } from "react";
import { fetchAPI } from "../core/fetchAPI";

interface Report {
  reportId: string;
  userName: string;
  className: string;
}

export const Reports = () => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const getReports = async () => {
      const reports: Report[] = await fetchAPI(
        {
          api: "getTodayReports",
        },
        "reports"
      );
      setReports(reports);
    };
    getReports();
  }, []);

  return (
    <Container>
      <Heading>今日の連絡</Heading>
      {reports.map((report) => (
        <Card key={report.reportId}>
          <Heading>{report.userName}さん</Heading>
          <Text>{report.className}</Text>
        </Card>
      ))}
    </Container>
  );
};
