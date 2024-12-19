import { CircleProgress, Flex } from "@yamada-ui/react";
import { CustomText } from "./CustomText";

export const Loading = () => {
  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"100vh"}
      py={8}
    >
      <CircleProgress value={18} isAnimation p={5} />
      <CustomText>ローディング中です</CustomText>
    </Flex>
  );
};
