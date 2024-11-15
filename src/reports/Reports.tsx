import { Card, Container, Heading, Text } from "@yamada-ui/react";
import { useEffect, useState } from "react";

interface Report {
  reportId: string;
  userName: string;
  className: string;
}

export const Reports = () => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const url =
      "https://script.google.com/macros/s/AKfycbxmlNsEeqe9Iw1rDDCkxNrfmmglIjGuoSHCTobuhCUulTCQ7luvr1X5R14o2wPFVWpseg/exec";
    const body = {
      api: "getTodayReports",
    };

    fetch(url, { method: "POST", body: JSON.stringify(body) })
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        const json = JSON.parse(res);
        setReports(json.data.reports);
      });
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
