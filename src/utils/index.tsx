import { pathMap, PathMap, paramsSymbol, nameSymbol } from '@/configs';
import { history } from 'umi';
import { useRef, useEffect } from 'react';

export const pathnameToPagename = (url: string[]) => {
  return url.reduce((acc: PathMap, cur: string): PathMap => {
    const res = acc[cur];
    if (res) {
      return res;
    } else {
      return acc[paramsSymbol]!;
    }
  }, pathMap)[nameSymbol];
};

// TODO: 等 error 收集的接口在 layout/error 通过接口收集错误原因，目前错误原因先直接展示出来
export const createFetchError = (
  where: string,
  status: number,
  message: string,
) => {
  return new Error(
    `请求错误，请重试…… Error at ${where} with ${status} - ${message}`,
  );
};

export const redirectTo = (pathname: string, delay = 0) => {
  if (/^https?:\/\//.test(pathname)) {
    window.location.href = pathname;
  } else {
    setTimeout(() => history.replace(pathname), delay);
  }
};

export const usePrev = (value: unknown) => {
  const ref = useRef<unknown>();
  useEffect(() => {
    return () => {
      ref.current = value;
    };
  });
  return ref.current;
};
