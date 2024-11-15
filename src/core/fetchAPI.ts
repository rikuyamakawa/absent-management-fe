const fetchAPI = async <T>(
    apiName: string,
    setter: React.Dispatch<React.SetStateAction<T>>
): Promise<void> => {
    const url =
        "https://script.google.com/macros/s/AKfycbxmlNsEeqe9Iw1rDDCkxNrfmmglIjGuoSHCTobuhCUulTCQ7luvr1X5R14o2wPFVWpseg/exec";

    const body = {
        api: apiName,
    };

    fetch(url, { method: "POST", body: JSON.stringify(body) })
        .then((res) => {
            return res.text();
        })
        .then((res) => {
            const json = JSON.parse(res);
            setter(json.data.classes);
        });
};

export { fetchAPI };