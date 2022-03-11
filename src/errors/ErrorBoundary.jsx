import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
  
    render() {
        if (this.state.hasError) {
            return <h1>Что-то пошло не так.</h1>;
        }
  
        return this.props.children; 
    }
}