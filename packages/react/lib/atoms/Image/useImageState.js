import React from 'react';

function useImageState(props) {
    const [state, setState] = React.useState(props || "beforeLoad");
    const isLoading = state === "Loading";
    const loaded = state === "loaded";
    return { state, isLoading, loaded, setState };
}

export { useImageState as default };
//# sourceMappingURL=useImageState.js.map
