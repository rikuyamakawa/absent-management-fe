import { Box, CircleProgress, Flex, Heading, Text } from "@yamada-ui/react";
import { useEffect, useState } from "react";
import { fetchAPI } from "../core/fetchAPI";

type GetAbsentStudents = {
  id: string;
  userId: string;
  userName: string;
  classId: string;
  className: string;
  reportId: string;
  isCOnfirm: boolean;
  createdAt: string;
};

const Teachers = () => {
  const [students, setStudents] = useState<GetAbsentStudents[] | null>(null);

  useEffect(() => {
    const getStudents = async () => {
      const students: GetAbsentStudents[] = await fetchAPI(
        {
          api: "getAbsentStudents",
        },
        "absentStudents"
      );
      setStudents(students);
    };
    getStudents();
  }, []);

  if (!students) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mb={8}>
        <CircleProgress value={18} isAnimation p={5} />
        <Text>ローディング中です。</Text>
      </Box>
    );
  }

  return (
    <Flex height="100vh" justify="center" align="center">
      <Heading as="h1" size="lg" isTruncated>
        欠席者一覧
      </Heading>
      <br />
      {students.map((student) => (
        <Text key={student.id}>{student.userId}</Text>
      ))}
    </Flex>
  );
};
export default Teachers;
