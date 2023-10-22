

import CSV from "./../3rd/CSVParser";

export class ExcelManager extends cc.Component {
    private static _instance: ExcelManager = null!;
    public static getInstance():ExcelManager{
        return ExcelManager._instance
    }

    private csvTables: any = {};
    private csvTableForArr:any = {};

    private tableCast:any = {};
    private tableComment:any = {};
    

    onLoad(): void {
        if(ExcelManager._instance === null) {
            ExcelManager._instance = this;
        }
        else {
            this.destroy();
            return;
        }
    }

    // 添加一个表格到我们的表格管理里面来;
    // excelName: 表格的名字;
    // tableContent: 表格的文本内容;
    // force: 同名的表格文件，
    // 如果是同名的,我们如果是force 为true那么我们就替换，否则我们就直接返回用原来的;
    public AddExcelTable(excelName: string, tableContent: string, force?:boolean): void {
        if(this.csvTables[excelName] && !force) {
            return;
        }

        var tableData = {};
        var tableArr = []; 

        var opts = { header: true };
        CSV.parse(tableContent, opts, function (row, keyname) {
            // row: 这一行的object对象; { ID: 4, type: 3, mapName:  "map004", ...}
            // keyname: 就是我们的主键;
            tableData[row[keyname]] = row;
            tableArr.push(row);
        });

        this.tableCast[excelName] = (CSV as any).opts.cast; 
        this.tableComment[excelName] = (CSV as any).opts.comment;

        this.csvTables[excelName] = tableData; // 主键值---》rowObject
        this.csvTableForArr[excelName] = tableArr;
    }

    // 返回的是我们查询到的数据
    // 满足条件有一条，满足条件有多条
    // excelName: 表格的名字
    // key: 查询字段的名字
    // value: 查询字段的值
    // return: 第一条满足条件的记录
    public QueryOneFromExcel(excelName: string, key: string, value: any): any {
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
            
        } else { // value当作我们的主键来查询;
            return table[value];
        }

        return null;
    }

    public QueryAllFromExcel(excelName: string, key: string, value: any): Array<any> {
        return null;
    }

    public GetExcelArray(excelName: string): Array<any> {
        return this.csvTableForArr[excelName];
    }

    // {主键值1:  line对象, 主键值2: line对象}
    public GetExcelObject(excelName: string): any {
        return this.csvTables[excelName];
    }
}


