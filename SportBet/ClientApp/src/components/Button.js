import * as React from 'react';
import './custom.css';

class Button extends React.Component {

    render() {
        return (
            <button
                className={this.props.selected ? "btn btn-primary selected" : "btn btn-primary" }
                onClick={ this.props.click}
            >
                {this.props.player}
            </button>
         );
    }
}
        
        
export default Button;