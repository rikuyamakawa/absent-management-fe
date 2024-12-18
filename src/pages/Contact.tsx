import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircleProgress,
  Textarea,
  Text,
  Container,
  Spacer,
  FormControl,
  Flex,
} from "@yamada-ui/react";
import { useNavigate } from "react-router-dom";
import { fetchAPI } from "../core/fetchAPI";
import { DropdownList, UserDropdownList } from "../components/DropdownList";
import { CustomHeading } from "../components/CustomHeading";

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
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mb={8}>
        <CircleProgress value={18} isAnimation p={5} />
        <Text>ローディング中です。</Text>
      </Box>
    );
  }

  return (
    <Container textAlign={"center"}>
      <Spacer />
      <CustomHeading>連絡する</CustomHeading>
      <Box>
        <FormControl
          label={"氏名"}
          labelProps={{
            color: "whiteAlpha.950",
            textAlign: "left",
            fontFamily: "mono",
          }}
          py={"4"}
        >
          <UserDropdownList users={users} setUser={setTargetId} />
        </FormControl>
        <FormControl
          label={"科目"}
          labelProps={{
            color: "whiteAlpha.950",
            textAlign: "left",
            fontFamily: "mono",
          }}
          py={"4"}
        >
          <DropdownList classes={classes} setClass={setTargetClassId} />
        </FormControl>
        <FormControl
          label={"パスワード"}
          labelProps={{
            color: "whiteAlpha.950",
            textAlign: "left",
            fontFamily: "mono",
          }}
          py={"4"}
        >
          <Textarea
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rows={1}
            textAlign={"left"}
            color={"whiteAlpha.950"}
            fontFamily={"mono"}
          />
        </FormControl>
        <Flex justifyContent={"flex-end"} py={4}>
          <Button onClick={() => sendHandler}>送信</Button>
        </Flex>
      </Box>
    </Container>
  );
};

export default Contact;
