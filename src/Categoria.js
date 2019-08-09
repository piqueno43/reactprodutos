import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Categoria extends Component {
  constructor (props) {
    super(props)
    this.loadData = this.loadData.bind(this)
    this.renderProduto = this.renderProduto.bind(this)
    this.state = {
      produtos: [],
      categorias: {},
      id: null
    }
  }

  loadData (id) {
    this.setState({ id })
    this.props.loadProdutos(id)
    this.props.loadCategoria(id)
  }

  componentDidMount () {
    const id = this.props.match.params.catId
    this.loadData(id)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.match.params.catId !== this.state.id) {
      this.loadData(newProps.match.params.catId)
    }
  }

  renderProduto (prod) {
    return (
      <li className='list-group-item' key={prod.id}>
        {prod.produto}{' '}
        <button
          className='btn btn-link btn-sm'
          onClick={() =>
            this.props
              .removeProduto(prod)
              .then(res => this.loadData(this.props.match.catId))
          }
        >
          <span className='badge badge-danger badge-pill'>Excluir</span>
        </button>
        <Link to={'/produtos/editar/' + prod.id}>Editar</Link>
      </li>
    )
  }

  render () {
    return (
      <div className='card w-50'>
        <div className='card-header'>{this.props.categoria.categoria}</div>
        <ul className='list-group list-group-flush'>
          {this.props.produtos.length === 0 && (
            <li className='list-group-item list-group-item-danger'>
              Nenhum Produto
            </li>
          )}
          {this.props.produtos.map(this.renderProduto)}
        </ul>
      </div>
    )
  }
}

export default Categoria
