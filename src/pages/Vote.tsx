import {
  Button,
  Radio,
  RadioGroup,
  Textarea,
  Container,
  FormControl,
} from "@yamada-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAPI } from "../core/fetchAPI";
import { Loading } from "../components/Loading";
import { CustomHeading } from "../components/CustomHeading";

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
    return <Loading />;
  }

  return (
    <Container textAlign={"center"}>
      <CustomHeading>投票</CustomHeading>
      <RadioGroup
        name="agree"
        direction="row"
        defaultValue="賛成"
        onChange={(value) => setAgree(value === "賛成")}
      >
        <Radio value="賛成">賛成</Radio>
        <Radio value="反対">反対</Radio>
      </RadioGroup>

      <FormControl label={"パスワード"}>
        <Textarea
          name="pass"
          placeholder="入力してください"
          rows={1}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </FormControl>

      <Button onClick={sendHandler}>送信</Button>
    </Container>
  );
}
export default Vote;
