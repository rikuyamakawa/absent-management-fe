import {
  Button,
  Radio,
  RadioGroup,
  Textarea,
  Container,
  FormControl,
  Spacer,
  Flex,
  ModalBody,
  ModalHeader,
  Modal,
  ModalFooter,
  Text,
} from "@yamada-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAPI } from "../core/fetchAPI";
import { Loading } from "../components/Loading";
import { CustomHeading } from "../components/CustomHeading";
import { CustomText } from "../components/CustomText";

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
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const confirmHandler = async () => {
    if (!userId) return;
    setLoading(true);
    const body = {
      api: "sendOneTimePass",
      userId: userId,
    };

    await fetchAPI(body, "isSuccess");
    setLoading(false);
    setIsModalOpen(true);
  };

  const sendHandler = async () => {
    if (!pass || !reportId) return;
    setIsModalOpen(false);
    setLoading(true);
    await executeVote(pass);
    setLoading(false);
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

  if (report === undefined || loading) return <Loading />;

  return (
    <Container textAlign={"center"}>
      <Spacer />
      <CustomHeading>投票</CustomHeading>
      <CustomText>{`${report.targetUser.name}さんが欠席したという報告があります。`}</CustomText>
      <CustomText>あなたの意見を投票してください。</CustomText>
      <FormControl label={"自分の学籍番号"}>
        <Textarea
          value={userId}
          placeholder="J220XX"
          onChange={(e) => setUserId(e.target.value)}
          rows={1}
        />
      </FormControl>
      <RadioGroup
        name="agree"
        direction="row"
        defaultValue="賛成"
        onChange={(value) => setAgree(value === "賛成")}
      >
        <Radio value="賛成">賛成</Radio>
        <Radio value="反対">反対</Radio>
      </RadioGroup>
      <Flex justifyContent={"flex-end"} py={4}>
        <Button onClick={confirmHandler}>確認</Button>
      </Flex>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalHeader>パスワードを入力してください。</ModalHeader>
        <ModalBody>
          <Text>LINEにワンタイムパスワードを送信しました。</Text>
          <Text>対象者 {report.targetUser.name}</Text>
          <Text>対象授業 {report.className}</Text>
          <FormControl label={"パスワード"} py={"4"} fontFamily={"mono"}>
            <Textarea
              name="pass"
              placeholder="入力してください"
              rows={1}
              value={pass}
              color={"blackAlpha.950"}
              onChange={(e) => setPass(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
            閉じる
          </Button>
          <Button colorScheme={"primary"} onClick={sendHandler}>
            投票
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}
export default Vote;
