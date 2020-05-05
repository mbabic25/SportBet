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
var TicketModal_js_1 = require("./TicketModal.js");
var date_fns_1 = require("date-fns");
var parseISO_1 = require("date-fns/parseISO");
var FetchWallet = /** @class */ (function (_super) {
    __extends(FetchWallet, _super);
    function FetchWallet(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { walletList: [], loading: true };
        fetch('api/Wallet/Index')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ walletList: data, loading: false });
        });
        return _this;
    }
    FetchWallet.prototype.render = function () {
        var contents = this.state.loading
            ? React.createElement("p", null,
                React.createElement("em", null, "Loading..."))
            : this.renderWalletTable(this.state.walletList);
        return React.createElement("div", null,
            React.createElement("h2", null, "Popis transakcija:"),
            React.createElement("div", { className: "central" },
                React.createElement("div", { className: "left" },
                    " ",
                    contents,
                    " ")));
    };
    // Returns the HTML table to the render() method.  
    FetchWallet.prototype.renderWalletTable = function (walletList) {
        var prevAmount = 0;
        return React.createElement("table", { className: 'table' },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null),
                    React.createElement("th", null, "Id"),
                    React.createElement("th", null, " Promjena stanja "),
                    React.createElement("th", null, "Stanje ra\u010Duna"),
                    React.createElement("th", null, "Datum uplate"),
                    React.createElement("th", null, "Detalji"))),
            React.createElement("tbody", null, walletList.map(function (wallet) {
                var result = parseISO_1.default(wallet.date.toString());
                var result2 = date_fns_1.format(result, 'dd/MM/yyyy HH:mm');
                var difference = wallet.amount - prevAmount;
                prevAmount = wallet.amount;
                return React.createElement("tr", { key: wallet.id },
                    React.createElement("td", null),
                    React.createElement("td", null, wallet.id),
                    React.createElement("td", { className: difference < 0 ? "minus" : "plus" }, difference),
                    React.createElement("td", null, wallet.amount),
                    React.createElement("td", null, result2.toString()),
                    React.createElement("td", null,
                        " ",
                        difference > 0 ? React.createElement("code", { className: "plus" }, " Uplata") : React.createElement(TicketModal_js_1.default, { walletid: wallet.id, walletDate: result2 })));
            })));
    };
    return FetchWallet;
}(React.Component));
exports.FetchWallet = FetchWallet;
var WalletData = /** @class */ (function () {
    function WalletData() {
        this.id = 0;
        this.amount = 0;
    }
    return WalletData;
}());
exports.WalletData = WalletData;
//# sourceMappingURL=FetchWallet.js.map