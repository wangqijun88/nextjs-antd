import { IResponse } from "@/request/type";
import { getStringParams, handleResponse } from './utils'

const host = 'https://qawww.cctalk.com'
export const get = async <T>(
  url: string,
  data: any = null,
  revalidate = 20
): Promise<IResponse<T>> => {
  const formatUrl = data ? `${url}?${getStringParams(data)}` : url;
  const requestURL = formatUrl
  const respones = await fetch(requestURL, {
    headers: {},
    method: "GET",
    next: {
      revalidate: revalidate,
    },
  });
  return handleResponse(respones);
};
