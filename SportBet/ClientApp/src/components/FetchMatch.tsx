import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

interface FetchMatchDataState {
    matchList: MatchData[];
    loading: boolean;
}
export class FetchMatch extends React.Component<RouteComponentProps<{}>, FetchMatchDataState> {

    constructor(props) {
        super(props);
        this.state = { matchList: [], loading: true };
        fetch('api/Match/Index')
            .then(response => response.json() as Promise<MatchData[]>)
            .then(data => {
                this.setState({ matchList: data, loading: false });
            });
        // This binding is necessary to make "this" work in the callback  
       /* this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);*/
    }
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderMatchTable(this.state.matchList);
        return <div>
            <h1>Match Data</h1>
            <p>This component demonstrates fetching Match data from the server.</p>
            <p>
                <Link to="/addmatch">Create New</Link>
            </p>
            {contents}
        </div>;
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
                    <tr key={match.id}>
                        <td></td>
                        <td>{match.id}</td>
                        <td>{match.name}</td>
                        <td>{match.sport}</td>
                        <td>{match.player1}</td>
                        <td>{match.player2}</td>
                        <td>{match.x}</td>
                       
                        <td>
                            
                        </td>
                    </tr>
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