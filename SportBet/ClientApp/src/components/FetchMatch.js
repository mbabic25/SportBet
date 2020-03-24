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
var FetchMatch = /** @class */ (function (_super) {
    __extends(FetchMatch, _super);
    function FetchMatch(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { matchList: [], loading: true };
        fetch('api/Match/Index')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ matchList: data, loading: false });
        });
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
            React.createElement("h1", null, "Match Data"),
            React.createElement("p", null, "This component demonstrates fetching Match data from the server."),
            React.createElement("p", null,
                React.createElement(react_router_dom_1.Link, { to: "/addmatch" }, "Create New")),
            contents);
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
                return React.createElement("tr", { key: match.id },
                    React.createElement("td", null),
                    React.createElement("td", null, match.id),
                    React.createElement("td", null, match.name),
                    React.createElement("td", null, match.sport),
                    React.createElement("td", null, match.player1),
                    React.createElement("td", null, match.player2),
                    React.createElement("td", null, match.x),
                    React.createElement("td", null));
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