import React, { Component } from 'react';
import api from '../../services/api.js';

import './styles.css';

export default class Product extends Component {
    state = {
        product: 
            null
        
    };

    componentDidMount() {
        this.loadProducts();
    };

    loadProducts = async () => {
        const { id } = this.props.match.params;

        const response = await api.get(`/products/${id}`);

        this.setState ({ product: response.data });        
    };

    deleteItem = async () => {
        const { id } = this.props.match.params;

        await api.delete(`/products/${id}`);

        this.loadProducts();        
    };

    render() {
        const { product } = this.state;

        if ( product === null ) return <p>Produto Inexistente</p>;

        return <div className="product-info">
           <h1>{product.title}</h1>
           <p>{product.description}</p>
           <p>URL:<a href={product.url}>{product.url}</a></p>
           <div className="actions">
            <button onClick={this.deleteItem}>Delete</button>
            <button onClick={this.updateItem}>Modificar</button>
          </div>
        </div>

        
    };
};