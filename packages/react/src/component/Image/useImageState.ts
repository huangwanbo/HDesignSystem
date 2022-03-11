import React from 'react';
type ImageLoadType = "beforeLoad" | "Loading" | "loaded";
export default function useImageState(props?: ImageLoadType) {
  const [state, setState] = React.useState<ImageLoadType>(props || "beforeLoad");
  const isLoading = state === "Loading";
  const loaded = state === "loaded";
  return { state, isLoading, loaded, setState };
}