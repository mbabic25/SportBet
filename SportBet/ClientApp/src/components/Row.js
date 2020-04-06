import * as React from 'react';
import Button from './Button.js';

class Row extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selected: 0, prevSelected: 1 };
    }


    handleClick(match, buttonID) {
        this.setState({ selected: buttonID })
        if (buttonID === 1) {
            this.props.handleClick(match.player1, this.state.prevSelected);
            this.setState({ prevSelected: match.player1 })
        }
        else if (buttonID === 2) {
            this.props.handleClick(match.player2, this.state.prevSelected);
            this.setState({ prevSelected: match.player2 })
        }
        else {
            this.props.handleClick(match.x, this.state.prevSelected);
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
                <td>{match.sport}</td>
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