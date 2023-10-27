"use strict";
cc._RF.push(module, '9f122CggJlCcLDqnh4JO1B6', 'Utils');
// Scripts/Tools/Utils.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = /** @class */ (function () {
    function Utils() {
    }
    // [start, end] 范围内的整数
    Utils.random_int = function (start, end) {
        var num = start + Math.random() * (end - start + 1); // [0, 1]
        num = Math.floor(num);
        if (num > end) {
            num = end;
        }
        return num;
    };
    return Utils;
}());
exports.default = Utils;

cc._RF.pop();