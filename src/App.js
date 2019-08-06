import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './Home'
import Sobre from './Sobre'
import Produtos from './Produtos'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categorias: [],
      produtos: [],
      categoria: ''
    }
    this.loadCategorias = this.loadCategorias.bind(this)
    this.removeCategoria = this.removeCategoria.bind(this)
    this.createCategoria = this.createCategoria.bind(this)
    this.editCategoria = this.editCategoria.bind(this)

    this.createProduto = this.createProduto.bind(this)
    this.loadProdutos = this.loadProdutos.bind(this)
    this.loadCategoria = this.loadCategoria.bind(this)

  }

  loadCategorias() {
    this.props.api.loadCategorias().then(res => {
      this.setState({
        categorias: res.data
      })
    })
  }

  removeCategoria(categoria) {
    this.props.api
      .deleteCategorias(categoria.id)
      .then(res => this.loadCategorias())
  }

  createCategoria(categoria) {
    this.props.api.createCategoria(categoria).then(res => this.loadCategorias())
  }
  editCategoria(categoria) {
    this.props.api.editCategoria(categoria).then(res => this.loadCategorias())
  }
  createProduto(produto) {
    return this.props.api.createProduto(produto)
  }

  loadProdutos(categoria) {
    this.props.api.loadProdutos(categoria).then(res =>
      this.setState({
        produtos: res.data
      })
    )
  }
  loadCategoria(categoria) {
    this.props.api.readCategoria(categoria).then(res => {
      this.setState({
        categoria: res.data
      })
    })
  }
  render() {
    return (
      <Router>
        <div>
          <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container' id='navbarSupportedContent'>
              <Link className='navbar-brand' to='/'>
                Gerenciador de produtos
              </Link>
              <button
                className='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#navbarSupportedContent'
                aria-controls='navbarSupportedContent'
                aria-expanded='false'
                aria-label='Toggle navigation'
              >
                <span className='navbar-toggler-icon' />
              </button>
              <div
                className='collapse navbar-collapse'
                id='navbarSupportedContent'
              >
                <ul className='navbar-nav mr-auto'>
                  <li className='nav-item active'>
                    <Link className='nav-link' to='/'>
                      Home <span className='sr-only'>(current)</span>
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to='/produtos'>
                      Produtos
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to='/sobre'>
                      Sobre
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className='container'>
            <Route exact path='/' component={Home} />
            <Route exact path='/sobre' component={Sobre} />
            <Route
              path='/produtos'
              render={props => (
                <Produtos
                  {...props}
                  loadCategorias={this.loadCategorias}
                  categorias={this.state.categorias}
                  removeCategoria={this.removeCategoria}

                  createCategoria={this.createCategoria}
                  editCategoria={this.editCategoria}
                  createProduto={this.createProduto}
                  loadProdutos={this.loadProdutos}
                  loadCategoria={this.loadCategoria}
                  produtos={this.state.produtos}
                  categoria={this.state.categoria}
                />
              )}
            />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
