import React, { Component } from 'react';
import { FetchWallet } from './FetchWallet';

export class Wallet extends Component {
    static displayName = Wallet.name;

    render() {
        return (
            <div>
                <FetchWallet/>
            </div>
        );
    }
}