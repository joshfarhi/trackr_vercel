"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/(dashboard)/page",{

/***/ "(app-pages-browser)/./app/(dashboard)/_components/ProductPicker.tsx":
/*!*******************************************************!*\
  !*** ./app/(dashboard)/_components/ProductPicker.tsx ***!
  \*******************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _app_dashboard_components_CreateProductDialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/app/(dashboard)/_components/CreateProductDialog */ \"(app-pages-browser)/./app/(dashboard)/_components/CreateProductDialog.tsx\");\n/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/ui/button */ \"(app-pages-browser)/./components/ui/button.tsx\");\n/* harmony import */ var _components_ui_command__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/ui/command */ \"(app-pages-browser)/./components/ui/command.tsx\");\n/* harmony import */ var _components_ui_popover__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/ui/popover */ \"(app-pages-browser)/./components/ui/popover.tsx\");\n/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/lib/utils */ \"(app-pages-browser)/./lib/utils.ts\");\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tanstack/react-query */ \"(app-pages-browser)/./node_modules/@tanstack/react-query/build/modern/useQuery.js\");\n/* harmony import */ var _barrel_optimize_names_Check_ChevronsUpDown_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! __barrel_optimize__?names=Check,ChevronsUpDown!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/chevrons-up-down.js\");\n/* harmony import */ var _barrel_optimize_names_Check_ChevronsUpDown_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! __barrel_optimize__?names=Check,ChevronsUpDown!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/check.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\nfunction ProductPicker(param) {\n    let { onChange } = param;\n    _s();\n    const [open, setOpen] = react__WEBPACK_IMPORTED_MODULE_6___default().useState(false);\n    const [value, setValue] = react__WEBPACK_IMPORTED_MODULE_6___default().useState(\"\");\n    (0,react__WEBPACK_IMPORTED_MODULE_6__.useEffect)(()=>{\n        if (!value) return;\n        // when the value changes, call onChange callback\n        onChange(value);\n    }, [\n        onChange,\n        value\n    ]);\n    const productsQuery = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_7__.useQuery)({\n        queryKey: [\n            \"products\"\n        ],\n        queryFn: ()=>fetch(\"/api/products\").then((res)=>res.json())\n    });\n    // Ensure productsQuery.data is an array\n    const products = Array.isArray(productsQuery.data) ? productsQuery.data : [];\n    const selectedProduct = products.find((product)=>product.product === value);\n    const successCallback = (0,react__WEBPACK_IMPORTED_MODULE_6__.useCallback)((product)=>{\n        setValue(product.product);\n        setOpen((prev)=>!prev);\n    }, [\n        setValue,\n        setOpen\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_4__.Popover, {\n        open: open,\n        onOpenChange: setOpen,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_4__.PopoverTrigger, {\n                asChild: true,\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__.Button, {\n                    variant: \"outline\",\n                    role: \"combobox\",\n                    \"aria-expanded\": open,\n                    className: \"w-[200px] justify-between\",\n                    children: [\n                        selectedProduct ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ProductRow, {\n                            product: selectedProduct\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\sabri\\\\Documents\\\\GitHub\\\\trackr_vercel\\\\app\\\\(dashboard)\\\\_components\\\\ProductPicker.tsx\",\n                            lineNumber: 70,\n                            columnNumber: 13\n                        }, this) : \"Select product\",\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Check_ChevronsUpDown_lucide_react__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                            className: \"ml-2 h-4 w-4 shrink-0 opacity-50\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\sabri\\\\Documents\\\\GitHub\\\\trackr_vercel\\\\app\\\\(dashboard)\\\\_components\\\\ProductPicker.tsx\",\n                            lineNumber: 74,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\sabri\\\\Documents\\\\GitHub\\\\trackr_vercel\\\\app\\\\(dashboard)\\\\_components\\\\ProductPicker.tsx\",\n                    lineNumber: 63,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\sabri\\\\Documents\\\\GitHub\\\\trackr_vercel\\\\app\\\\(dashboard)\\\\_components\\\\ProductPicker.tsx\",\n                lineNumber: 62,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_4__.PopoverContent, {\n                className: \"w-[200px] p-0\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_command__WEBPACK_IMPORTED_MODULE_3__.Command, {\n                    onSubmit: (e)=>{\n                        e.preventDefault();\n                    },\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_command__WEBPACK_IMPORTED_MODULE_3__.CommandInput, {\n                            placeholder: \"Search product...\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\sabri\\\\Documents\\\\GitHub\\\\trackr_vercel\\\\app\\\\(dashboard)\\\\_components\\\\ProductPicker.tsx\",\n                            lineNumber: 83,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_app_dashboard_components_CreateProductDialog__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                            successCallback: successCallback,\n                            trigger: undefined\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\sabri\\\\Documents\\\\GitHub\\\\trackr_vercel\\\\app\\\\(dashboard)\\\\_components\\\\ProductPicker.tsx\",\n                            lineNumber: 84,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_command__WEBPACK_IMPORTED_MODULE_3__.CommandEmpty, {\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    children: \"Product not found\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\sabri\\\\Documents\\\\GitHub\\\\trackr_vercel\\\\app\\\\(dashboard)\\\\_components\\\\ProductPicker.tsx\",\n                                    lineNumber: 86,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    className: \"text-xs text-muted-foreground\",\n                                    children: \"Tip: Create a new product\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\sabri\\\\Documents\\\\GitHub\\\\trackr_vercel\\\\app\\\\(dashboard)\\\\_components\\\\ProductPicker.tsx\",\n                                    lineNumber: 87,\n                                    columnNumber: 13\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\sabri\\\\Documents\\\\GitHub\\\\trackr_vercel\\\\app\\\\(dashboard)\\\\_components\\\\ProductPicker.tsx\",\n                            lineNumber: 85,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_command__WEBPACK_IMPORTED_MODULE_3__.CommandGroup, {\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_command__WEBPACK_IMPORTED_MODULE_3__.CommandList, {\n                                children: products.map((product)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_command__WEBPACK_IMPORTED_MODULE_3__.CommandItem, {\n                                        onSelect: ()=>{\n                                            setValue(product.product);\n                                            setOpen((prev)=>!prev);\n                                        },\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ProductRow, {\n                                                product: product\n                                            }, void 0, false, {\n                                                fileName: \"C:\\\\Users\\\\sabri\\\\Documents\\\\GitHub\\\\trackr_vercel\\\\app\\\\(dashboard)\\\\_components\\\\ProductPicker.tsx\",\n                                                lineNumber: 101,\n                                                columnNumber: 19\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Check_ChevronsUpDown_lucide_react__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n                                                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_5__.cn)(\"mr-2 w-4 h-4 opacity-0\", value === product.product && \"opacity-100\")\n                                            }, void 0, false, {\n                                                fileName: \"C:\\\\Users\\\\sabri\\\\Documents\\\\GitHub\\\\trackr_vercel\\\\app\\\\(dashboard)\\\\_components\\\\ProductPicker.tsx\",\n                                                lineNumber: 102,\n                                                columnNumber: 19\n                                            }, this)\n                                        ]\n                                    }, product.product, true, {\n                                        fileName: \"C:\\\\Users\\\\sabri\\\\Documents\\\\GitHub\\\\trackr_vercel\\\\app\\\\(dashboard)\\\\_components\\\\ProductPicker.tsx\",\n                                        lineNumber: 94,\n                                        columnNumber: 17\n                                    }, this))\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\sabri\\\\Documents\\\\GitHub\\\\trackr_vercel\\\\app\\\\(dashboard)\\\\_components\\\\ProductPicker.tsx\",\n                                lineNumber: 92,\n                                columnNumber: 13\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\sabri\\\\Documents\\\\GitHub\\\\trackr_vercel\\\\app\\\\(dashboard)\\\\_components\\\\ProductPicker.tsx\",\n                            lineNumber: 91,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\sabri\\\\Documents\\\\GitHub\\\\trackr_vercel\\\\app\\\\(dashboard)\\\\_components\\\\ProductPicker.tsx\",\n                    lineNumber: 78,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\sabri\\\\Documents\\\\GitHub\\\\trackr_vercel\\\\app\\\\(dashboard)\\\\_components\\\\ProductPicker.tsx\",\n                lineNumber: 77,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\sabri\\\\Documents\\\\GitHub\\\\trackr_vercel\\\\app\\\\(dashboard)\\\\_components\\\\ProductPicker.tsx\",\n        lineNumber: 61,\n        columnNumber: 5\n    }, this);\n}\n_s(ProductPicker, \"2QHKZZFHPBE3+ubOc4+cpZCHmX8=\", false, function() {\n    return [\n        _tanstack_react_query__WEBPACK_IMPORTED_MODULE_7__.useQuery\n    ];\n});\n_c = ProductPicker;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ProductPicker);\nfunction ProductRow(param) {\n    let { product } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex items-center gap-2\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n            children: product.product\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\sabri\\\\Documents\\\\GitHub\\\\trackr_vercel\\\\app\\\\(dashboard)\\\\_components\\\\ProductPicker.tsx\",\n            lineNumber: 124,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\sabri\\\\Documents\\\\GitHub\\\\trackr_vercel\\\\app\\\\(dashboard)\\\\_components\\\\ProductPicker.tsx\",\n        lineNumber: 122,\n        columnNumber: 5\n    }, this);\n}\n_c1 = ProductRow;\nvar _c, _c1;\n$RefreshReg$(_c, \"ProductPicker\");\n$RefreshReg$(_c1, \"ProductRow\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC8oZGFzaGJvYXJkKS9fY29tcG9uZW50cy9Qcm9kdWN0UGlja2VyLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUVvRjtBQUNwQztBQVFmO0FBS0E7QUFFQTtBQUVnQjtBQUNJO0FBQ1c7QUFNaEUsU0FBU2tCLGNBQWMsS0FBbUI7UUFBbkIsRUFBRUMsUUFBUSxFQUFTLEdBQW5COztJQUNyQixNQUFNLENBQUNDLE1BQU1DLFFBQVEsR0FBR04scURBQWMsQ0FBQztJQUN2QyxNQUFNLENBQUNRLE9BQU9DLFNBQVMsR0FBR1QscURBQWMsQ0FBQztJQUV6Q0UsZ0RBQVNBLENBQUM7UUFDUixJQUFJLENBQUNNLE9BQU87UUFDWixpREFBaUQ7UUFDakRKLFNBQVNJO0lBQ1gsR0FBRztRQUFDSjtRQUFVSTtLQUFNO0lBRXBCLE1BQU1FLGdCQUFnQmIsK0RBQVFBLENBQUM7UUFDN0JjLFVBQVU7WUFBQztTQUFXO1FBQ3RCQyxTQUFTLElBQ1BDLE1BQU8saUJBQWdCQyxJQUFJLENBQUMsQ0FBQ0MsTUFBUUEsSUFBSUMsSUFBSTtJQUNqRDtJQUVBLHdDQUF3QztJQUN4QyxNQUFNQyxXQUFXQyxNQUFNQyxPQUFPLENBQUNULGNBQWNVLElBQUksSUFBSVYsY0FBY1UsSUFBSSxHQUFHLEVBQUU7SUFFNUUsTUFBTUMsa0JBQWtCSixTQUFTSyxJQUFJLENBQ25DLENBQUNDLFVBQXFCQSxRQUFRQSxPQUFPLEtBQUtmO0lBRzVDLE1BQU1nQixrQkFBa0J2QixrREFBV0EsQ0FDakMsQ0FBQ3NCO1FBQ0NkLFNBQVNjLFFBQVFBLE9BQU87UUFDeEJqQixRQUFRLENBQUNtQixPQUFTLENBQUNBO0lBQ3JCLEdBQ0E7UUFBQ2hCO1FBQVVIO0tBQVE7SUFHckIscUJBQ0UsOERBQUNiLDJEQUFPQTtRQUFDWSxNQUFNQTtRQUFNcUIsY0FBY3BCOzswQkFDakMsOERBQUNYLGtFQUFjQTtnQkFBQ2dDLE9BQU87MEJBQ3JCLDRFQUFDekMseURBQU1BO29CQUNMMEMsU0FBUztvQkFDVEMsTUFBSztvQkFDTEMsaUJBQWV6QjtvQkFDZjBCLFdBQVU7O3dCQUVUVixnQ0FDQyw4REFBQ1c7NEJBQVdULFNBQVNGOzs7OzttQ0FFckI7c0NBRUYsOERBQUN0QixnR0FBY0E7NEJBQUNnQyxXQUFVOzs7Ozs7Ozs7Ozs7Ozs7OzswQkFHOUIsOERBQUNyQyxrRUFBY0E7Z0JBQUNxQyxXQUFVOzBCQUN4Qiw0RUFBQzVDLDJEQUFPQTtvQkFDTjhDLFVBQVUsQ0FBQ0M7d0JBQ1RBLEVBQUVDLGNBQWM7b0JBQ2xCOztzQ0FFQSw4REFBQzdDLGdFQUFZQTs0QkFBQzhDLGFBQVk7Ozs7OztzQ0FDMUIsOERBQUNuRCxxRkFBbUJBOzRCQUFDdUMsaUJBQWlCQTs0QkFBaUJhLFNBQVNDOzs7Ozs7c0NBQ2hFLDhEQUFDbEQsZ0VBQVlBOzs4Q0FDWCw4REFBQ21EOzhDQUFFOzs7Ozs7OENBQ0gsOERBQUNBO29DQUFFUixXQUFVOzhDQUFnQzs7Ozs7Ozs7Ozs7O3NDQUkvQyw4REFBQzFDLGdFQUFZQTtzQ0FDWCw0RUFBQ0csK0RBQVdBOzBDQUNUeUIsU0FBU3VCLEdBQUcsQ0FBQyxDQUFDakIsd0JBQ2IsOERBQUNoQywrREFBV0E7d0NBRVZrRCxVQUFVOzRDQUNSaEMsU0FBU2MsUUFBUUEsT0FBTzs0Q0FDeEJqQixRQUFRLENBQUNtQixPQUFTLENBQUNBO3dDQUNyQjs7MERBRUEsOERBQUNPO2dEQUFXVCxTQUFTQTs7Ozs7OzBEQUNyQiw4REFBQ3pCLGdHQUFLQTtnREFDSmlDLFdBQVduQyw4Q0FBRUEsQ0FDWCwwQkFDQVksVUFBVWUsUUFBUUEsT0FBTyxJQUFJOzs7Ozs7O3VDQVY1QkEsUUFBUUEsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQnRDO0dBdkZTcEI7O1FBVWVOLDJEQUFRQTs7O0tBVnZCTTtBQXlGVCwrREFBZUEsYUFBYUEsRUFBQztBQUU3QixTQUFTNkIsV0FBVyxLQUFpQztRQUFqQyxFQUFFVCxPQUFPLEVBQXdCLEdBQWpDO0lBQ2xCLHFCQUNFLDhEQUFDbUI7UUFBSVgsV0FBVTtrQkFFYiw0RUFBQ1k7c0JBQU1wQixRQUFRQSxPQUFPOzs7Ozs7Ozs7OztBQUc1QjtNQVBTUyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvKGRhc2hib2FyZCkvX2NvbXBvbmVudHMvUHJvZHVjdFBpY2tlci50c3g/MjY0YSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcclxuXHJcbmltcG9ydCBDcmVhdGVQcm9kdWN0RGlhbG9nIGZyb20gXCJAL2FwcC8oZGFzaGJvYXJkKS9fY29tcG9uZW50cy9DcmVhdGVQcm9kdWN0RGlhbG9nXCI7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvYnV0dG9uXCI7XHJcbmltcG9ydCB7XHJcbiAgQ29tbWFuZCxcclxuICBDb21tYW5kRW1wdHksXHJcbiAgQ29tbWFuZEdyb3VwLFxyXG4gIENvbW1hbmRJbnB1dCxcclxuICBDb21tYW5kSXRlbSxcclxuICBDb21tYW5kTGlzdCxcclxufSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL2NvbW1hbmRcIjtcclxuaW1wb3J0IHtcclxuICBQb3BvdmVyLFxyXG4gIFBvcG92ZXJDb250ZW50LFxyXG4gIFBvcG92ZXJUcmlnZ2VyLFxyXG59IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvcG9wb3ZlclwiO1xyXG5pbXBvcnQgeyBUcmFuc2FjdGlvblR5cGUgfSBmcm9tIFwiQC9saWIvdHlwZXNcIjtcclxuaW1wb3J0IHsgY24gfSBmcm9tIFwiQC9saWIvdXRpbHNcIjtcclxuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xyXG5pbXBvcnQgeyB1c2VRdWVyeSB9IGZyb20gXCJAdGFuc3RhY2svcmVhY3QtcXVlcnlcIjtcclxuaW1wb3J0IHsgQ2hlY2ssIENoZXZyb25zVXBEb3duIH0gZnJvbSBcImx1Y2lkZS1yZWFjdFwiO1xyXG5pbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmludGVyZmFjZSBQcm9wcyB7XHJcbiAgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG59XHJcblxyXG5mdW5jdGlvbiBQcm9kdWN0UGlja2VyKHsgb25DaGFuZ2UgfTogUHJvcHMpIHtcclxuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3ZhbHVlLCBzZXRWYWx1ZV0gPSBSZWFjdC51c2VTdGF0ZShcIlwiKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghdmFsdWUpIHJldHVybjtcclxuICAgIC8vIHdoZW4gdGhlIHZhbHVlIGNoYW5nZXMsIGNhbGwgb25DaGFuZ2UgY2FsbGJhY2tcclxuICAgIG9uQ2hhbmdlKHZhbHVlKTtcclxuICB9LCBbb25DaGFuZ2UsIHZhbHVlXSk7XHJcblxyXG4gIGNvbnN0IHByb2R1Y3RzUXVlcnkgPSB1c2VRdWVyeSh7XHJcbiAgICBxdWVyeUtleTogW1wicHJvZHVjdHNcIl0sXHJcbiAgICBxdWVyeUZuOiAoKSA9PlxyXG4gICAgICBmZXRjaChgL2FwaS9wcm9kdWN0c2ApLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSksXHJcbiAgfSk7XHJcblxyXG4gIC8vIEVuc3VyZSBwcm9kdWN0c1F1ZXJ5LmRhdGEgaXMgYW4gYXJyYXlcclxuICBjb25zdCBwcm9kdWN0cyA9IEFycmF5LmlzQXJyYXkocHJvZHVjdHNRdWVyeS5kYXRhKSA/IHByb2R1Y3RzUXVlcnkuZGF0YSA6IFtdO1xyXG5cclxuICBjb25zdCBzZWxlY3RlZFByb2R1Y3QgPSBwcm9kdWN0cy5maW5kKFxyXG4gICAgKHByb2R1Y3Q6IFByb2R1Y3QpID0+IHByb2R1Y3QucHJvZHVjdCA9PT0gdmFsdWVcclxuICApO1xyXG5cclxuICBjb25zdCBzdWNjZXNzQ2FsbGJhY2sgPSB1c2VDYWxsYmFjayhcclxuICAgIChwcm9kdWN0OiBQcm9kdWN0KSA9PiB7XHJcbiAgICAgIHNldFZhbHVlKHByb2R1Y3QucHJvZHVjdCk7XHJcbiAgICAgIHNldE9wZW4oKHByZXYpID0+ICFwcmV2KTtcclxuICAgIH0sXHJcbiAgICBbc2V0VmFsdWUsIHNldE9wZW5dXHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxQb3BvdmVyIG9wZW49e29wZW59IG9uT3BlbkNoYW5nZT17c2V0T3Blbn0+XHJcbiAgICAgIDxQb3BvdmVyVHJpZ2dlciBhc0NoaWxkPlxyXG4gICAgICAgIDxCdXR0b25cclxuICAgICAgICAgIHZhcmlhbnQ9e1wib3V0bGluZVwifVxyXG4gICAgICAgICAgcm9sZT1cImNvbWJvYm94XCJcclxuICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9e29wZW59XHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJ3LVsyMDBweF0ganVzdGlmeS1iZXR3ZWVuXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICB7c2VsZWN0ZWRQcm9kdWN0ID8gKFxyXG4gICAgICAgICAgICA8UHJvZHVjdFJvdyBwcm9kdWN0PXtzZWxlY3RlZFByb2R1Y3R9IC8+XHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICBcIlNlbGVjdCBwcm9kdWN0XCJcclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICA8Q2hldnJvbnNVcERvd24gY2xhc3NOYW1lPVwibWwtMiBoLTQgdy00IHNocmluay0wIG9wYWNpdHktNTBcIiAvPlxyXG4gICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICA8L1BvcG92ZXJUcmlnZ2VyPlxyXG4gICAgICA8UG9wb3ZlckNvbnRlbnQgY2xhc3NOYW1lPVwidy1bMjAwcHhdIHAtMFwiPlxyXG4gICAgICAgIDxDb21tYW5kXHJcbiAgICAgICAgICBvblN1Ym1pdD17KGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgfX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8Q29tbWFuZElucHV0IHBsYWNlaG9sZGVyPVwiU2VhcmNoIHByb2R1Y3QuLi5cIiAvPlxyXG4gICAgICAgICAgPENyZWF0ZVByb2R1Y3REaWFsb2cgc3VjY2Vzc0NhbGxiYWNrPXtzdWNjZXNzQ2FsbGJhY2t9IHRyaWdnZXI9e3VuZGVmaW5lZH0gLz5cclxuICAgICAgICAgIDxDb21tYW5kRW1wdHk+XHJcbiAgICAgICAgICAgIDxwPlByb2R1Y3Qgbm90IGZvdW5kPC9wPlxyXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiPlxyXG4gICAgICAgICAgICAgIFRpcDogQ3JlYXRlIGEgbmV3IHByb2R1Y3RcclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPC9Db21tYW5kRW1wdHk+XHJcbiAgICAgICAgICA8Q29tbWFuZEdyb3VwPlxyXG4gICAgICAgICAgICA8Q29tbWFuZExpc3Q+XHJcbiAgICAgICAgICAgICAge3Byb2R1Y3RzLm1hcCgocHJvZHVjdDogUHJvZHVjdCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPENvbW1hbmRJdGVtXHJcbiAgICAgICAgICAgICAgICAgIGtleT17cHJvZHVjdC5wcm9kdWN0fVxyXG4gICAgICAgICAgICAgICAgICBvblNlbGVjdD17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFZhbHVlKHByb2R1Y3QucHJvZHVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0T3BlbigocHJldikgPT4gIXByZXYpO1xyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICA8UHJvZHVjdFJvdyBwcm9kdWN0PXtwcm9kdWN0fSAvPlxyXG4gICAgICAgICAgICAgICAgICA8Q2hlY2tcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NuKFxyXG4gICAgICAgICAgICAgICAgICAgICAgXCJtci0yIHctNCBoLTQgb3BhY2l0eS0wXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9PT0gcHJvZHVjdC5wcm9kdWN0ICYmIFwib3BhY2l0eS0xMDBcIlxyXG4gICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L0NvbW1hbmRJdGVtPlxyXG4gICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8L0NvbW1hbmRMaXN0PlxyXG4gICAgICAgICAgPC9Db21tYW5kR3JvdXA+XHJcbiAgICAgICAgPC9Db21tYW5kPlxyXG4gICAgICA8L1BvcG92ZXJDb250ZW50PlxyXG4gICAgPC9Qb3BvdmVyPlxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2R1Y3RQaWNrZXI7XHJcblxyXG5mdW5jdGlvbiBQcm9kdWN0Um93KHsgcHJvZHVjdCB9OiB7IHByb2R1Y3Q6IFByb2R1Y3QgfSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XHJcbiAgICAgIHsvKiA8c3BhbiByb2xlPVwiaW1nXCI+e3Byb2R1Y3QuaWNvbn08L3NwYW4+ICovfVxyXG4gICAgICA8c3Bhbj57cHJvZHVjdC5wcm9kdWN0fTwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn0iXSwibmFtZXMiOlsiQ3JlYXRlUHJvZHVjdERpYWxvZyIsIkJ1dHRvbiIsIkNvbW1hbmQiLCJDb21tYW5kRW1wdHkiLCJDb21tYW5kR3JvdXAiLCJDb21tYW5kSW5wdXQiLCJDb21tYW5kSXRlbSIsIkNvbW1hbmRMaXN0IiwiUG9wb3ZlciIsIlBvcG92ZXJDb250ZW50IiwiUG9wb3ZlclRyaWdnZXIiLCJjbiIsInVzZVF1ZXJ5IiwiQ2hlY2siLCJDaGV2cm9uc1VwRG93biIsIlJlYWN0IiwidXNlQ2FsbGJhY2siLCJ1c2VFZmZlY3QiLCJQcm9kdWN0UGlja2VyIiwib25DaGFuZ2UiLCJvcGVuIiwic2V0T3BlbiIsInVzZVN0YXRlIiwidmFsdWUiLCJzZXRWYWx1ZSIsInByb2R1Y3RzUXVlcnkiLCJxdWVyeUtleSIsInF1ZXJ5Rm4iLCJmZXRjaCIsInRoZW4iLCJyZXMiLCJqc29uIiwicHJvZHVjdHMiLCJBcnJheSIsImlzQXJyYXkiLCJkYXRhIiwic2VsZWN0ZWRQcm9kdWN0IiwiZmluZCIsInByb2R1Y3QiLCJzdWNjZXNzQ2FsbGJhY2siLCJwcmV2Iiwib25PcGVuQ2hhbmdlIiwiYXNDaGlsZCIsInZhcmlhbnQiLCJyb2xlIiwiYXJpYS1leHBhbmRlZCIsImNsYXNzTmFtZSIsIlByb2R1Y3RSb3ciLCJvblN1Ym1pdCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInBsYWNlaG9sZGVyIiwidHJpZ2dlciIsInVuZGVmaW5lZCIsInAiLCJtYXAiLCJvblNlbGVjdCIsImRpdiIsInNwYW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/(dashboard)/_components/ProductPicker.tsx\n"));

/***/ })

});