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
require("./custom.css");
var Calculator_js_1 = require("./Calculator.js");
var Row_js_1 = require("./Row.js");
var FetchMatch = /** @class */ (function (_super) {
    __extends(FetchMatch, _super);
    function FetchMatch(props) {
        var _this = _super.call(this, props) || this;
        _this.callbackFunction = function (childData) {
            _this.setState({ sportLength: childData });
        };
        _this.handleClick = function (coef, sportID, prevCoef, selectedMatchId, matchSelection) {
            var i = _this.state.selectedMatches.indexOf(selectedMatchId, 0);
            //inserting match id and match selection into the selectedMatches array every time the match is selected
            if (i < 0) { //if there is no selected match with the selectdMatchId into the database 
                var selectedMatchesNew = _this.state.selectedMatches.concat(selectedMatchId, matchSelection);
                var newSelectedSport = _this.state.selectedSports.concat(sportID);
                _this.setState({
                    selectedMatches: selectedMatchesNew,
                    selectedSports: newSelectedSport
                });
            }
            else { //if there is already selected match with the selectdMatchId into the database,
                //delete it from the array and write new selected match in the array
                var filteredArray2 = _this.state.selectedMatches.slice(0, i).concat(_this.state.selectedMatches.slice(i + 2, _this.state.selectedMatches.length));
                var selectedMatchesChange = filteredArray2.concat(selectedMatchId, matchSelection);
                _this.setState({ selectedMatches: selectedMatchesChange });
            }
            _this.setState({
                coeficSum: coef / prevCoef * _this.state.coeficSum
            });
        };
        _this.state = {
            matchList: [], loading: true, coeficSum: 1, selectedMatches: [], selectedSports: [], sportLength: null
        };
        fetch('api/Match/Index')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ matchList: data, loading: false });
        });
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }
    FetchMatch.prototype.render = function () {
        var contents = this.state.loading
            ? React.createElement("p", null,
                React.createElement("em", null, "Loading..."))
            : this.renderMatchTable(this.state.matchList);
        return React.createElement("div", null,
            React.createElement("h2", null, "Odaberi svoje parove!"),
            React.createElement("div", { className: "central" },
                React.createElement("div", { className: "left" },
                    " ",
                    contents,
                    " "),
                React.createElement("div", { className: "right" },
                    " ",
                    React.createElement(Calculator_js_1.default, { coef: this.state.coeficSum, selectedMatches: this.state.selectedMatches, selectedSports: this.state.selectedSports, sportLength: this.state.sportLength }),
                    " ")));
    };
    // Returns the HTML table to the render() method.  
    FetchMatch.prototype.renderMatchTable = function (matchList) {
        var _this = this;
        return React.createElement("table", { className: 'table' },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null),
                    React.createElement("th", null, "Id"),
                    React.createElement("th", null, "Utakmica"),
                    React.createElement("th", null, "Sport"),
                    React.createElement("th", null, "Igra\u010D 1"),
                    React.createElement("th", null, "Igra\u010D 2"),
                    React.createElement("th", null, "X"))),
            React.createElement("tbody", null, matchList.map(function (match) {
                return React.createElement(Row_js_1.default, { match: match, handleClick: _this.handleClick, parentCallback: _this.callbackFunction, key: match.id });
            })));
    };
    return FetchMatch;
}(React.Component));
exports.FetchMatch = FetchMatch;
var MatchData = /** @class */ (function () {
    function MatchData() {
        this.id = 0;
        this.name = "";
        this.sportID = 0;
        this.player1 = 0;
        this.player2 = 0;
        this.x = 0;
        this.sport = "";
    }
    return MatchData;
}());
exports.MatchData = MatchData;
//# sourceMappingURL=FetchMatch.js.map