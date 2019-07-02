import React, { Component } from 'react';
import api from '../../services/api.js';

import './styles.css';
import Dialog from '../../components/Dialog';

export default class Product extends Component {
    state = {
        product: null,
        edit: false,
        title: "",
        description: "",
        url: ""
        
    };

    componentDidMount() {
        this.loadProducts();
    };

    loadProducts = async () => {
        const { id } = this.props.match.params;

        const response = await api.get(`/products/${id}`);

        this.setState ({ product: response.data, edit: false });        
    };

    deleteItem = async () => {
        const { id } = this.props.match.params;

        await api.delete(`/products/${id}`);

        this.loadProducts();        
    };

    handleSubmit = async e => {
        e.preventDefault();

        const { id } = this.props.match.params;

        // eslint-disable-next-line
        const data = {'title': this.state.title, 'description': this.state.description, 'url': this.state.url}

        await api.put(`/products/${id}`, data);

        this.loadProducts();
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });

        
    }

    render() {
        const { product } = this.state;

        if ( product === null ) return 'Produto Inexistente';

        return <div> 
            <div className="product-info">
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <p><a href={product.url}>{product.url}</a></p>
                <div className="actions">
                    <button onClick={this.deleteItem}>Delete</button>
                    <button onClick={(e) => this.setState({ edit: true, title:product.title, description:product.description, url:product.url })}>Modificar</button>
                </div>
            </div>
        
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