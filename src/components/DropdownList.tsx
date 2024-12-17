import { ClassItem, User } from "./Contact";
import { Select, Option } from "@yamada-ui/react";

interface DropdownListProps {
  classes: ClassItem[]; // propsとして受け取るクラスリスト
  setClass: (id: string) => void;
}

export const DropdownList = (props: DropdownListProps) => {
  return (
    <Select
      onChange={(id) => {
        props.setClass(id);
      }}
    >
      {props.classes.map((item) => (
        <Option key={item.id} value={item.id}>
          {" "}
          {/* valueをitem.idに設定 */}
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
    >
      {props.users.map((item) => (
        <Option key={item.id} value={item.id}>
          {item.name}
        </Option>
      ))}
    </Select>
  );
};
