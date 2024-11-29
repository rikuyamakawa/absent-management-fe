import { ClassItem } from "./Contact";


interface DropdownListProps {
  classes: ClassItem[]; // propsとして受け取るクラスリスト
  name: string;  // nameプロパティを追加
}

const DropdownList: React.FC<DropdownListProps> = ({ classes, name }) => {
  return (
    <select name={name} className="...">  {/* name属性を追加 */}
      <option value="">選択してください</option>
      {classes.map((item) => (
        <option key={item.id} value={item.id}>  {/* valueをitem.idに設定 */}
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default DropdownList;