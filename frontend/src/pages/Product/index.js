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

    updateItem = async () => {
        const { id } = this.props.match.params;

        await api.update(`/products/${id}`);
    };

    handleSubmit = async e => {
        e.preventDefault();

        const { id } = this.props.match.params;

        // eslint-disable-next-line
        const data = {'title': this.state.title, 'description': this.state.description, 'url': this.state.url}

        await api.put(`/products/${id}`, data);

        console.log(this.state, data);

        this.loadProducts();
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });

        
    }

    render() {
        const { product } = this.state;

        if ( product === null ) return <p>Produto Inexistente</p>;

        return <div> 
            <div className="product-info">
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <p>URL:<a href={product.url}>{product.url}</a></p>
                <div className="actions">
                    <button onClick={this.deleteItem}>Delete</button>
                    <button onClick={(e) => this.setState({ edit: true })}>Modificar</button>
                </div>
            </div>
        

            <Dialog className="product-edit" edit={this.state.edit}>
            <form id="new-post" onSubmit={this.handleSubmit}>
               <input 
               type="text" 
               name="title" 
               placeholder="Autor do post"
               onChange={this.handleChange}
               value={this.state.title}
                />

               <input 
               type="text" 
               name="description" 
               placeholder="Local do post"
               onChange={this.handleChange}
               value={this.state.description}
                />

               <input 
               type="text" 
               name="url" 
               placeholder="Descrição do post"
               onChange={this.handleChange}
               value={this.state.url}
                />

                <button type="submit">Atualizar</button>

            </form>
            </Dialog>
        </div>

        
    };
};