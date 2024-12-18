import {
  Badge,
  Box,
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  Spacer,
  Text,
  VStack,
} from "@yamada-ui/react";
import { useEffect, useState } from "react";
import { fetchAPI } from "../core/fetchAPI";
import { Loading } from "../components/Loading";

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

  if (!students) {
    return <Loading />;
  }

  return (
    <Container py={8} maxW="container.lg">
      <Heading mb={6} textAlign="center">
        欠席者履歴
      </Heading>
      <VStack>
        {students.map((student) => (
          <Card
            key={student.id}
            borderColor={student.isConfirm ? "green.400" : "red.400"}
          >
            <CardBody>
              <Flex align="center">
                <Box>
                  <Heading size="md">{student.userName}</Heading>
                  <Text fontSize="sm" color="gray.500" mt={1}>
                    クラス: {student.className} | 日付:{" "}
                    {new Date(student.createdAt).toLocaleDateString()}
                  </Text>
                </Box>
                <Spacer />
                <Badge
                  colorScheme={student.isConfirm ? "green" : "red"}
                  fontSize="0.9em"
                  p={1}
                  borderRadius="md"
                >
                  {student.isConfirm ? "確認済み" : "未確認"}
                </Badge>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </VStack>
    </Container>
  );
};
export default Teachers;
