import React, { Component } from 'react';
import api from '../../services/api.js';

import Warning from '../../components/Warning';
import ProductForm from '../../components/ProductForm/';

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
        if ( this.state.ok === true ) return <Warning history={this.props.history} >Criado com sucesso!</Warning>;

        return <ProductForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} st={this.state}/>        
    };
};