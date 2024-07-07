var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import React from 'react';
import VirtualItem from './VirtualItem';
var getStartIndex = function (tops, offset, scrollTop, extraRenderCount) {
    var left = 0, right = tops.length;
    while (left < right) {
        var mid = left + (~~((right - left) / 2));
        if (tops[mid] + offset >= scrollTop)
            right = mid;
        else
            left = mid + 1;
    }
    return Math.max(0, left - extraRenderCount - 1);
};
var getEndIndex = function (tops, offset, scrollTop, extraRenderCount, clientHeight) {
    var left = 0, right = tops.length;
    while (left < right) {
        var mid = left + (~~((right - left) / 2));
        if (tops[mid] + offset < scrollTop + clientHeight)
            left = mid + 1;
        else
            right = mid;
    }
    return Math.min(tops.length - 1, left + extraRenderCount);
};
export var VirtualList = React.forwardRef(function (props, ref) {
    var _a = props.preHeight, preHeight = _a === void 0 ? 50 : _a, _b = props.extraRenderCount, extraRenderCount = _b === void 0 ? 4 : _b, components = props.components;
    var heightsRef = React.useRef([]);
    var _c = __read(React.useState(0), 2), scrollTop = _c[0], setScrollTop = _c[1];
    var _d = __read(React.useState([]), 2), tops = _d[0], setTops = _d[1];
    var containerRef = React.useRef(null);
    var getVirtualItemHeight = React.useCallback(function (index) {
        var _a;
        return (_a = heightsRef.current[index]) !== null && _a !== void 0 ? _a : preHeight;
    }, [preHeight]);
    var getTops = React.useCallback(function () {
        var tops = [0];
        for (var i = 1; i <= components.length; i++) {
            tops[i] = tops[i - 1] + getVirtualItemHeight(i - 1);
        }
        return tops;
    }, [components.length, getVirtualItemHeight]);
    var setVirtualItemHeight = React.useCallback(function (index, height) {
        if (heightsRef.current[index] !== height) {
            heightsRef.current[index] = height;
            setTops(getTops());
        }
    }, [getTops]);
    React.useEffect(function () {
        setTops(getTops());
    }, [components.length, getTops]);
    React.useEffect(function () {
        var handleScroll = function () {
            if (containerRef.current) {
                setScrollTop(Math.max(0, window.scrollY));
            }
        };
        window.addEventListener('scroll', handleScroll);
        return function () {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    React.useImperativeHandle(ref, function () { return containerRef.current; });
    var getCurrentRenderItems = function () {
        var _a, _b, _c;
        var height = (_a = tops[tops.length - 1]) !== null && _a !== void 0 ? _a : 0;
        var clientHeight = window.innerHeight;
        var offset = (_c = (_b = containerRef.current) === null || _b === void 0 ? void 0 : _b.offsetTop) !== null && _c !== void 0 ? _c : 0;
        var startIndex = getStartIndex(tops, offset, scrollTop, extraRenderCount);
        var endIndex = getEndIndex(tops, offset, scrollTop, extraRenderCount, clientHeight);
        return (React.createElement("div", { style: {
                width: '100%',
                height: height + 'px'
            } }, components.slice(startIndex, endIndex).map(function (component, index) {
            var currentIndex = startIndex + index;
            return React.createElement(VirtualItem, { key: component.key, setHeight: setVirtualItemHeight, style: { position: 'absolute', width: '100%', top: "".concat(tops[currentIndex], "px") }, index: currentIndex }, component);
        })));
    };
    return (React.createElement("div", { ref: containerRef, style: { width: "100%", position: "relative" } }, getCurrentRenderItems()));
});
