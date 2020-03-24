import React, { Component } from 'react';
import { FetchMatch } from './FetchMatch';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div>
            <FetchMatch/>
      </div>
    );
  }
}
