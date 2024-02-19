import React from 'react';
var VirtualItem = (function (_a) {
    var index = _a.index, children = _a.children, setHeight = _a.setHeight, style = _a.style;
    var itemRef = React.useRef(null);
    React.useEffect(function () {
        if (itemRef.current) {
            setHeight(index, itemRef.current.getBoundingClientRect().height);
        }
    }, [setHeight, index]);
    return (React.createElement("div", { ref: itemRef, style: style }, children));
});
export default React.memo(VirtualItem);
