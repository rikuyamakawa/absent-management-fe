import { Select, Option } from "@yamada-ui/react";
import { ClassItem, User } from "../pages/Contact";

interface DropdownListProps {
  classes: ClassItem[];
  setClass: (id: string) => void;
}

export const DropdownList = (props: DropdownListProps) => {
  return (
    <Select
      onChange={(id) => {
        props.setClass(id);
      }}
      color={"whiteAlpha.950"}
      fontFamily={"mono"}
    >
      {props.classes.map((item) => (
        <Option
          key={item.id}
          value={item.id}
          backgroundColor={"blackAlpha.800"}
          _selected={{ bg: "blackAlpha.700" }}
          _checked={{ bg: "blackAlpha.700" }}
          _hover={{ bg: "blackAlpha.700" }}
        >
          {item.name}
        </Option>
      ))}
    </Select>
  );
};

interface UserDropDownListProps {
  users: User[];
  setUser: (id: string) => void;
}

export const UserDropdownList = (props: UserDropDownListProps) => {
  return (
    <Select
      onChange={(id) => {
        props.setUser(id);
      }}
      color={"whiteAlpha.950"}
      fontFamily={"mono"}
    >
      {props.users.map((item) => (
        <Option
          key={item.id}
          value={item.id}
          backgroundColor={"blackAlpha.800"}
          _selected={{ bg: "blackAlpha.700" }}
          _checked={{ bg: "blackAlpha.700" }}
          _hover={{ bg: "blackAlpha.700" }}
        >
          {item.name}
        </Option>
      ))}
    </Select>
  );
};
