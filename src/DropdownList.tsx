import { ClassItem } from "./Contact";
import { Select, Option } from "@yamada-ui/react"

interface DropdownListProps {
  classes: ClassItem[]; // propsとして受け取るクラスリスト
  setClass: (id: string) => void;
}

const DropdownList = (props: DropdownListProps) => {
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

export default DropdownList;