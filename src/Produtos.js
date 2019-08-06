import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import ProdutosHome from './ProdutosHome'
import ProdutosNovo from './ProdutosNovo'
import Categoria from './Categoria'

class Produtos extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editingCategoria: ''
    }

    this.renderCategoria = this.renderCategoria.bind(this)
    this.handleNewCategoria = this.handleNewCategoria.bind(this)
    this.editCategoria = this.editCategoria.bind(this)
    this.cancelEditing = this.cancelEditing.bind(this)
    this.handleEditCategoria = this.handleEditCategoria.bind(this)
  }

  componentDidMount() {
    this.props.loadCategorias()
  }

  editCategoria(categoria) {
    this.setState({
      editingCategoria: categoria.id
    })
  }
  cancelEditing() {
    this.setState({
      editingCategoria: ''
    })
  }

  renderCategoria(cat) {
    return (
      <li className='list-group-item' key={cat.id}>
        {this.state.editingCategoria === cat.id && (
          <div className='btn-toolbar mb-3'>
            <div className='input-group'>
              <input
                type='text'
                className='form-control'
                defaultValue={cat.categoria}
                ref={'cat-' + cat.id}
                onKeyUp={this.handleEditCategoria}
              />
            </div>
            <div
              className='btn-group mr-2'
              role='group'
              aria-label='First group'
            >
              <button
                type='button'
                className='btn btn-secondary'
                onClick={this.cancelEditing}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
        {this.state.editingCategoria !== cat.id && (
          <div>
            <Link to={`/produtos/categoria/${cat.id}`}>{cat.categoria}</Link>
            <button
              type='button'
              className='close'
              onClick={() => this.editCategoria(cat)}
            >
              <span aria-hidden='true'>&#x270E;</span>
            </button>
            <button
              type='button'
              className='close'
              data-dismiss='alert'
              aria-label='Close'
              onClick={() => this.props.removeCategoria(cat)}
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
        )}
      </li>
    )
  }

  handleNewCategoria(key) {
    if (key.keyCode === 13) {
      this.props.createCategoria({
        categoria: this.refs.categoria.value
      })
      this.refs.categoria.value = ''
    }
  }

  handleEditCategoria(key) {
    if (key.keyCode === 13) {
      this.props.editCategoria({
        id: this.state.editingCategoria,
        categoria: this.refs['cat-' + this.state.editingCategoria].value
      })
      this.setState({
        editingCategoria: ''
      })
    }
  }
  render() {
    const { match, categorias } = this.props
    return (
      <div className='row'>
        <div className='col-md-3'>
          <div className='card'>
            <div className='card-header'>
              <h3>Categorias</h3>
            </div>
            <div className='card-body'>
              <ul className='list-group list-group-flush'>
                {categorias.map( cat=> this.renderCategoria(cat))}
              </ul>
              <input
                onKeyUp={this.handleNewCategoria}
                type='text'
                ref='categoria'
                className='form-control form-control-sm'
                placeholder='Nova categoria'
              />
              <Link to='/produtos/novo'>Novo produto</Link>
            </div>
          </div>
        </div>
        <div className='col-md-9'>
          <h1>Produtos</h1>
          <Route exact path={match.url} component={ProdutosHome} />
          <Route
            exact
            path={match.url + '/novo'}
            render={props => {
              return (
                <ProdutosNovo
                  {...props}
                  categorias={categorias}
                  createProduto={this.props.createProduto}
                />
              )
            }}
          />
          <Route
            path={match.url + '/categoria/:catId'}
            render={props => {
              return (
                <Categoria
                  {...props}
                  loadProdutos={this.props.loadProdutos}
                  loadCategoria={this.props.loadCategoria}
                  produtos={this.props.produtos}
                  categoria={this.props.categoria}
                />
              )
            }}
          />
        </div>
      </div>
    )
  }
}

export default Produtos
