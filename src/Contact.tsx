import React, { useEffect, useState } from "react";
import { DropdownList, UserDropdownList } from "./DropdownList";
import { fetchAPI } from "./core/fetchAPI";
import {
  Box,
  Button,
  CircleProgress,
  Flex,
  Textarea,
  Text,
} from "@yamada-ui/react";
import { useNavigate } from "react-router-dom";
import { APIService } from "./Const";

export interface ClassItem {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
}

const Contact: React.FC = () => {
  const [classes, setClasses] = useState<ClassItem[]>([]); // 初期値を空の配列に
  const [users, setUsers] = useState<User[]>([]);
  const [targetClassId, setTargetClassId] = useState<string | undefined>(
    undefined
  );
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [targetId, setTargetId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendHandler = async (data: React.FormEvent<HTMLFormElement>) => {
    data.preventDefault();
    if (!targetId || !targetClassId || !password) return;

    await executeReport(targetId, targetClassId, password);
  };

  const executeReport = async (
    targetId: string,
    targetClassId: string,
    password: string
  ) => {
    setLoading(true);
    const body = {
      api: "report",
      targetId: targetId,
      classId: targetClassId,
      pass: parseInt(password),
    };

    const res = await fetch(APIService.ENDPOINT, {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.log("エラー");
    }

    setTargetId(undefined);
    setTargetClassId(undefined);
    setPassword(undefined);
    navigate("/");

    setLoading(false);
  };

  useEffect(() => {
    fetchAPI("getClasses", setClasses); // APIからデータを取得してstateにセット

    const fetchUser = async () => {
      const body = {
        api: "getStudents",
      };

      const res = await fetch(APIService.ENDPOINT, {
        method: "POST",
        body: JSON.stringify(body),
      });
      const resText = await res.text();
      const json = JSON.parse(resText);
      setUsers(json.data.users);
    };

    fetchUser();
  }, []);

  if ((users.length === 0 && classes.length === 0) || loading) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mb={8}>
        <CircleProgress value={18} isAnimation p={5} />
        <Text>ローディング中です。</Text>
      </Box>
    );
  }

  return (
    <Flex height="100vh" justify="center" align="center">
      <form onSubmit={sendHandler}>
        <h1 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>連絡ページ</h1>
        <br />
        <label style={{ fontSize: "1.2rem" }}>氏名</label>
        <br />
        <div>
          <UserDropdownList users={users} setUser={setTargetId} />
        </div>
        <label>科目名</label>
        <br />
        <div>
          <DropdownList classes={classes} setClass={setTargetClassId} />{" "}
          {/* nameプロパティを追加 */}
        </div>
        <label>パスワード</label>
        <br />
        <Textarea
          name="pass"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="flushed"
          placeholder="入力してください"
          rows={1}
        />
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
};

export default Contact;
