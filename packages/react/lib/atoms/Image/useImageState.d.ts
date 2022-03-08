import React from 'react';
declare type ImageLoadType = "beforeLoad" | "Loading" | "loaded";
export default function useImageState(props?: ImageLoadType): {
    state: ImageLoadType;
    isLoading: boolean;
    loaded: boolean;
    setState: React.Dispatch<React.SetStateAction<ImageLoadType>>;
};
export {};
