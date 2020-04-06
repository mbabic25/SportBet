"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
require("./custom.css");
var Calculator_js_1 = require("./Calculator.js");
var Row_js_1 = require("./Row.js");
var FetchMatch = /** @class */ (function (_super) {
    __extends(FetchMatch, _super);
    function FetchMatch(props) {
        var _this = _super.call(this, props) || this;
        _this.handleClick = function (coef, prevCoef) {
            _this.setState({ coeficSum: coef / prevCoef * _this.state.coeficSum });
        };
        _this.state = { matchList: [], loading: true, coeficSum: 1 };
        fetch('api/Match/Index')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ matchList: data, loading: false });
        });
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
        // This binding is necessary to make "this" work in the callback  
        /* this.handleDelete = this.handleDelete.bind(this);
         this.handleEdit = this.handleEdit.bind(this);*/
    }
    FetchMatch.prototype.render = function () {
        var contents = this.state.loading
            ? React.createElement("p", null,
                React.createElement("em", null, "Loading..."))
            : this.renderMatchTable(this.state.matchList);
        return React.createElement("div", null,
            React.createElement("h2", null, "Odaberi svoje parove!"),
            React.createElement("p", null,
                React.createElement(react_router_dom_1.Link, { to: "/addmatch" }, "Create New")),
            React.createElement("div", { className: "central" },
                React.createElement("div", { className: "left" },
                    " ",
                    contents,
                    " "),
                React.createElement("div", { className: "right" },
                    " ",
                    React.createElement(Calculator_js_1.default, { coef: this.state.coeficSum }),
                    " ")));
    };
    // Handle Delete request for a match 
    /* private handleDelete(id: number) {
         if (!window.confirm("Do you want to delete match with Id: " + id))
             return;
         else {
             fetch('api/Match/Delete/' + id, {
                 method: 'delete'
             }).then(data => {
                 this.setState(
                     {
                         matchList: this.state.matchList.filter((rec) => {
                             return (rec.ID !== id);
                         })
                     });
             });
         }
     }
     private handleEdit(id: number) {
         this.props.history.push("/match/edit/" + id);
     }*/
    // Returns the HTML table to the render() method.  
    FetchMatch.prototype.renderMatchTable = function (matchList) {
        var _this = this;
        return React.createElement("table", { className: 'table' },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null),
                    React.createElement("th", null, "Id"),
                    React.createElement("th", null, "Name"),
                    React.createElement("th", null, "Sport"),
                    React.createElement("th", null, "Player 1"),
                    React.createElement("th", null, "Player 2"),
                    React.createElement("th", null, "X"))),
            React.createElement("tbody", null, matchList.map(function (match) {
                return React.createElement(Row_js_1.default, { match: match, handleClick: _this.handleClick, key: match.id });
            })));
    };
    return FetchMatch;
}(React.Component));
exports.FetchMatch = FetchMatch;
var MatchData = /** @class */ (function () {
    function MatchData() {
        this.id = 0;
        this.name = "";
        this.sport = 0;
        this.player1 = 0;
        this.player2 = 0;
        this.x = 0;
        this.sportNavigation = "";
    }
    return MatchData;
}());
exports.MatchData = MatchData;
//# sourceMappingURL=FetchMatch.js.map