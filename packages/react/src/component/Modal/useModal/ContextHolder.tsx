import React, { useState, useImperativeHandle, forwardRef, ReactElement} from 'react';

export type HolderRef = {
    addInstance?: (ins: ReactElement) => void;
    removeInstance?: (ins: ReactElement) => void;
};

const contextHolderElement = forwardRef<HolderRef>((_props:any, ref:any) => {
    const [instances, setInstances] = useState<ReactElement[]>([]);

    const addInstance = (ins: ReactElement) => {
        setInstances((originInstances) => [...originInstances, ins]);
    }

    const removeInstance = (ins: ReactElement) => {
        setInstances((originInstances) => originInstances.filter((originIns) => ins != originIns))
    }

    useImperativeHandle(ref, () => ({
        addInstance,
        removeInstance
    }));

    return <>{instances}</>;
});

export default contextHolderElement;