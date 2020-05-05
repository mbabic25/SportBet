import * as React from 'react';
import Button from './Button.js';


class Row extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selected: 0, prevSelected: 1, sportList: [], sportName: '', sportLength: null };

    }

    componentDidMount() { 

        fetch('api/Match/SportDetails')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    sportList: data
                });

                this.setState({  //sportLength is number of sports in our database
                    sportName: this.state.sportList[this.props.match.sportID - 1].sportName,
                    sportLength: data.length
                });
                this.sendData();
            });
    }

    //send sportLength to a parent component FetchMatch
    sendData = () => {
        this.props.parentCallback(this.state.sportLength);
    }
    
    handleClick(match, buttonID) { //function gets buttonID and calls handleClick function from the
        //FetchMatch component with the selected buttonID data

        this.setState({ selected: buttonID })

        if (buttonID === 1) {
            this.props.handleClick(match.player1, match.sportID, this.state.prevSelected, match.id, "1");
            this.setState({ prevSelected: match.player1 })
        }

        else if (buttonID === 2) {
            this.props.handleClick(match.player2, match.sportID, this.state.prevSelected, match.id, "2");
            this.setState({ prevSelected: match.player2 })
        }

        else {
            this.props.handleClick(match.x, match.sportID, this.state.prevSelected, match.id, "X");
            this.setState({ prevSelected: match.x })
        }
    }


    render() {
        const { match } = this.props;
        
        return (
            <tr key={match.id}>
                <td></td>
                <td>{match.id}</td>
                <td>{match.name}</td>
                <td>{this.state.sportName}</td>
                <td><Button player={match.player1} click={() => this.handleClick(match, 1)} rowID={match.id} selected={this.state.selected===1} /></td>
                <td><Button player={match.player2} click={() => this.handleClick(match, 2)} rowID={match.id} selected={this.state.selected ===2} /></td>
                <td><Button player={match.x} click={() => this.handleClick(match, 3)} rowID={match.id} selected={this.state.selected === 3} /></td>
                <td>

                </td>
            </tr>

        );
    }
}


export default Row;