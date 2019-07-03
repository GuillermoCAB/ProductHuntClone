import React, { Component } from 'react';

import './styles.css';

export default class ProductForm extends Component {
   render() {
       if (! this.props.st.edit) { return null };

       return (
        <div className="product-info">
        <form id="product-update" onSubmit={this.props.handleSubmit}>
           <p>Título:</p>
           <input 
           type="text" 
           name="title" 
           placeholder='Título'
           onChange={this.props.handleChange}
           value={this.props.st.title}
           required='true'
            />

           <p>Descrição:</p>
           <input 
           type="text" 
           name="description" 
           placeholder='Descrição'
           onChange={this.props.handleChange}
           value={this.props.st.description}
           required='true'
            />

           <p>URL:</p>
           <input 
           type="text" 
           name="url" 
           placeholder='URL'
           onChange={this.props.handleChange}
           value={this.props.st.url}
           required='true'
            />
        <div className='actions-center'>
            <button type="submit">Criar Post</button>
        </div>
        </form>
        </div>
       );
   };
};