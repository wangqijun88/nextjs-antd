import qs from "qs";
import cloneDeep from "lodash/cloneDeep";
import { IResponse } from "@/request/type";
export const getStringParams = (params: any) => {
  // 深克隆一下，以免传来的参数是redux等里面的数据，修改会报错
  const paramsCopy = cloneDeep(params);
  for (let key in paramsCopy) {
    if (paramsCopy[key] === "" || paramsCopy[key] === undefined) {
      paramsCopy[key] = null;
    }
  }
  return qs.stringify(paramsCopy, { skipNulls: true });
};

export const handleResponse = async <T>(response: globalThis.Response): Promise<IResponse<T>> => {
  if (!response.ok) {
    const resData = await response.json();
    return {
      message: resData.message,
      data: {},
      code: resData.code,
    } as IResponse<T>;
  }
  const contentType = response.headers.get("content-type");
  // 如果是json格式调用json解析
  if (contentType && contentType.includes("application/json")) {
    return response.json()
  } else {
    return {
      code: response.status,
      data: response.text(),
      message: response.statusText,
    } as IResponse<T>;
  }
};
