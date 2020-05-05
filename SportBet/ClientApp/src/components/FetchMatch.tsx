import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import './custom.css';
import Calculator from './Calculator.js';
import Row from './Row.js';

interface FetchMatchDataState {
    matchList: MatchData[]; 
    loading: boolean;
    coeficSum: number;
    selectedMatches: selectedMatches[];
    selectedSports: number[];
    sportLength: number;
}

interface selectedMatches {
    selMatchId: number;
    matchSelection: string;
}   

export class FetchMatch extends React.Component<RouteComponentProps<{}>, FetchMatchDataState> {

    constructor(props) {
        super(props);
        this.state = {
            matchList: [], loading: true, coeficSum: 1, selectedMatches: [], selectedSports: [], sportLength: null
        };

        fetch('api/Match/Index')
            .then(response => response.json() as Promise<MatchData[]>)
            .then(data => {
                this.setState({ matchList: data, loading: false });
            });
        
        this.handleClick = this.handleClick.bind(this);
    }

    callbackFunction = (childData) => {
        this.setState({ sportLength: childData });
    }
         

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderMatchTable(this.state.matchList);
        return <div>
            <h2>Odaberi svoje parove!</h2>

            <div className="central">
                <div className="left"> {contents} </div>
                <div className="right"> <Calculator coef={this.state.coeficSum} selectedMatches={this.state.selectedMatches} selectedSports={this.state.selectedSports} sportLength={this.state.sportLength} /> </div>
            </div>
        </div>;
    }


    handleClick = (coef, sportID, prevCoef, selectedMatchId, matchSelection) => {

        var i = this.state.selectedMatches.indexOf(selectedMatchId, 0);

        //inserting match id and match selection into the selectedMatches array every time the match is selected

        if (i < 0) {    //if there is no selected match with the selectdMatchId into the database 
            const selectedMatchesNew = this.state.selectedMatches.concat(selectedMatchId, matchSelection);
            const newSelectedSport = this.state.selectedSports.concat(sportID);

            this.setState({
                selectedMatches: selectedMatchesNew,
                selectedSports: newSelectedSport
            });
        }

        else {  //if there is already selected match with the selectdMatchId into the database,
                //delete it from the array and write new selected match in the array

            let filteredArray2 = this.state.selectedMatches.slice(0, i).concat(this.state.selectedMatches.slice(i + 2, this.state.selectedMatches.length));
            const selectedMatchesChange = filteredArray2.concat(selectedMatchId, matchSelection);

            this.setState({ selectedMatches: selectedMatchesChange });
        }

        this.setState({
            coeficSum: coef / prevCoef * this.state.coeficSum
        });


    }


    // Returns the HTML table to the render() method.  
    private renderMatchTable(matchList: MatchData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>Id</th>
                    <th>Utakmica</th>
                    <th>Sport</th>
                    <th>Igrač 1</th>
                    <th>Igrač 2</th>
                    <th>X</th>
                    
                </tr>
            </thead>
            <tbody>
                {matchList.map(match =>
                    <Row match={match} handleClick={this.handleClick} parentCallback={this.callbackFunction} key={match.id}  />
                )}
            </tbody>
        </table>;
    }
}
export class MatchData {
    id: number = 0;
    name: string = "";
    sportID: number = 0;
    player1: number = 0;
    player2: number = 0;
    x: number = 0;
    sport: string = "";    
}