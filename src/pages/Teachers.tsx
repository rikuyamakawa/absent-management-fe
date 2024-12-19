import {
  Badge,
  Box,
  Card,
  CardBody,
  Container,
  Heading,
  Text,
  VStack,
} from "@yamada-ui/react";
import { useEffect, useState } from "react";
import { fetchAPI } from "../core/fetchAPI";
import { Loading } from "../components/Loading";
import { CustomHeading } from "../components/CustomHeading";

type GetAbsentStudents = {
  id: string;
  userId: string;
  userName: string;
  classId: string;
  className: string;
  reportId: string;
  isConfirm: boolean;
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

  if (!students) return <Loading />;

  return (
    <Container>
      <CustomHeading>欠席者履歴</CustomHeading>
      <VStack>
        {students.map((student) => (
          <Card
            key={student.id}
            borderLeft="8px solid"
            borderColor={student.isConfirm ? "transparent" : "red.500"}
          >
            <CardBody display={"flex"}>
              <Box>
                <Heading size="md">{student.userName}</Heading>
                <Text fontSize="sm" color="gray.500" mt={1}>
                  クラス: {student.className} | 日付:{" "}
                  {new Date(student.createdAt).toLocaleDateString()}
                </Text>
              </Box>

              <Badge
                colorScheme={student.isConfirm ? "green" : "red"}
                fontSize="0.9em"
                p={1}
                borderRadius="md"
              >
                {student.isConfirm ? "確認済み" : "未確認"}
              </Badge>
            </CardBody>
          </Card>
        ))}
      </VStack>
    </Container>
  );
};
export default Teachers;
