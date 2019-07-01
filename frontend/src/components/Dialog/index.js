import React, { Component } from 'react';

export default class Dialog extends Component {
   render() {
       if (! this.props.edit) { return null };

       return (
           <div>{this.props.children}</div>
       );
   };
};