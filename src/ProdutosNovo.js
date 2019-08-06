import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export class ProdutosNovo extends Component {
  constructor (props) {
    super(props)

    this.handleNewProduto = this.handleNewProduto.bind(this)

    this.state = {
      redirect: false
    }
  }

  handleNewProduto () {
    const produto = {
      produto: this.refs.produto.value,
      categoria: this.refs.categoria.value
    }
    this.props.createProduto(produto)
    .then((res) => this.setState({redirect: '/produtos/categoria/' + produto.categoria}))
  }
  render () {
    const { categorias } = this.props
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div>
        <h2>Novo produto</h2>
        <div>
          <div className='form-group'>
            <label htmlFor='categoria'>Categorias</label>
            <select className='form-control' id='categoria' ref='categoria'>
              {categorias.map(c => (
                <option key={c.id} value={c.id}>
                  {c.categoria}
                </option>
              ))}
            </select>
            <div className='form-group'>
              <label htmlFor='novo-produto'>Novo produto</label>
              <input
                ref='produto'
                className='form-control'
                placeholder='Nome novo produto'
                id='novo-produto'
              />
            </div>
            <button className='btn btn-primary' onClick={this.handleNewProduto}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ProdutosNovo
