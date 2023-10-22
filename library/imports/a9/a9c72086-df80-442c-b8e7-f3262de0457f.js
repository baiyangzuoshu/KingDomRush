"use strict";
cc._RF.push(module, 'a9c72CG34BELLjn8yYt4EV/', 'ExcelManager');
// FrameWork/manager/ExcelManager.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelManager = void 0;
var CSVParser_1 = require("./../3rd/CSVParser");
var ExcelManager = /** @class */ (function (_super) {
    __extends(ExcelManager, _super);
    function ExcelManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.csvTables = {};
        _this.csvTableForArr = {};
        _this.tableCast = {};
        _this.tableComment = {};
        return _this;
    }
    ExcelManager.getInstance = function () {
        return ExcelManager._instance;
    };
    ExcelManager.prototype.onLoad = function () {
        if (ExcelManager._instance === null) {
            ExcelManager._instance = this;
        }
        else {
            this.destroy();
            return;
        }
    };
    // 添加一个表格到我们的表格管理里面来;
    // excelName: 表格的名字;
    // tableContent: 表格的文本内容;
    // force: 同名的表格文件，
    // 如果是同名的,我们如果是force 为true那么我们就替换，否则我们就直接返回用原来的;
    ExcelManager.prototype.AddExcelTable = function (excelName, tableContent, force) {
        if (this.csvTables[excelName] && !force) {
            return;
        }
        var tableData = {};
        var tableArr = [];
        var opts = { header: true };
        CSVParser_1.default.parse(tableContent, opts, function (row, keyname) {
            // row: 这一行的object对象; { ID: 4, type: 3, mapName:  "map004", ...}
            // keyname: 就是我们的主键;
            tableData[row[keyname]] = row;
            tableArr.push(row);
        });
        this.tableCast[excelName] = CSVParser_1.default.opts.cast;
        this.tableComment[excelName] = CSVParser_1.default.opts.comment;
        this.csvTables[excelName] = tableData; // 主键值---》rowObject
        this.csvTableForArr[excelName] = tableArr;
    };
    // 返回的是我们查询到的数据
    // 满足条件有一条，满足条件有多条
    // excelName: 表格的名字
    // key: 查询字段的名字
    // value: 查询字段的值
    // return: 第一条满足条件的记录
    ExcelManager.prototype.QueryOneFromExcel = function (excelName, key, value) {
        var table = this.GetExcelObject(excelName);
        if (!table) {
            return null;
        }
        if (key) { // 普通键
            for (var tbItem in table) {
                if (!table.hasOwnProperty(tbItem)) {
                    continue;
                }
                if (table[tbItem][key] === value) {
                    return table[tbItem];
                }
            }
        }
        else { // value当作我们的主键来查询;
            return table[value];
        }
        return null;
    };
    ExcelManager.prototype.QueryAllFromExcel = function (excelName, key, value) {
        return null;
    };
    ExcelManager.prototype.GetExcelArray = function (excelName) {
        return this.csvTableForArr[excelName];
    };
    // {主键值1:  line对象, 主键值2: line对象}
    ExcelManager.prototype.GetExcelObject = function (excelName) {
        return this.csvTables[excelName];
    };
    ExcelManager._instance = null;
    return ExcelManager;
}(cc.Component));
exports.ExcelManager = ExcelManager;

cc._RF.pop();