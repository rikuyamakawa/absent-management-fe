import {
  Button,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Textarea,
  VStack,
} from "@yamada-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface ReportDetail {
  reportId: string;
  byUser: {
    id: string;
    name: string;
  };
  targetUser: {
    id: string;
    name: string;
  };
  className: string;
  createdAt: string;
}

function Vote() {
  const location = useLocation();
  const reportId = location.state?.reportId;
  const url =
    "https://script.google.com/macros/s/AKfycbxmlNsEeqe9Iw1rDDCkxNrfmmglIjGuoSHCTobuhCUulTCQ7luvr1X5R14o2wPFVWpseg/exec";
  const [report, SetReport] = useState<ReportDetail | undefined>(undefined);

  const sendHandler = (data: React.FormEvent<HTMLFormElement>) => {
    data.preventDefault();
    const formData = new FormData(data.currentTarget);
    const pass = formData.get("pass");
    const voteResult = formData.get("voteResult");
    console.log(pass);
    console.log(voteResult);
  };

  useEffect(() => {
    if (!reportId) return;

    const fetchReportDetail = async () => {
      const body = {
        api: "getReportDetail",
        reportId: reportId,
      };
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
      });
      const resText = await res.text();
      const json = JSON.parse(resText);
      SetReport(json.data.reportDetail);
      console.log(report);
    };

    fetchReportDetail();
  }, [report, reportId]);

  return (
    <Flex height="100vh" justify="center" align="center">
      <form onSubmit={sendHandler}>
        <Heading as="h1" size="lg" isTruncated>
          投票
        </Heading>
        <br />

        <VStack>
          <RadioGroup name="voteResult" direction="row" defaultValue="賛成">
            <Radio value="賛成">賛成</Radio>
            <Radio value="反対">反対</Radio>
          </RadioGroup>
        </VStack>
        <label>パスワード</label>
        <br />
        <Textarea
          name="pass"
          variant="flushed"
          placeholder="入力してください"
          rows={1}
        ></Textarea>

        <Button
          type="submit"
          colorScheme={"secondary"}
          variant={"outline"}
          marginTop="2rem"
        >
          送信
        </Button>
      </form>
    </Flex>
  );
}
export default Vote;
