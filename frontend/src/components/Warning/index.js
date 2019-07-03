import React, { Component } from 'react';
import './styles.css';

export default class Warning extends Component {    
    
  routeChange = () => {
      let path = `/`;
      this.props.history.push(path);
  }

  render() {
    return <div  className='sucesso' >
    <div className='text'>{this.props.children}</div>
    <div className='actions-center'>
        <button type="button" onClick={this.routeChange}>Página Inicial</button>
    </div>
</div>;
  }
}
