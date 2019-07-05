import React, { Component } from 'react';
import api from '../../services/api.js';

import './styles.css';
import ProductForm from '../../components/ProductForm';
import Warning from '../../components/Warning';
import Spinner from '../../components/Spinner/Spinner.js';

export default class Product extends Component {
    state = {
        product: "",
        edit: false,
        title: "",
        description: "",
        url: "",
        loading: true
        
    };

    componentDidMount() {
        this.loadProducts();
    };

    loadProducts = async () => {
        const { id } = this.props.match.params;

        const response = await api.get(`/products/${id}`);

        this.setState ({ product: response.data, edit: false, loading: false });  
    };

    deleteItem = async () => {
        const { id } = this.props.match.params;

        await api.delete(`/products/${id}`);

        this.loadProducts();        
    };

    handleSubmit = async e => {
        e.preventDefault();

        const { id } = this.props.match.params;

        this.setState({ loading: true });

        // eslint-disable-next-line
        const data = {'title': this.state.title, 'description': this.state.description, 'url': this.state.url}

        await api.put(`/products/${id}`, data);

        this.loadProducts();
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });

        
    }

    render() {
        const { product, loading } = this.state;
        
        if ( loading === true ) return <Spinner />;
        if ( product === null ) return <Warning history={this.props.history} >Produto Deletado com Sucesso</Warning>;

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
        
            <ProductForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} st={this.state}/>            
        </div>

        
    };
};