import React, { useEffect, useState } from "react";
import DropdownList from './DropdownList';
import { fetchAPI } from "./core/fetchAPI";
import { Button, Flex, Textarea } from "@yamada-ui/react";

export interface ClassItem {
    id: string;
    name: string;
}

const Contact: React.FC = () => {
    const [classes, setClasses] = useState<ClassItem[]>([]);  // 初期値を空の配列に
    const sendHandler = (data: React.FormEvent<HTMLFormElement>) => {
        console.log("sendHandler");
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

        <Flex
            height="100vh"
            justify="center"
            align="center">
            <form onSubmit={sendHandler}>
                    <h1 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>連絡ページ</h1><br />
                    <label style={{ fontSize: "1.2rem" }}>氏名</label><br />
                    <Textarea name="name" variant='flushed' placeholder="入力してください" rows={1}></Textarea>
                <label>科目名</label><br />
                <div>
                    <DropdownList classes={classes} name="class" /> {/* nameプロパティを追加 */}
                </div>
                    <label>パスワード</label><br />
                    <Textarea name="pass" variant='flushed' placeholder="入力してください" rows={1}></Textarea>
                    <Button type="submit" colorScheme={"secondary"} variant={"outline"} marginTop="2rem">
                    送信
                    </Button>
            </form>
        </Flex>
    );
};

export default Contact;