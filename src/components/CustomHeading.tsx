import { Heading } from "@yamada-ui/react";

interface Props {
  children: string;
}

export const CustomHeading = (props: Props) => {
  return (
    <Heading color={"whiteAlpha.950"} fontFamily={"mono"}>
      {props.children}
    </Heading>
  );
};
