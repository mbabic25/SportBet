import * as React from 'react';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            money: 5,
            walletIDDB: null,
            amountDB: 0,
            ticket_idDB: null,
            bonus: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        if (event.target.value >= 5) this.setState({ money: event.target.value });
    }

    handleClick() {

        //bonus add
        function sortNumber(a, b) {
            return a - b;
        }

        //sort the selectedSports array
        this.props.selectedSports.sort(sortNumber);

        let SameSportCounter = 1;
        let differentSportCounter = 1;
        let addBonus = 0;

        //passing through the selectedSports array from FetchMatch component
        for (let pos = 1; pos < this.props.selectedSports.length; pos++) {

            let prevpos = pos - 1;

            //if the current element of the array is equal to previous, increment SameSportCounter
            if (this.props.selectedSports[pos] === this.props.selectedSports[prevpos]) {

                SameSportCounter = SameSportCounter + 1;

                //if there is 3 seleted matches with the same sport, add 5 on coef
                if (SameSportCounter === 3) {

                    addBonus = addBonus + 5;
                    alert("Dobili ste bonus 5 na kvotu jer ste odigrali 3 utakmice iz istog sporta! :)");
                }
            }

            else {

                SameSportCounter = 1;
                differentSportCounter = differentSportCounter + 1;
            }
        }
        //if customer selected matches from all existing sports, give +10 on coeficient
        if (differentSportCounter === this.props.sportLength) {

            addBonus = addBonus + 10;
            this.setState({ bonus: addBonus });
            alert("Dobili ste bonus 10 na kvotu jer ste igrali sve sportove koje nudimo! :)");
        }        

        fetch('api/Wallet/Index')
            .then(response => response.json())
            .then(data => {
                //catch the current amount of money from the database if exist

                if (data.length !== 0) {
                      this.setState({
                           amountDB: data[data.length - 1].amount
                       });
                } 
                                
                //subtracting paid money from the previos amount od money 
                const walletData = {
                    amount: (this.state.amountDB - this.state.money),
                }

                //posting the new amount state in the database

                fetch('api/Wallet/Create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(walletData)
                })
                    .then(
                        response => {
                            response.text().then(wallet => {                            
                                this.setState({
                                    walletIDDB: wallet
                                });
                                
                                //creating a new ticket
                                const ticketData = {
                                    cfc: (this.props.coef + this.state.bonus),
                                    amount: (this.state.money),
                                    return: ((this.props.coef+this.state.bonus) * this.state.money),
                                    walletId: this.state.walletIDDB,
                                    successful: true
                                }

                                fetch('api/Ticket/Create', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(ticketData)
                                })
                                    .then(
                                        response => { //read the given id from the db
                                            response.text().then(ticdata => {
                                                this.setState({
                                                    ticket_idDB: ticdata
                                                });

                                                
                                                //writing elements from the selectedMatches array into the const object
                                                for (let i = 0; i < this.props.selectedMatches.length; i++) {
                                                    if (i % 2 === 0) {
                                                        const ticketMatchData = {
                                                            ticketId: this.state.ticket_idDB,
                                                            matchid: this.props.selectedMatches[i],
                                                            selected: this.props.selectedMatches[i + 1]
                                                        }

                                                        fetch('api/TicketMatch/Create', {
                                                            method: 'POST',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify(ticketMatchData)
                                                        })
                                                            .then(ticketMatchData => {
                                                                console.log('Success:', ticketMatchData);
                                                            })
                                                            .catch((error) => {
                                                                console.error('Error:', error);
                                                            });
                                                    }
                                                }           

                                            });
                                        })
                                    .catch((error) => {
                                        console.error('Error:', error);
                                    });
                                
                          });
                         })
                        .catch((error) => {
                             console.error('Error:', error);
                        });

            });

        alert("Listić je uplaćen!");
    }  

    render() {
        return (
            <div>
                <form className="form-group">
                   
                    <div className="form-group">
                        <label className="col-sm-12">Ukupni koeficijent: </label>
                        <label className="col-sm-12"> {Math.round((this.props.coef + this.state.bonus)*100)/100} </label>
                    </div>  

                    <div className="form-group">
                        <label > Uplata (HRK):</label>
                        <input type="number" className="form-control" min="5"
                            onChange={this.handleChange} defaultValue="5" />
                    </div>

                    <div className="form-group">
                        <label className="col-sm-12">Dobitak (HRK): </label>
                        <label className="col-sm-12"> {Math.round(((this.props.coef + this.state.bonus) * this.state.money)*100)/100}</label>
                    </div>
                                                        
                    <div className="form-group">
                        <div className="col-sm-offset-2 ">
                            <div className="btn btn-success" onClick={this.handleClick} >Uplati listić!</div>
                        </div>
                    </div>

                </form>
            </div>
            );

}
}

export default Calculator;

