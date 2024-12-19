import { Text, TextProps } from "@yamada-ui/react";

interface Props extends TextProps {
  children: string;
}

export const CustomText = (props: Props) => {
  return (
    <Text fontFamily={"mono"} color={"whiteAlpha.950"}>
      {props.children}
    </Text>
  );
};
