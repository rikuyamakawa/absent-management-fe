import { APIService } from "../Const";

export const fetchAPI = async <T, V>(
  body: T,
  targetProp: string
): Promise<V> => {
  const response = await fetch(APIService.ENDPOINT, {
    method: "POST",
    body: JSON.stringify(body),
  });

  const resText = await response.text();
  const json = JSON.parse(resText);
  return json.data[targetProp];
};
