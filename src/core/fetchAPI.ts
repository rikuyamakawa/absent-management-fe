import { APIService } from "../Const";

const fetchAPI = async <T>(
  apiName: string,
  setter: React.Dispatch<React.SetStateAction<T>>
): Promise<void> => {
  const body = {
    api: apiName,
  };

  fetch(APIService.ENDPOINT, { method: "POST", body: JSON.stringify(body) })
    .then((res) => {
      return res.text();
    })
    .then((res) => {
      const json = JSON.parse(res);
      setter(json.data.classes);
    });
};

export { fetchAPI };
