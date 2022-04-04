import { useEffect, useRef } from "react";
/*
 *  判断是否是第一次render
 *  @param dependence Array<T> 一个数组监听变化的依赖
 *  @return boolean
 */
export default function useIsFirstRender<T>(dependence: Array<T>) {
  const firstRef = useRef(1);
  useEffect(() => {
    console.log(firstRef.current);

    if (firstRef.current === 1) {
      firstRef.current++;
      return;
    }
  }, dependence);
  return () => {
    return firstRef.current === 1;
  };
}
