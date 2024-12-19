import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Textarea,
  Container,
  Spacer,
  FormControl,
  Flex,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
} from "@yamada-ui/react";
import { useNavigate } from "react-router-dom";
import { fetchAPI } from "../core/fetchAPI";
import { DropdownList, UserDropdownList } from "../components/DropdownList";
import { CustomHeading } from "../components/CustomHeading";
import { Loading } from "../components/Loading";

export interface ClassItem {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
}

const Contact: React.FC = () => {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [targetClassId, setTargetClassId] = useState<string | undefined>(
    undefined
  );
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [targetId, setTargetId] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendHandler = async () => {
    if (!targetId || !targetClassId || !password) return;

    await executeReport(targetId, targetClassId, password);
    setIsModalOpen(false);
  };

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

    const res: string = await fetchAPI(body, "message");
    if (!res) return;

    setTargetId(undefined);
    setTargetClassId(undefined);
    setPassword(undefined);
    navigate("/");

    setLoading(false);
  };

  useEffect(() => {
    const getClasses = async () => {
      const classes: ClassItem[] = await fetchAPI(
        {
          api: "getClasses",
        },
        "classes"
      );
      setClasses(classes);
    };
    const fetchUser = async () => {
      const users: User[] = await fetchAPI(
        {
          api: "getStudents",
        },
        "users"
      );
      setUsers(users);
    };

    getClasses();
    fetchUser();
  }, []);

  if ((users.length === 0 && classes.length === 0) || loading) {
    return <Loading />;
  }

  return (
    <Container textAlign={"center"}>
      <Spacer />
      <CustomHeading>連絡する</CustomHeading>
      <Box>
        <FormControl label={"自分の学籍番号"} py={"4"}>
          <Textarea
            value={userId}
            placeholder="J220XX"
            onChange={(e) => setUserId(e.target.value)}
            rows={1}
          />
        </FormControl>
        <FormControl label={"氏名"} py={"4"}>
          <UserDropdownList users={users} setUser={setTargetId} />
        </FormControl>
        <FormControl label={"科目"} py={"4"}>
          <DropdownList classes={classes} setClass={setTargetClassId} />
        </FormControl>
        <Flex justifyContent={"flex-end"} py={4}>
          <Button onClick={confirmHandler}>確認</Button>
        </Flex>
      </Box>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalHeader>パスワードを入力してください。</ModalHeader>
        <ModalBody>
          <Text>LINEにワンタイムパスワードを送信しました。</Text>
          <Text>対象者 {users.find((user) => user.id === targetId)?.name}</Text>
          <Text>
            対象授業 {classes.find((c) => c.id === targetClassId)?.name}
          </Text>
          <FormControl label={"パスワード"} py={"4"} fontFamily={"mono"}>
            <Textarea
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              rows={1}
              fontFamily={"mono"}
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
};

export default Contact;
