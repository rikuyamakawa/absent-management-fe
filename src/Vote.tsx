import { Radio, RadioGroup, useRadio, } from "@yamada-ui/react"


function Vote() {
    const sendHandler = (data: React.FormEvent<HTMLFormElement>) => {
        data.preventDefault()
        const formData = new FormData(data.currentTarget)
        const pass = formData.get("pass")
        console.log(pass)
    }
    const CustomRadio: FC<ReturnType<UseRadioGroupReturn["getRadioProps"]>> = (
        props,
      ) => {
        const { getInputProps, getIconProps } = useRadio(props)

    return (
        <>
            <h1>投票ページ</h1>
            <form onSubmit={sendHandler}>
                <button>賛成</button>
                <button>反対</button><br />
                
                <label>パスワード</label><br />
                <input name="pass" /><br />
                <button type="submit">送信</button>
            </form>
        </>
    )
}
export default Vote