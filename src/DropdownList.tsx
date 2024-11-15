import React, { useState } from 'react';
import { ClassItem } from './Contact';


// interface Option {
//     value: string;
//     label: string;
// }

interface DropdownListProps {
    classes: ClassItem[];  // classesをpropsとして受け取る
}

const DropdownList: React.FC<DropdownListProps> = ({ classes }) => {
    const [selectedOption, setSelectedOption] = useState<string>('');  // 選択された値

    const handleSelectOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);  // 選択肢を更新
    };

    return (
        <select name="class" value={selectedOption} onChange={handleSelectOption}>
            <option value="">選択してください</option>
            {classes.map((classItem) => (
                <option key={classItem.id} value={classItem.id}>
                    {classItem.name}
                </option>
            ))}
        </select>
    );
};

export default DropdownList;