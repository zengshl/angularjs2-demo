var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var ng2_table_1 = require('ng2-table/ng2-table');
var table_data_1 = require('./table-data');
var index_1 = require("../../shared/index");
var index_2 = require('../../shared/index');
// webpack html imports
var template = require('./syssuggest.html');
var SysSuggestComponent = (function () {
    function SysSuggestComponent(_util) {
        this._util = _util;
        this.rows = [];
        //表头与排序
        this.columns = [
            //{title: 'Name', name: 'name'},
            //{title: 'Position', name: 'position', sort: false},
            //{title: 'Office', name: 'office', sort: 'asc'},
            //{title: 'Extn.', name: 'ext', sort: ''},
            //{title: 'Start date', name: 'startDate'},
            //{title: 'Salary ($)', name: 'salary'}
            { title: '用户名', name: 'name' },
            { title: '标题', name: 'position', sort: false },
            { title: '反馈内容', name: 'office', sort: 'asc' },
            { title: '反馈时间.', name: 'ext', sort: '' },
            { title: '操作', name: '' }
        ];
        //初始页面，不要改，该了会报错
        this.page = 1;
        //每页显示的数据条数
        this.itemsPerPage = 5;
        this.maxSize = 5;
        this.numPages = 1;
        this.length = 0;
        this.config = {
            //是否分页
            paging: true,
            //排序列
            sorting: { columns: this.columns },
            //filtering: {filterString: '', columnName: 'position'}
            //过滤条件
            filtering: {
                position: { filterString: '' },
                office: { filterString: '' }
            }
        };
        this.titleSearch = '';
        this.data = table_data_1.TableData;
        //实例化分页对象
        this.user = new index_2.User();
        this.pdata = new index_2.PageData();
        this.pdata.iDisplayStart = 0;
        this.pdata.page = 1;
        this.pdata.iDisplayLength = 8;
        this.pdata.searchData = { 'adviceTitle': this.titleSearch, "userId": this.user.id + "" };
        _util.getSuggest(JSON.stringify(this.pdata)).subscribe(function (res) {
            console.log(res.json());
        });
        this.length = this.data.length;
    }
    SysSuggestComponent.prototype.ngOnInit = function () {
        this.onChangeTable(this.config);
    };
    SysSuggestComponent.prototype.changePage = function (page, data) {
        if (data === void 0) { data = this.data; }
        console.log(page);
        var start = (page.page - 1) * page.itemsPerPage;
        var end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    };
    SysSuggestComponent.prototype.changeSort = function (data, config) {
        if (!config.sorting) {
            return data;
        }
        var columns = this.config.sorting.columns || [];
        var columnName = void 0;
        var sort = void 0;
        for (var i = 0; i < columns.length; i++) {
            if (columns[i].sort !== '') {
                columnName = columns[i].name;
                sort = columns[i].sort;
            }
        }
        if (!columnName) {
            return data;
        }
        // simple sorting
        return data.sort(function (previous, current) {
            if (previous[columnName] > current[columnName]) {
                return sort === 'desc' ? -1 : 1;
            }
            else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        });
    };
    SysSuggestComponent.prototype.changeFilter = function (data, config) {
        var _this = this;
        if (!config.filtering) {
            return data;
        }
        //let filteredData:Array<any> = data.filter((item:any) =>
        //    item[config.filtering.columnName].match(this.config.filtering.filterString));
        return data.filter(function (item) {
            return item["position"].match(_this.config.filtering.position.filterString) &&
                item["office"].match(_this.config.filtering.office.filterString);
        });
        //return filteredData;
    };
    SysSuggestComponent.prototype.onChangeTable = function (config, page) {
        if (page === void 0) { page = { page: this.page, itemsPerPage: this.itemsPerPage }; }
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }
        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }
        var filteredData = this.changeFilter(this.data, this.config);
        var sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
    };
    SysSuggestComponent = __decorate([
        core_1.Component({
            selector: 'sys-suggest',
            template: template,
            providers: [index_1.UtilService],
            directives: [ng2_table_1.NG_TABLE_DIRECTIVES, ng2_bootstrap_1.PAGINATION_DIRECTIVES, common_1.NgClass, common_1.NgIf, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [index_1.UtilService])
    ], SysSuggestComponent);
    return SysSuggestComponent;
})();
exports.SysSuggestComponent = SysSuggestComponent;
//# sourceMappingURL=syssuggest.js.map