import * as React from 'react';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = { money: 5 };

        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event) {
        if (event.target.value >= 5) this.setState({ money: event.target.value });
    }

    render() {
        return (
            <div>
                <form className="form-group">
                   
                    <div className="form-group">
                        <label className="col-sm-12">Ukupni koeficijent: </label>
                        <label className="col-sm-12"> {Math.round((this.props.coef)*100)/100} </label>
                    </div>  

                    <div className="form-group">
                        <label className="col-sm-6 "> Uplata(HRK):</label>
                        <input type="number" className="form-control" min="5"
                            onChange={this.handleChange} defaultValue="5" />
                    </div>

                    <div className="form-group">
                        <label className="col-sm-12">Dobitak: </label>
                        <label className="col-sm-12"> {Math.round((this.props.coef * this.state.money)*100)/100} </label>
                    </div>
                                                        
                    <div className="form-group">
                        <div className="col-sm-offset-2 ">
                            <button type="submit" className="btn btn-success">Uplati listić!</button>
                        </div>
                    </div>

                </form>
            </div>
            );

}
}

export default Calculator;