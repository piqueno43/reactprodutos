import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class ProdutosEditar extends Component {
  constructor(props) {
    super(props)
    this.handleEditProduto = this.handleEditProduto.bind(this)
    this.state = {
      redirect: false
    }
  }

  componentDidMount() {
    this.props.readProduto(this.props.match.params.id).then(res => {
      this.refs.produto.value = res.data.produto
      this.refs.categoria.value = res.data.categoria
    })
  }
  
  handleEditProduto() {
    const produto = {
      id: this.props.match.params.id,
      produto: this.refs.produto.value,
      categoria: this.refs.categoria.value
    }
    this.props
      .editProduto(produto)
      .then(res =>
        this.setState({ redirect: '/produtos/categoria/' + produto.categoria })
      )
  }
  
  render() {
    const { categorias } = this.props
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div>
        <h2>Editar produto</h2>
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
                placeholder='Nome do produto'
                id='novo-produto'
              />
            </div>
            <button className='btn btn-primary' onClick={this.handleEditProduto}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ProdutosEditar
