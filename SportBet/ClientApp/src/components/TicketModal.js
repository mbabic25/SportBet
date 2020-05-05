import * as React from 'react';
import './custom.css';
import Modal from 'react-modal';


class TicketModal extends React.Component {

    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            selectedTicketId: null,
            object: [],
            cfc: null,
            amount: null,
            return: null,
            matchName: ''
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {

        this.setState({ modalIsOpen: true });
        fetch('api/Ticket/Index') //finds out the ticket id of the selected transaction
            .then(response => response.json())
            .then(ticketData => {

                for (let i = 0; i < ticketData.length; i++) {

                    if (ticketData[i].walletId === this.props.walletid) {
                        this.setState({
                            selectedTicketId: (ticketData[i].id),
                            cfc: (ticketData[i].cfc),
                            amount: (ticketData[i].amount),
                            return: (ticketData[i].return)
                        });
                    }
                }



               fetch('api/TicketMatch/Index') //finds out all matches on the selected ticket 
                    .then(response => response.json())
                    .then(ticketMatchData => {

                        for (let i = 0; i < ticketMatchData.length; i++) {

                            if (ticketMatchData[i].ticketID === this.state.selectedTicketId) {

                                fetch('api/Match/Index') //finds out match name from match id
                                    .then(response => response.json())
                                    .then(matchData => {
                                        for (let j = 0; j < matchData.length; j++) {
                                            if (matchData[j].id === ticketMatchData[i].matchid) {
                                                this.setState({
                                                    matchName: matchData[j].name
                                                });
                                            }
                                        }

                                        const row = [{
                                            id: ticketMatchData[i].matchid,
                                            match: this.state.matchName,
                                            selected: ticketMatchData[i].selected
                                        }]

                                        const rowReady = this.state.object.concat(row);
                                        this.setState({
                                            object: rowReady
                                        });
                                    });

                                
                            }
                        }

                    });
            });
    }


    closeModal() {
        this.setState({ modalIsOpen: false });
        this.setState({ object: []});
    }

    render() {
        Modal.setAppElement('*');

        return (
            <div>
                <button className="btn btn-primary" onClick={this.openModal}>Pogledaj listić</button>
                <Modal
                    className="modalpop"
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                >

                    <h3> Listić {this.state.selectedTicketId} </h3>
                    {this.props.walletDate}
                        
                    <table className='table'>

                        <thead>
                            <tr> 
                                <th> Utakmica </th>
                                <th> Odabir </th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.object.map(obj =>

                                <tr key={obj.id}>
                                    <td>{obj.match}</td>
                                    <td>{obj.selected}</td>
                                </tr>
                            )}                 

                        </tbody>                   
                    </table>    

                    <ul className="TicketBottom">
                        <li> Ukupni koeficijent: {this.state.cfc} </li>
                        <li> Uplata: {this.state.amount} </li>
                        <li> Dobitak: {this.state.return} </li> 
                    </ul>
                    <div className="modalfooter">
                        <button className="btn btn-secondary" onClick={this.closeModal}> Zatvori</button>
                    </div>
                </Modal>
            </div>
        );
    }
}


export default TicketModal;