import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import './custom.css';
import TicketModal from './TicketModal.js';
import { format } from 'date-fns'
import parseISO from 'date-fns/parseISO'

interface FetchWalletDataState {
    walletList: WalletData[];
    loading: boolean;
}
export class FetchWallet extends React.Component<RouteComponentProps<{}>, FetchWalletDataState> {

    constructor(props) {
        super(props);
        this.state = { walletList: [], loading: true };
        fetch('api/Wallet/Index')
            .then(response => response.json() as Promise<WalletData[]>)
            .then(data => {
                this.setState({ walletList: data, loading: false });
            });
    }
    

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderWalletTable(this.state.walletList);
        return <div>
            <h2>Popis transakcija:</h2>
            <div className="central">
                <div className="left"> {contents} </div>
            </div>
        </div>;
    }




    // Returns the HTML table to the render() method.  
    private renderWalletTable(walletList: WalletData[]) {
        var prevAmount = 0;

        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>Id</th>
                    <th> Promjena stanja </th>
                    <th>Stanje računa</th>
                    <th>Datum uplate</th>
                    <th>Detalji</th>
                </tr>
            </thead>
            <tbody>
                {walletList.map(wallet => {

                    const result = parseISO(wallet.date.toString());
                    const result2 = format(result, 'dd/MM/yyyy HH:mm');

                    let difference = wallet.amount - prevAmount;
                    prevAmount = wallet.amount;                    

                    return <tr key={wallet.id}>
                        <td></td>
                        <td>{wallet.id}</td>
                        <td className={difference < 0 ? "minus" : "plus"}>{difference}</td>
                        <td>{wallet.amount}</td>
                        <td>{result2.toString()}</td>
                        <td> {difference > 0 ? <code className="plus"> Uplata</code> : <TicketModal walletid={wallet.id} walletDate={result2} />}</td>
                    </tr>
                  })
                }

            </tbody>
        </table>;
    }
}
export class WalletData {
    id: number = 0;
    amount: number = 0;
    date: Date;
}