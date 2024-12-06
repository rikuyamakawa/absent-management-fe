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
    const [targetClass, setTargetClass] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const sendHandler = (data: React.FormEvent<HTMLFormElement>) => {
        console.log("sendHandler");
        data.preventDefault();
        console.log(name);
        console.log(password);
        console.log(targetClass);
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
                <Textarea name="name" value={name} onChange={(e) => setName(e.target.value)} variant='flushed' placeholder="入力してください" rows={1} />
                <label>科目名</label><br />
                <div>
                    <DropdownList classes={classes} setClass={setTargetClass} /> {/* nameプロパティを追加 */}
                </div>
                    <label>パスワード</label><br />
                <Textarea name="pass" value={password} onChange={(e) => setPassword(e.target.value)} variant='flushed' placeholder="入力してください" rows={1} />
                    <Button type="submit" colorScheme={"secondary"} variant={"outline"} marginTop="2rem">
                    送信
                    </Button>
            </form>
        </Flex>
    );
};

export default Contact;