import React, { Component } from 'react';
import api from '../../services/api.js';

import './styles.css';
import Dialog from '../../components/Dialog';

export default class New extends Component {
    state = {
        ok:false,
        edit: true,
        title: "",
        description: "",
        url: ""
        
    };

    handleSubmit = async e => {
        e.preventDefault();

        // eslint-disable-next-line
        const data = {'title': this.state.title, 'description': this.state.description, 'url': this.state.url}

        await api.post(`/products`, data);

        this.setState({ ok:true });
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });        
    }

    render() {
        if ( this.state.ok === true ) return 'Cadastrado com sucesso';

        return <div>              
            <Dialog edit={this.state.edit}>            
            <div className="product-info">
            <form id="product-update" onSubmit={this.handleSubmit}>
               <p>Título:</p>
               <input 
               type="text" 
               name="title" 
               placeholder='Título'
               onChange={this.handleChange}
               value={this.state.title}
               required='true'
                />

               <p>Descrição:</p>
               <input 
               type="text" 
               name="description" 
               placeholder='Descrição'
               onChange={this.handleChange}
               value={this.state.description}
               required='true'
                />

               <p>URL:</p>
               <input 
               type="text" 
               name="url" 
               placeholder='URL'
               onChange={this.handleChange}
               value={this.state.url}
               required='true'
                />
            <div className='actions'>
                <button type="submit">Atualizar</button>
            </div>
            </form>
            </div>
            </Dialog>            
        </div>

        
    };
};