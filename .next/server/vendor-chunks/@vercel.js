"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@vercel";
exports.ids = ["vendor-chunks/@vercel"];
exports.modules = {

/***/ "(ssr)/./node_modules/@vercel/speed-insights/dist/next/index.mjs":
/*!*****************************************************************!*\
  !*** ./node_modules/@vercel/speed-insights/dist/next/index.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SpeedInsights: () => (/* binding */ SpeedInsights2)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var next_navigation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/navigation.js */ \"(ssr)/./node_modules/next/dist/api/navigation.js\");\n/* __next_internal_client_entry_do_not_use__ SpeedInsights auto */ // src/nextjs/index.tsx\n\n// src/react/index.tsx\n\n// package.json\nvar name = \"@vercel/speed-insights\";\nvar version = \"1.0.12\";\n// src/queue.ts\nvar initQueue = ()=>{\n    if (window.si) return;\n    window.si = function a(...params) {\n        (window.siq = window.siq || []).push(params);\n    };\n};\n// src/utils.ts\nfunction isBrowser() {\n    return \"undefined\" !== \"undefined\";\n}\nfunction detectEnvironment() {\n    try {\n        const env = \"development\";\n        if (env === \"development\" || env === \"test\") {\n            return \"development\";\n        }\n    } catch (e) {}\n    return \"production\";\n}\nfunction isDevelopment() {\n    return detectEnvironment() === \"development\";\n}\nfunction computeRoute(pathname, pathParams) {\n    if (!pathname || !pathParams) {\n        return pathname;\n    }\n    let result = pathname;\n    try {\n        const entries = Object.entries(pathParams);\n        for (const [key, value] of entries){\n            if (!Array.isArray(value)) {\n                const matcher = turnValueToRegExp(value);\n                if (matcher.test(result)) {\n                    result = result.replace(matcher, `/[${key}]`);\n                }\n            }\n        }\n        for (const [key, value] of entries){\n            if (Array.isArray(value)) {\n                const matcher = turnValueToRegExp(value.join(\"/\"));\n                if (matcher.test(result)) {\n                    result = result.replace(matcher, `/[...${key}]`);\n                }\n            }\n        }\n        return result;\n    } catch (e) {\n        return pathname;\n    }\n}\nfunction turnValueToRegExp(value) {\n    return new RegExp(`/${escapeRegExp(value)}(?=[/?#]|$)`);\n}\nfunction escapeRegExp(string) {\n    return string.replace(/[.*+?^${}()|[\\]\\\\]/g, \"\\\\$&\");\n}\n// src/generic.ts\nvar SCRIPT_URL = `https://va.vercel-scripts.com/v1/speed-insights`;\nvar PROD_SCRIPT_URL = `${SCRIPT_URL}/script.js`;\nvar DEV_SCRIPT_URL = `${SCRIPT_URL}/script.debug.js`;\nvar PROXY_SCRIPT_URL = `/_vercel/speed-insights/script.js`;\nfunction injectSpeedInsights(props = {}) {\n    var _a;\n    if (!isBrowser() || props.route === null) return null;\n    initQueue();\n    const isSelfHosted = Boolean(props.dsn);\n    const productionScript = isSelfHosted ? PROD_SCRIPT_URL : PROXY_SCRIPT_URL;\n    const src = props.scriptSrc || (isDevelopment() ? DEV_SCRIPT_URL : productionScript);\n    if (document.head.querySelector(`script[src*=\"${src}\"]`)) return null;\n    if (props.beforeSend) {\n        (_a = window.si) == null ? void 0 : _a.call(window, \"beforeSend\", props.beforeSend);\n    }\n    const script = document.createElement(\"script\");\n    script.src = src;\n    script.defer = true;\n    script.dataset.sdkn = name + (props.framework ? `/${props.framework}` : \"\");\n    script.dataset.sdkv = version;\n    if (props.sampleRate) {\n        script.dataset.sampleRate = props.sampleRate.toString();\n    }\n    if (props.route) {\n        script.dataset.route = props.route;\n    }\n    if (props.endpoint) {\n        script.dataset.endpoint = props.endpoint;\n    }\n    if (props.dsn) {\n        script.dataset.dsn = props.dsn;\n    }\n    if (isDevelopment() && props.debug === false) {\n        script.dataset.debug = \"false\";\n    }\n    script.onerror = ()=>{\n        console.log(`[Vercel Speed Insights] Failed to load script from ${src}. Please check if any content blockers are enabled and try again.`);\n    };\n    document.head.appendChild(script);\n    return {\n        setRoute: (route)=>{\n            script.dataset.route = route ?? void 0;\n        }\n    };\n}\n// src/react/index.tsx\nfunction SpeedInsights(props) {\n    const setScriptRoute = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{\n        if (!setScriptRoute.current) {\n            const script = injectSpeedInsights({\n                framework: props.framework || \"react\",\n                ...props\n            });\n            if (script) {\n                setScriptRoute.current = script.setRoute;\n            }\n        } else if (props.route) {\n            setScriptRoute.current(props.route);\n        }\n    }, [\n        props.route\n    ]);\n    return null;\n}\n// src/nextjs/utils.ts\n\nvar useRoute = ()=>{\n    const params = (0,next_navigation_js__WEBPACK_IMPORTED_MODULE_1__.useParams)();\n    const searchParams = (0,next_navigation_js__WEBPACK_IMPORTED_MODULE_1__.useSearchParams)() || new URLSearchParams();\n    const path = (0,next_navigation_js__WEBPACK_IMPORTED_MODULE_1__.usePathname)();\n    const finalParams = {\n        ...Object.fromEntries(searchParams.entries()),\n        ...params || {}\n    };\n    return params ? computeRoute(path, finalParams) : null;\n};\n// src/nextjs/index.tsx\nfunction SpeedInsightsComponent(props) {\n    const route = useRoute();\n    return /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(SpeedInsights, {\n        route,\n        ...props,\n        framework: \"next\"\n    });\n}\nfunction SpeedInsights2(props) {\n    return /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {\n        fallback: null\n    }, /* @__PURE__ */ /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(SpeedInsightsComponent, {\n        ...props\n    }));\n}\n //# sourceMappingURL=index.mjs.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvQHZlcmNlbC9zcGVlZC1pbnNpZ2h0cy9kaXN0L25leHQvaW5kZXgubWpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBZ0M7O0FDQ0U7O0FDQWhDLElBQUFJLE9BQVE7QUFDUixJQUFBQyxVQUFXOztBQ0ZOLElBQU1DLFlBQVk7SUFFdkIsSUFBSUMsT0FBT0MsRUFBQSxFQUFJO0lBRWZELE9BQU9DLEVBQUEsR0FBSyxTQUFTQyxFQUFBLEdBQUtDLE1BQUE7UUFDdkJILENBQUFBLE9BQU9JLEdBQUEsR0FBTUosT0FBT0ksR0FBQSxJQUFPLEVBQUMsRUFBR0MsSUFBQSxDQUFLRjtJQUN2QztBQUNGOztBQ1BPLFNBQVNHO0lBQ2QsT0FBTyxnQkFBa0I7QUFDM0I7QUFFQSxTQUFTQztJQUNQLElBQUk7UUFDRixNQUFNQztRQUNOLElBQUlBLFFBQVEsaUJBQWlCQSxRQUFRLFFBQVE7WUFDM0MsT0FBTztRQUNUO0lBQ0YsU0FBU0MsR0FBRyxDQUVaO0lBQ0EsT0FBTztBQUNUO0FBTU8sU0FBU0M7SUFDZCxPQUFPSCx3QkFBd0I7QUFDakM7QUFFTyxTQUFTSSxhQUNkQyxRQUFBLEVBQ0FDLFVBQUE7SUFFQSxJQUFJLENBQUNELFlBQVksQ0FBQ0MsWUFBWTtRQUM1QixPQUFPRDtJQUNUO0lBRUEsSUFBSUUsU0FBU0Y7SUFDYixJQUFJO1FBQ0YsTUFBTUcsVUFBVUMsT0FBT0QsT0FBQSxDQUFRRjtRQUUvQixXQUFXLENBQUNJLEtBQUtDLE1BQUssSUFBS0gsUUFBUztZQUNsQyxJQUFJLENBQUNJLE1BQU1DLE9BQUEsQ0FBUUYsUUFBUTtnQkFDekIsTUFBTUcsVUFBVUMsa0JBQWtCSjtnQkFDbEMsSUFBSUcsUUFBUUUsSUFBQSxDQUFLVCxTQUFTO29CQUN4QkEsU0FBU0EsT0FBT1UsT0FBQSxDQUFRSCxTQUFTLEtBQUtKLElBQUcsRUFBRztnQkFDOUM7WUFDRjtRQUNGO1FBRUEsV0FBVyxDQUFDQSxLQUFLQyxNQUFLLElBQUtILFFBQVM7WUFD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M0IsTUFBTWxCLFNBQVNmLG9CQUFvQjtnQkFDakNvQixXQUFXbkIsTUFBTW1CLFNBQUEsSUFBYTtnQkFDOUIsR0FBR25CLEtBQUE7WUFDTDtZQUNBLElBQUljLFFBQVE7Z0JBQ1ZpQixlQUFlQyxPQUFBLEdBQVVsQixPQUFPZSxRQUFBO1lBQ2xDO1FBQ0YsV0FBVzdCLE1BQU1FLEtBQUEsRUFBTztZQUN0QjZCLGVBQWVDLE9BQUEsQ0FBUWhDLE1BQU1FLEtBQUs7UUFDcEM7SUFDRixHQUFHO1FBQUNGLE1BQU1FLEtBQUs7S0FBQztJQUVoQixPQUFPO0FBQ1Q7O0FLeEJ3RDtBQUdqRCxJQUFNa0MsV0FBVztJQUN0QixNQUFNbkUsU0FBU2dFLDZEQUFTQTtJQUN4QixNQUFNSSxlQUFlRixtRUFBZUEsTUFBTSxJQUFJRztJQUM5QyxNQUFNQyxPQUFPTCwrREFBV0E7SUFFeEIsTUFBTU0sY0FBYztRQUNsQixHQUFHMUQsT0FBTzJELFdBQUEsQ0FBWUosYUFBYXhELE9BQUEsR0FBUztRQUM1QyxHQUFJWixVQUFVLENBQUM7SUFDakI7SUFFQSxPQUFPQSxTQUFTUSxhQUFhOEQsTUFBTUMsZUFBZTtBQUNwRDs7QU5UQSxTQUFTRSx1QkFBdUIxQyxLQUFBO0lBQzlCLE1BQU1FLFFBQVFrQztJQUVkLE9BQU8sOEJBQUE3RSxnREFBQSxDQUFDdUUsZUFBQTtRQUFvQjVCO1FBQWUsR0FBR0YsS0FBQTtRQUFPbUIsV0FBVTtJQUFBO0FBQ2pFO0FBRU8sU0FBU1csZUFBYzlCLEtBQUE7SUFDNUIsT0FDRSw4QkFBQXpDLGdEQUFBLENBQUNDLDJDQUFRQSxFQUFSO1FBQVNtRixVQUFVO0lBQUEsR0FDbEIsOEJBQUFwRixnREFBQSxDQUFDbUYsd0JBQUE7UUFBd0IsR0FBRzFDLEtBQUE7SUFBQTtBQUdsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2J1ZGdldC10cmFja2VyLy4uLy4uL3NyYy9uZXh0anMvaW5kZXgudHN4P2RiMzciLCJ3ZWJwYWNrOi8vYnVkZ2V0LXRyYWNrZXIvLi4vLi4vc3JjL3JlYWN0L2luZGV4LnRzeD9lNGI3Iiwid2VicGFjazovL2J1ZGdldC10cmFja2VyLy4uLy4uL3BhY2thZ2UuanNvbj82ZmM2Iiwid2VicGFjazovL2J1ZGdldC10cmFja2VyLy4uLy4uL3NyYy9xdWV1ZS50cz84NzNlIiwid2VicGFjazovL2J1ZGdldC10cmFja2VyLy4uLy4uL3NyYy91dGlscy50cz82MjUyIiwid2VicGFjazovL2J1ZGdldC10cmFja2VyLy4uLy4uL3NyYy9nZW5lcmljLnRzPzBiZGYiLCJ3ZWJwYWNrOi8vYnVkZ2V0LXRyYWNrZXIvLi4vLi4vc3JjL25leHRqcy91dGlscy50cz8xNzY4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBTdXNwZW5zZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFNwZWVkSW5zaWdodHMgYXMgU3BlZWRJbnNpZ2h0c1NjcmlwdCB9IGZyb20gJy4uL3JlYWN0JztcbmltcG9ydCB0eXBlIHsgU3BlZWRJbnNpZ2h0c1Byb3BzIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgdXNlUm91dGUgfSBmcm9tICcuL3V0aWxzJztcblxudHlwZSBQcm9wcyA9IE9taXQ8U3BlZWRJbnNpZ2h0c1Byb3BzLCAncm91dGUnPjtcblxuZnVuY3Rpb24gU3BlZWRJbnNpZ2h0c0NvbXBvbmVudChwcm9wczogUHJvcHMpOiBSZWFjdC5SZWFjdEVsZW1lbnQge1xuICBjb25zdCByb3V0ZSA9IHVzZVJvdXRlKCk7XG5cbiAgcmV0dXJuIDxTcGVlZEluc2lnaHRzU2NyaXB0IHJvdXRlPXtyb3V0ZX0gey4uLnByb3BzfSBmcmFtZXdvcms9XCJuZXh0XCIgLz47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTcGVlZEluc2lnaHRzKHByb3BzOiBQcm9wcyk6IFJlYWN0LlJlYWN0RWxlbWVudCB7XG4gIHJldHVybiAoXG4gICAgPFN1c3BlbnNlIGZhbGxiYWNrPXtudWxsfT5cbiAgICAgIDxTcGVlZEluc2lnaHRzQ29tcG9uZW50IHsuLi5wcm9wc30gLz5cbiAgICA8L1N1c3BlbnNlPlxuICApO1xufVxuIiwiJ3VzZSBjbGllbnQnO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdHlwZSB7IFNwZWVkSW5zaWdodHNQcm9wcyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGNvbXB1dGVSb3V0ZSwgaW5qZWN0U3BlZWRJbnNpZ2h0cyB9IGZyb20gJy4uL2dlbmVyaWMnO1xuXG5leHBvcnQgZnVuY3Rpb24gU3BlZWRJbnNpZ2h0cyhcbiAgcHJvcHM6IFNwZWVkSW5zaWdodHNQcm9wcyAmIHtcbiAgICBmcmFtZXdvcms/OiBzdHJpbmc7XG4gIH0sXG4pOiBKU1guRWxlbWVudCB8IG51bGwge1xuICBjb25zdCBzZXRTY3JpcHRSb3V0ZSA9IHVzZVJlZjwoKHBhdGg6IHN0cmluZykgPT4gdm9pZCkgfCBudWxsPihudWxsKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXNldFNjcmlwdFJvdXRlLmN1cnJlbnQpIHtcbiAgICAgIGNvbnN0IHNjcmlwdCA9IGluamVjdFNwZWVkSW5zaWdodHMoe1xuICAgICAgICBmcmFtZXdvcms6IHByb3BzLmZyYW1ld29yayB8fCAncmVhY3QnLFxuICAgICAgICAuLi5wcm9wcyxcbiAgICAgIH0pO1xuICAgICAgaWYgKHNjcmlwdCkge1xuICAgICAgICBzZXRTY3JpcHRSb3V0ZS5jdXJyZW50ID0gc2NyaXB0LnNldFJvdXRlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocHJvcHMucm91dGUpIHtcbiAgICAgIHNldFNjcmlwdFJvdXRlLmN1cnJlbnQocHJvcHMucm91dGUpO1xuICAgIH1cbiAgfSwgW3Byb3BzLnJvdXRlXSk7XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCB7IGNvbXB1dGVSb3V0ZSB9O1xuIiwie1xuICBcIm5hbWVcIjogXCJAdmVyY2VsL3NwZWVkLWluc2lnaHRzXCIsXG4gIFwidmVyc2lvblwiOiBcIjEuMC4xMlwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiU3BlZWQgSW5zaWdodHMgaXMgYSB0b29sIGZvciBtZWFzdXJpbmcgd2ViIHBlcmZvcm1hbmNlIGFuZCBwcm92aWRpbmcgc3VnZ2VzdGlvbnMgZm9yIGltcHJvdmVtZW50LlwiLFxuICBcImtleXdvcmRzXCI6IFtcbiAgICBcInNwZWVkLWluc2lnaHRzXCIsXG4gICAgXCJ2ZXJjZWxcIlxuICBdLFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidXJsXCI6IFwiZ2l0aHViOnZlcmNlbC9zcGVlZC1pbnNpZ2h0c1wiLFxuICAgIFwiZGlyZWN0b3J5XCI6IFwicGFja2FnZXMvd2ViXCJcbiAgfSxcbiAgXCJsaWNlbnNlXCI6IFwiQXBhY2hlLTIuMFwiLFxuICBcImV4cG9ydHNcIjoge1xuICAgIFwiLi9wYWNrYWdlLmpzb25cIjogXCIuL3BhY2thZ2UuanNvblwiLFxuICAgIFwiLlwiOiB7XG4gICAgICBcImJyb3dzZXJcIjogXCIuL2Rpc3QvaW5kZXgubWpzXCIsXG4gICAgICBcImltcG9ydFwiOiBcIi4vZGlzdC9pbmRleC5tanNcIixcbiAgICAgIFwicmVxdWlyZVwiOiBcIi4vZGlzdC9pbmRleC5qc1wiXG4gICAgfSxcbiAgICBcIi4vYXN0cm9cIjoge1xuICAgICAgXCJpbXBvcnRcIjogXCIuL2Rpc3QvYXN0cm8vY29tcG9uZW50LnRzXCJcbiAgICB9LFxuICAgIFwiLi9uZXh0XCI6IHtcbiAgICAgIFwiYnJvd3NlclwiOiBcIi4vZGlzdC9uZXh0L2luZGV4Lm1qc1wiLFxuICAgICAgXCJpbXBvcnRcIjogXCIuL2Rpc3QvbmV4dC9pbmRleC5tanNcIixcbiAgICAgIFwicmVxdWlyZVwiOiBcIi4vZGlzdC9uZXh0L2luZGV4LmpzXCJcbiAgICB9LFxuICAgIFwiLi9udXh0XCI6IHtcbiAgICAgIFwiYnJvd3NlclwiOiBcIi4vZGlzdC9udXh0L2luZGV4Lm1qc1wiLFxuICAgICAgXCJpbXBvcnRcIjogXCIuL2Rpc3QvbnV4dC9pbmRleC5tanNcIixcbiAgICAgIFwicmVxdWlyZVwiOiBcIi4vZGlzdC9udXh0L2luZGV4LmpzXCJcbiAgICB9LFxuICAgIFwiLi9yZWFjdFwiOiB7XG4gICAgICBcImJyb3dzZXJcIjogXCIuL2Rpc3QvcmVhY3QvaW5kZXgubWpzXCIsXG4gICAgICBcImltcG9ydFwiOiBcIi4vZGlzdC9yZWFjdC9pbmRleC5tanNcIixcbiAgICAgIFwicmVxdWlyZVwiOiBcIi4vZGlzdC9yZWFjdC9pbmRleC5qc1wiXG4gICAgfSxcbiAgICBcIi4vcmVtaXhcIjoge1xuICAgICAgXCJicm93c2VyXCI6IFwiLi9kaXN0L3JlbWl4L2luZGV4Lm1qc1wiLFxuICAgICAgXCJpbXBvcnRcIjogXCIuL2Rpc3QvcmVtaXgvaW5kZXgubWpzXCIsXG4gICAgICBcInJlcXVpcmVcIjogXCIuL2Rpc3QvcmVtaXgvaW5kZXguanNcIlxuICAgIH0sXG4gICAgXCIuL3N2ZWx0ZWtpdFwiOiB7XG4gICAgICBcInN2ZWx0ZVwiOiBcIi4vZGlzdC9zdmVsdGVraXQvaW5kZXgubWpzXCIsXG4gICAgICBcInR5cGVzXCI6IFwiLi9kaXN0L3N2ZWx0ZWtpdC9pbmRleC5kLnRzXCJcbiAgICB9LFxuICAgIFwiLi92dWVcIjoge1xuICAgICAgXCJicm93c2VyXCI6IFwiLi9kaXN0L3Z1ZS9pbmRleC5tanNcIixcbiAgICAgIFwiaW1wb3J0XCI6IFwiLi9kaXN0L3Z1ZS9pbmRleC5tanNcIixcbiAgICAgIFwicmVxdWlyZVwiOiBcIi4vZGlzdC92dWUvaW5kZXguanNcIlxuICAgIH1cbiAgfSxcbiAgXCJtYWluXCI6IFwiLi9kaXN0L2luZGV4LmpzXCIsXG4gIFwidHlwZXNcIjogXCIuL2Rpc3QvaW5kZXguZC50c1wiLFxuICBcInR5cGVzVmVyc2lvbnNcIjoge1xuICAgIFwiKlwiOiB7XG4gICAgICBcIipcIjogW1xuICAgICAgICBcImRpc3QvaW5kZXguZC50c1wiXG4gICAgICBdLFxuICAgICAgXCJyZWFjdFwiOiBbXG4gICAgICAgIFwiZGlzdC9yZWFjdC9pbmRleC5kLnRzXCJcbiAgICAgIF0sXG4gICAgICBcIm5leHRcIjogW1xuICAgICAgICBcImRpc3QvbmV4dC9pbmRleC5kLnRzXCJcbiAgICAgIF0sXG4gICAgICBcIm51eHRcIjogW1xuICAgICAgICBcImRpc3QvbnV4dC9pbmRleC5kLnRzXCJcbiAgICAgIF0sXG4gICAgICBcInJlbWl4XCI6IFtcbiAgICAgICAgXCJkaXN0L3JlbWl4L2luZGV4LmQudHNcIlxuICAgICAgXSxcbiAgICAgIFwic3ZlbHRla2l0XCI6IFtcbiAgICAgICAgXCJkaXN0L3N2ZWx0ZWtpdC9pbmRleC5kLnRzXCJcbiAgICAgIF0sXG4gICAgICBcInZ1ZVwiOiBbXG4gICAgICAgIFwiZGlzdC92dWUvaW5kZXguZC50c1wiXG4gICAgICBdXG4gICAgfVxuICB9LFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiYnVpbGRcIjogXCJ0c3VwICYmIHBucG0gY29weS1hc3Ryb1wiLFxuICAgIFwiY29weS1hc3Ryb1wiOiBcImNwIC1SIHNyYy9hc3RybyBkaXN0L1wiLFxuICAgIFwiZGV2XCI6IFwicG5wbSBjb3B5LWFzdHJvICYmIHRzdXAgLS13YXRjaFwiLFxuICAgIFwicG9zdGluc3RhbGxcIjogXCJub2RlIHNjcmlwdHMvcG9zdGluc3RhbGwubWpzXCIsXG4gICAgXCJsaW50XCI6IFwiZXNsaW50IC5cIixcbiAgICBcImxpbnQtZml4XCI6IFwiZXNsaW50IC4gLS1maXhcIixcbiAgICBcInRlc3RcIjogXCJqZXN0XCIsXG4gICAgXCJ0eXBlLWNoZWNrXCI6IFwidHNjIC0tbm9FbWl0XCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQHJlbWl4LXJ1bi9yZWFjdFwiOiBcIl4yLjUuMFwiLFxuICAgIFwiQHN2ZWx0ZWpzL2tpdFwiOiBcIl4xLjIwLjRcIixcbiAgICBcIkBzd2MvY29yZVwiOiBcIl4xLjMuMTAzXCIsXG4gICAgXCJAc3djL2plc3RcIjogXCJeMC4yLjI5XCIsXG4gICAgXCJAdGVzdGluZy1saWJyYXJ5L2plc3QtZG9tXCI6IFwiXjYuMi4wXCIsXG4gICAgXCJAdGVzdGluZy1saWJyYXJ5L3JlYWN0XCI6IFwiXjE0LjEuMlwiLFxuICAgIFwiQHR5cGVzL2plc3RcIjogXCJeMjkuNS4xMVwiLFxuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMjAuMTEuNFwiLFxuICAgIFwiQHR5cGVzL3JlYWN0XCI6IFwiXjE4LjIuNDhcIixcbiAgICBcImNvcHlmaWxlc1wiOiBcIl4yLjQuMVwiLFxuICAgIFwiamVzdFwiOiBcIl4yOS43LjBcIixcbiAgICBcImplc3QtZW52aXJvbm1lbnQtanNkb21cIjogXCJeMjkuNy4wXCIsXG4gICAgXCJuZXh0XCI6IFwiXjE0LjAuNFwiLFxuICAgIFwicmVhY3RcIjogXCJeMTguMi4wXCIsXG4gICAgXCJyZWFjdC1kb21cIjogXCJeMTguMi4wXCIsXG4gICAgXCJzdmVsdGVcIjogXCJeNC4yLjhcIixcbiAgICBcInRzdXBcIjogXCI3LjIuMFwiLFxuICAgIFwidnVlXCI6IFwiXjMuNC4xNFwiLFxuICAgIFwidnVlLXJvdXRlclwiOiBcIl40LjIuNVwiXG4gIH0sXG4gIFwicGVlckRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAc3ZlbHRlanMva2l0XCI6IFwiXjEgfHwgXjJcIixcbiAgICBcIm5leHRcIjogXCI+PSAxM1wiLFxuICAgIFwicmVhY3RcIjogXCJeMTggfHwgXjE5XCIsXG4gICAgXCJzdmVsdGVcIjogXCJeNFwiLFxuICAgIFwidnVlXCI6IFwiXjNcIixcbiAgICBcInZ1ZS1yb3V0ZXJcIjogXCJeNFwiXG4gIH0sXG4gIFwicGVlckRlcGVuZGVuY2llc01ldGFcIjoge1xuICAgIFwiQHN2ZWx0ZWpzL2tpdFwiOiB7XG4gICAgICBcIm9wdGlvbmFsXCI6IHRydWVcbiAgICB9LFxuICAgIFwibmV4dFwiOiB7XG4gICAgICBcIm9wdGlvbmFsXCI6IHRydWVcbiAgICB9LFxuICAgIFwicmVhY3RcIjoge1xuICAgICAgXCJvcHRpb25hbFwiOiB0cnVlXG4gICAgfSxcbiAgICBcInN2ZWx0ZVwiOiB7XG4gICAgICBcIm9wdGlvbmFsXCI6IHRydWVcbiAgICB9LFxuICAgIFwidnVlXCI6IHtcbiAgICAgIFwib3B0aW9uYWxcIjogdHJ1ZVxuICAgIH0sXG4gICAgXCJ2dWUtcm91dGVyXCI6IHtcbiAgICAgIFwib3B0aW9uYWxcIjogdHJ1ZVxuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IGluaXRRdWV1ZSA9ICgpOiB2b2lkID0+IHtcbiAgLy8gaW5pdGlhbGl6ZSB2YSB1bnRpbCBzY3JpcHQgaXMgbG9hZGVkXG4gIGlmICh3aW5kb3cuc2kpIHJldHVybjtcblxuICB3aW5kb3cuc2kgPSBmdW5jdGlvbiBhKC4uLnBhcmFtcyk6IHZvaWQge1xuICAgICh3aW5kb3cuc2lxID0gd2luZG93LnNpcSB8fCBbXSkucHVzaChwYXJhbXMpO1xuICB9O1xufTtcbiIsImV4cG9ydCBmdW5jdGlvbiBpc0Jyb3dzZXIoKTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJztcbn1cblxuZnVuY3Rpb24gZGV0ZWN0RW52aXJvbm1lbnQoKTogJ2RldmVsb3BtZW50JyB8ICdwcm9kdWN0aW9uJyB7XG4gIHRyeSB7XG4gICAgY29uc3QgZW52ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlY7XG4gICAgaWYgKGVudiA9PT0gJ2RldmVsb3BtZW50JyB8fCBlbnYgPT09ICd0ZXN0Jykge1xuICAgICAgcmV0dXJuICdkZXZlbG9wbWVudCc7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gZG8gbm90aGluZywgdGhpcyBpcyBva2F5XG4gIH1cbiAgcmV0dXJuICdwcm9kdWN0aW9uJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvZHVjdGlvbigpOiBib29sZWFuIHtcbiAgcmV0dXJuIGRldGVjdEVudmlyb25tZW50KCkgPT09ICdwcm9kdWN0aW9uJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGV2ZWxvcG1lbnQoKTogYm9vbGVhbiB7XG4gIHJldHVybiBkZXRlY3RFbnZpcm9ubWVudCgpID09PSAnZGV2ZWxvcG1lbnQnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZVJvdXRlKFxuICBwYXRobmFtZTogc3RyaW5nIHwgbnVsbCxcbiAgcGF0aFBhcmFtczogUmVjb3JkPHN0cmluZywgc3RyaW5nIHwgc3RyaW5nW10+IHwgbnVsbCxcbik6IHN0cmluZyB8IG51bGwge1xuICBpZiAoIXBhdGhuYW1lIHx8ICFwYXRoUGFyYW1zKSB7XG4gICAgcmV0dXJuIHBhdGhuYW1lO1xuICB9XG5cbiAgbGV0IHJlc3VsdCA9IHBhdGhuYW1lO1xuICB0cnkge1xuICAgIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhwYXRoUGFyYW1zKTtcbiAgICAvLyBzaW1wbGUga2V5cyBtdXN0IGJlIGhhbmRsZWQgZmlyc3RcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBlbnRyaWVzKSB7XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoZXIgPSB0dXJuVmFsdWVUb1JlZ0V4cCh2YWx1ZSk7XG4gICAgICAgIGlmIChtYXRjaGVyLnRlc3QocmVzdWx0KSkge1xuICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKG1hdGNoZXIsIGAvWyR7a2V5fV1gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBhcnJheSB2YWx1ZXMgbmV4dFxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGVudHJpZXMpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBjb25zdCBtYXRjaGVyID0gdHVyblZhbHVlVG9SZWdFeHAodmFsdWUuam9pbignLycpKTtcbiAgICAgICAgaWYgKG1hdGNoZXIudGVzdChyZXN1bHQpKSB7XG4gICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UobWF0Y2hlciwgYC9bLi4uJHtrZXl9XWApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gcGF0aG5hbWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gdHVyblZhbHVlVG9SZWdFeHAodmFsdWU6IHN0cmluZyk6IFJlZ0V4cCB7XG4gIHJldHVybiBuZXcgUmVnRXhwKGAvJHtlc2NhcGVSZWdFeHAodmFsdWUpfSg/PVsvPyNdfCQpYCk7XG59XG5cbmZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzdHJpbmc6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2csICdcXFxcJCYnKTtcbn1cbiIsImltcG9ydCB7IG5hbWUgYXMgcGFja2FnZU5hbWUsIHZlcnNpb24gfSBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHsgaW5pdFF1ZXVlIH0gZnJvbSAnLi9xdWV1ZSc7XG5pbXBvcnQgdHlwZSB7IFNwZWVkSW5zaWdodHNQcm9wcyB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgaXNCcm93c2VyLCBpc0RldmVsb3BtZW50LCBjb21wdXRlUm91dGUgfSBmcm9tICcuL3V0aWxzJztcblxuY29uc3QgU0NSSVBUX1VSTCA9IGBodHRwczovL3ZhLnZlcmNlbC1zY3JpcHRzLmNvbS92MS9zcGVlZC1pbnNpZ2h0c2A7XG5jb25zdCBQUk9EX1NDUklQVF9VUkwgPSBgJHtTQ1JJUFRfVVJMfS9zY3JpcHQuanNgO1xuY29uc3QgREVWX1NDUklQVF9VUkwgPSBgJHtTQ1JJUFRfVVJMfS9zY3JpcHQuZGVidWcuanNgO1xuY29uc3QgUFJPWFlfU0NSSVBUX1VSTCA9IGAvX3ZlcmNlbC9zcGVlZC1pbnNpZ2h0cy9zY3JpcHQuanNgO1xuXG4vKipcbiAqIEluamVjdHMgdGhlIFZlcmNlbCBTcGVlZCBJbnNpZ2h0cyBzY3JpcHQgaW50byB0aGUgcGFnZSBoZWFkIGFuZCBzdGFydHMgdHJhY2tpbmcgcGFnZSB2aWV3cy4gUmVhZCBtb3JlIGluIG91ciBbZG9jdW1lbnRhdGlvbl0oaHR0cHM6Ly92ZXJjZWwuY29tL2RvY3Mvc3BlZWQtaW5zaWdodHMpLlxuICogQHBhcmFtIFtwcm9wc10gLSBTcGVlZCBJbnNpZ2h0cyBvcHRpb25zLlxuICogQHBhcmFtIFtwcm9wcy5kZWJ1Z10gLSBXaGV0aGVyIHRvIGVuYWJsZSBkZWJ1ZyBsb2dnaW5nIGluIGRldmVsb3BtZW50LiBEZWZhdWx0cyB0byBgdHJ1ZWAuXG4gKiBAcGFyYW0gW3Byb3BzLmJlZm9yZVNlbmRdIC0gQSBtaWRkbGV3YXJlIGZ1bmN0aW9uIHRvIG1vZGlmeSBldmVudHMgYmVmb3JlIHRoZXkgYXJlIHNlbnQuIFNob3VsZCByZXR1cm4gdGhlIGV2ZW50IG9iamVjdCBvciBgbnVsbGAgdG8gY2FuY2VsIHRoZSBldmVudC5cbiAqIEBwYXJhbSBbcHJvcHMuc2FtcGxlUmF0ZV0gLSBXaGVuIHNldHRpbmcgdG8gMC41LCA1MCUgb2YgdGhlIGV2ZW50cyB3aWxsIGJlIHNlbnQgdG8gVmVyY2VsIFNwZWVkIEluc2lnaHRzLiBEZWZhdWx0cyB0byBgMWAuXG4gKiBAcGFyYW0gW3Byb3BzLnJvdXRlXSAtIFRoZSBkeW5hbWljIHJvdXRlIG9mIHRoZSBwYWdlLlxuICogQHBhcmFtIFtwcm9wcy5kc25dIC0gVGhlIERTTiBvZiB0aGUgcHJvamVjdCB0byBzZW5kIGV2ZW50cyB0by4gT25seSByZXF1aXJlZCB3aGVuIHNlbGYtaG9zdGluZy5cbiAqL1xuZnVuY3Rpb24gaW5qZWN0U3BlZWRJbnNpZ2h0cyhcbiAgcHJvcHM6IFNwZWVkSW5zaWdodHNQcm9wcyAmIHtcbiAgICBmcmFtZXdvcms/OiBzdHJpbmc7XG4gIH0gPSB7fSxcbik6IHtcbiAgc2V0Um91dGU6IChyb3V0ZTogc3RyaW5nIHwgbnVsbCkgPT4gdm9pZDtcbn0gfCBudWxsIHtcbiAgLy8gV2hlbiByb3V0ZSBpcyBudWxsLCBpdCBtZWFucyB0aGF0IHBhZ2VzIHJvdXRlciBpcyBub3QgcmVhZHkgeWV0LiBXaWxsIHJlc29sdmUgc29vblxuICBpZiAoIWlzQnJvd3NlcigpIHx8IHByb3BzLnJvdXRlID09PSBudWxsKSByZXR1cm4gbnVsbDtcblxuICBpbml0UXVldWUoKTtcblxuICBjb25zdCBpc1NlbGZIb3N0ZWQgPSBCb29sZWFuKHByb3BzLmRzbik7XG5cbiAgY29uc3QgcHJvZHVjdGlvblNjcmlwdCA9IGlzU2VsZkhvc3RlZCA/IFBST0RfU0NSSVBUX1VSTCA6IFBST1hZX1NDUklQVF9VUkw7XG5cbiAgY29uc3Qgc3JjID1cbiAgICBwcm9wcy5zY3JpcHRTcmMgfHwgKGlzRGV2ZWxvcG1lbnQoKSA/IERFVl9TQ1JJUFRfVVJMIDogcHJvZHVjdGlvblNjcmlwdCk7XG5cbiAgaWYgKGRvY3VtZW50LmhlYWQucXVlcnlTZWxlY3Rvcihgc2NyaXB0W3NyYyo9XCIke3NyY31cIl1gKSkgcmV0dXJuIG51bGw7XG5cbiAgaWYgKHByb3BzLmJlZm9yZVNlbmQpIHtcbiAgICB3aW5kb3cuc2k/LignYmVmb3JlU2VuZCcsIHByb3BzLmJlZm9yZVNlbmQpO1xuICB9XG5cbiAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gIHNjcmlwdC5zcmMgPSBzcmM7XG4gIHNjcmlwdC5kZWZlciA9IHRydWU7XG4gIHNjcmlwdC5kYXRhc2V0LnNka24gPVxuICAgIHBhY2thZ2VOYW1lICsgKHByb3BzLmZyYW1ld29yayA/IGAvJHtwcm9wcy5mcmFtZXdvcmt9YCA6ICcnKTtcbiAgc2NyaXB0LmRhdGFzZXQuc2RrdiA9IHZlcnNpb247XG5cbiAgaWYgKHByb3BzLnNhbXBsZVJhdGUpIHtcbiAgICBzY3JpcHQuZGF0YXNldC5zYW1wbGVSYXRlID0gcHJvcHMuc2FtcGxlUmF0ZS50b1N0cmluZygpO1xuICB9XG4gIGlmIChwcm9wcy5yb3V0ZSkge1xuICAgIHNjcmlwdC5kYXRhc2V0LnJvdXRlID0gcHJvcHMucm91dGU7XG4gIH1cbiAgaWYgKHByb3BzLmVuZHBvaW50KSB7XG4gICAgc2NyaXB0LmRhdGFzZXQuZW5kcG9pbnQgPSBwcm9wcy5lbmRwb2ludDtcbiAgfVxuICBpZiAocHJvcHMuZHNuKSB7XG4gICAgc2NyaXB0LmRhdGFzZXQuZHNuID0gcHJvcHMuZHNuO1xuICB9XG4gIGlmIChpc0RldmVsb3BtZW50KCkgJiYgcHJvcHMuZGVidWcgPT09IGZhbHNlKSB7XG4gICAgc2NyaXB0LmRhdGFzZXQuZGVidWcgPSAnZmFsc2UnO1xuICB9XG5cbiAgc2NyaXB0Lm9uZXJyb3IgPSAoKTogdm9pZCA9PiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGUgLS0gTG9nZ2luZyBpcyBva2F5IGhlcmVcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBbVmVyY2VsIFNwZWVkIEluc2lnaHRzXSBGYWlsZWQgdG8gbG9hZCBzY3JpcHQgZnJvbSAke3NyY30uIFBsZWFzZSBjaGVjayBpZiBhbnkgY29udGVudCBibG9ja2VycyBhcmUgZW5hYmxlZCBhbmQgdHJ5IGFnYWluLmAsXG4gICAgKTtcbiAgfTtcblxuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG5cbiAgcmV0dXJuIHtcbiAgICBzZXRSb3V0ZTogKHJvdXRlOiBzdHJpbmcgfCBudWxsKTogdm9pZCA9PiB7XG4gICAgICBzY3JpcHQuZGF0YXNldC5yb3V0ZSA9IHJvdXRlID8/IHVuZGVmaW5lZDtcbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgeyBpbmplY3RTcGVlZEluc2lnaHRzLCBjb21wdXRlUm91dGUgfTtcbmV4cG9ydCB0eXBlIHsgU3BlZWRJbnNpZ2h0c1Byb3BzIH07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tZGVmYXVsdC1leHBvcnQgLS0gQWxsb3cgZGVmYXVsdCBleHBvcnRcbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5qZWN0U3BlZWRJbnNpZ2h0cyxcbiAgY29tcHV0ZVJvdXRlLFxufTtcbiIsIid1c2UgY2xpZW50Jztcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bm5lY2Vzc2FyeS1jb25kaXRpb24gLS0gY2FuIGJlIGVtcHR5IGluIHBhZ2VzIHJvdXRlciAqL1xuaW1wb3J0IHsgdXNlUGFyYW1zLCB1c2VQYXRobmFtZSwgdXNlU2VhcmNoUGFyYW1zIH0gZnJvbSAnbmV4dC9uYXZpZ2F0aW9uLmpzJztcbmltcG9ydCB7IGNvbXB1dGVSb3V0ZSB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGNvbnN0IHVzZVJvdXRlID0gKCk6IHN0cmluZyB8IG51bGwgPT4ge1xuICBjb25zdCBwYXJhbXMgPSB1c2VQYXJhbXMoKTtcbiAgY29uc3Qgc2VhcmNoUGFyYW1zID0gdXNlU2VhcmNoUGFyYW1zKCkgfHwgbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICBjb25zdCBwYXRoID0gdXNlUGF0aG5hbWUoKTtcblxuICBjb25zdCBmaW5hbFBhcmFtcyA9IHtcbiAgICAuLi5PYmplY3QuZnJvbUVudHJpZXMoc2VhcmNoUGFyYW1zLmVudHJpZXMoKSksXG4gICAgLi4uKHBhcmFtcyB8fCB7fSksXG4gIH07XG5cbiAgcmV0dXJuIHBhcmFtcyA/IGNvbXB1dGVSb3V0ZShwYXRoLCBmaW5hbFBhcmFtcykgOiBudWxsO1xufTtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsIlN1c3BlbnNlIiwidXNlRWZmZWN0IiwidXNlUmVmIiwibmFtZSIsInZlcnNpb24iLCJpbml0UXVldWUiLCJ3aW5kb3ciLCJzaSIsImEiLCJwYXJhbXMiLCJzaXEiLCJwdXNoIiwiaXNCcm93c2VyIiwiZGV0ZWN0RW52aXJvbm1lbnQiLCJlbnYiLCJlIiwiaXNEZXZlbG9wbWVudCIsImNvbXB1dGVSb3V0ZSIsInBhdGhuYW1lIiwicGF0aFBhcmFtcyIsInJlc3VsdCIsImVudHJpZXMiLCJPYmplY3QiLCJrZXkiLCJ2YWx1ZSIsIkFycmF5IiwiaXNBcnJheSIsIm1hdGNoZXIiLCJ0dXJuVmFsdWVUb1JlZ0V4cCIsInRlc3QiLCJyZXBsYWNlIiwiam9pbiIsIlJlZ0V4cCIsImVzY2FwZVJlZ0V4cCIsInN0cmluZyIsIlNDUklQVF9VUkwiLCJQUk9EX1NDUklQVF9VUkwiLCJERVZfU0NSSVBUX1VSTCIsIlBST1hZX1NDUklQVF9VUkwiLCJpbmplY3RTcGVlZEluc2lnaHRzIiwicHJvcHMiLCJfYSIsInJvdXRlIiwiaXNTZWxmSG9zdGVkIiwiQm9vbGVhbiIsImRzbiIsInByb2R1Y3Rpb25TY3JpcHQiLCJzcmMiLCJzY3JpcHRTcmMiLCJkb2N1bWVudCIsImhlYWQiLCJxdWVyeVNlbGVjdG9yIiwiYmVmb3JlU2VuZCIsImNhbGwiLCJzY3JpcHQiLCJjcmVhdGVFbGVtZW50IiwiZGVmZXIiLCJkYXRhc2V0Iiwic2RrbiIsImZyYW1ld29yayIsInNka3YiLCJzYW1wbGVSYXRlIiwidG9TdHJpbmciLCJlbmRwb2ludCIsImRlYnVnIiwib25lcnJvciIsImNvbnNvbGUiLCJsb2ciLCJhcHBlbmRDaGlsZCIsInNldFJvdXRlIiwiU3BlZWRJbnNpZ2h0cyIsInNldFNjcmlwdFJvdXRlIiwiY3VycmVudCIsInVzZVBhcmFtcyIsInVzZVBhdGhuYW1lIiwidXNlU2VhcmNoUGFyYW1zIiwidXNlUm91dGUiLCJzZWFyY2hQYXJhbXMiLCJVUkxTZWFyY2hQYXJhbXMiLCJwYXRoIiwiZmluYWxQYXJhbXMiLCJmcm9tRW50cmllcyIsIlNwZWVkSW5zaWdodHNDb21wb25lbnQiLCJmYWxsYmFjayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/@vercel/speed-insights/dist/next/index.mjs\n");

/***/ }),

/***/ "(rsc)/./node_modules/@vercel/speed-insights/dist/next/index.mjs":
/*!*****************************************************************!*\
  !*** ./node_modules/@vercel/speed-insights/dist/next/index.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SpeedInsights: () => (/* binding */ e0)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/build/webpack/loaders/next-flight-loader/module-proxy */ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js");

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`C:\Users\sabri\Documents\GitHub\trackr_vercel\node_modules\@vercel\speed-insights\dist\next\index.mjs`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;

const e0 = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`C:\Users\sabri\Documents\GitHub\trackr_vercel\node_modules\@vercel\speed-insights\dist\next\index.mjs#SpeedInsights`);


/***/ })

};
;