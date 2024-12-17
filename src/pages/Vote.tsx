import {
  Button,
  Heading,
  Radio,
  RadioGroup,
  Textarea,
  VStack,
  Box,
  CircleProgress,
  Text,
} from "@yamada-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAPI } from "../core/fetchAPI";

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
  const navigate = useNavigate();
  const reportId = location.state?.reportId;
  const [report, SetReport] = useState<ReportDetail | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [pass, setPass] = useState<string | undefined>(undefined);
  const [agree, setAgree] = useState(true);

  const sendHandler = async () => {
    if (!pass || !reportId) return;
    await executeVote(pass);
  };

  const executeVote = async (pass: string) => {
    setLoading(true);

    const body = {
      api: "vote",
      reportId: reportId,
      pass: parseInt(pass),
      agree: agree,
    };
    const res: string = await fetchAPI(body, "message");
    if (!res) return;

    setPass(undefined);
    navigate("/");

    setLoading(false);
  };

  useEffect(() => {
    if (!reportId) return;

    const fetchReportDetail = async () => {
      const body = {
        api: "getReportDetail",
        reportId: reportId,
      };
      const reportDetail: ReportDetail = await fetchAPI(body, "reportDetail");
      SetReport(reportDetail);
    };

    fetchReportDetail();
    setLoading(false);
  }, [report, reportId]);

  if (report === undefined || loading) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mb={8}>
        <CircleProgress value={18} isAnimation p={5} />
        <Text>ローディング中です。</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Heading as="h1" size="lg" isTruncated>
        投票
      </Heading>

      <VStack>
        <RadioGroup
          name="voteResult"
          direction="row"
          defaultValue="賛成"
          onChange={(value) => setAgree(value === "賛成")}
        >
          <Radio value="賛成">賛成</Radio>
          <Radio value="反対">反対</Radio>
        </RadioGroup>
      </VStack>
      <label>パスワード</label>

      <Textarea
        name="pass"
        variant="flushed"
        placeholder="入力してください"
        rows={1}
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />

      <Button
        type="submit"
        colorScheme={"secondary"}
        variant={"outline"}
        marginTop="2rem"
        onClick={sendHandler}
      >
        送信
      </Button>
    </Box>
  );
}
export default Vote;
