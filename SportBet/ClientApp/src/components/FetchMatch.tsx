import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import './custom.css';
import Calculator from './Calculator.js';
import Row from './Row.js';

interface FetchMatchDataState {
    matchList: MatchData[];
    loading: boolean;
    coeficSum: number;
}
export class FetchMatch extends React.Component<RouteComponentProps<{}>, FetchMatchDataState> {

    constructor(props) {
        super(props);
        this.state = { matchList: [], loading: true, coeficSum: 1 };
        fetch('api/Match/Index')
            .then(response => response.json() as Promise<MatchData[]>)
            .then(data => {
                this.setState({ matchList: data, loading: false });
            });
        this.handleClick = this.handleClick.bind(this);
        // This binding is necessary to make "this" work in the callback  
       /* this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);*/
    }



    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderMatchTable(this.state.matchList);
        return <div>
            <h2>Odaberi svoje parove!</h2>
            <p>
                <Link to="/addmatch">Create New</Link>
            </p>
            <div className="central">
                <div className="left"> {contents} </div>
                <div className="right"> <Calculator coef={this.state.coeficSum} /> </div>
            </div>
        </div>;
    }

    handleClick = (coef, prevCoef) => {
        this.setState({ coeficSum: coef / prevCoef * this.state.coeficSum });
    }

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
    private renderMatchTable(matchList: MatchData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Sport</th>
                    <th>Player 1</th>
                    <th>Player 2</th>
                    <th>X</th>
                    
                </tr>
            </thead>
            <tbody>
                {matchList.map(match =>
                    <Row match={match} handleClick={this.handleClick} key={match.id} />
                )}
            </tbody>
        </table>;
    }
}
export class MatchData {
    id: number = 0;
    name: string = "";
    sport: number = 0;
    player1: number = 0;
    player2: number = 0;
    x: number = 0;
    sportNavigation: string = "";
    
}