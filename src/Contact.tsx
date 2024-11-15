import React, { useEffect, useState } from "react";
import DropdownList from './DropdownList';
import { fetchAPI } from "./core/fetchAPI";
import { Button, Option, Select, Textarea } from "@yamada-ui/react";

export interface ClassItem {
    id: string;
    name: string;
}

const Contact: React.FC = () => {
    const [classes, setClasses] = useState<ClassItem[]>([]);  // 初期値を空の配列に

    const sendHandler = (data: React.FormEvent<HTMLFormElement>) => {
        data.preventDefault();
        const formData = new FormData(data.currentTarget);
        const name = formData.get("name");
        console.log(name);
        const pass = formData.get("pass");
        console.log(pass);
        const classData = formData.get("class");
        console.log(classData);
    };

    useEffect(() => {
        fetchAPI("getClasses", setClasses);  // APIからデータを取得してstateにセット
    }, []);

    return (
        <>
            <h1>連絡ページ</h1>
            <form onSubmit={sendHandler}>
                <Textarea variant='flushed' placeholder="氏名"></Textarea>
                <input name="name" /><br />
                <label>科目名</label><br />
                <Select placeholder="キャラクターを選択">
                    <Option value="孫悟空">孫悟空</Option>
                    <Option value="ベジータ">ベジータ</Option>
                    <Option value="フリーザ">フリーザ</Option>
                </Select>
                <div>
                    <DropdownList classes={classes} /> {/* classesをDropdownListに渡す */}
                </div>
                <Textarea variant='flushed' placeholder="パスワード"></Textarea>
                
                <Button colorScheme={"secondary"} variant={"outline"}>
                    送信
                </Button>
                
            </form>
        </>
    );
};

export default Contact;