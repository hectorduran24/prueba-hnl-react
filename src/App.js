import React, {Fragment} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Modal, ModalBody, ModalFooter, ModalHeader, Table, Button, Pretty, Container, FormGroup, Col, Row} from 'reactstrap';
import firebase from './firebase';
import QrReader from 'react-qr-reader'



class App extends React.Component{
  
  state={
    data: [],
    modalAparece: false,
    result: 'No result',

        form:{

      id: '',
      nombre: '',
      apellido: '',
      nacionalidad: '',
      telefono: ''
    
    }
  }

  peticionGet = () => {
    firebase.child("registro").on("value",  id => {
      if(id.val()!==null){
        this.setState({...this.state.data, data: id.val()});
      }else{
        this.setState({data: []})
      }
    })
  }

  peticionPost = () => {
    firebase.child("registro").push(this.state.form, error =>{

        if(error){
          console.log(error)
        }
  });
  
}

peticionBorrar = () => {


  firebase.child(`registro/${this.state.id}`).remove(error =>{

    if(error){
      console.log(error)
  }});
  
}



handleChange = e => {
  this.setState({form:{
    ...this.state.form,
    [e.target.name]: e.target.value
  }})
  console.log(this.state.form)
}

componentDidMount(){
  this.peticionGet();
}

handleScan = data => {
  if (data) {
    this.setState({
      result: data
    })
  }
 }

handleError = error => {
  console.error(error)
}

  render(){
    return(
      <Fragment>

<Row classname="container">
  <Col md="4" ></Col>
    <Col md="8">

        <Form className="container  mt-5" >

          <h2 >REGISTRO</h2>

              <FormGroup className="col-5">
                <label># Identidad: </label>
                <input className="form-control" name="id" type="text" value={this.state.result.id} onChange = {this.handleChange} />
              </FormGroup>
              <FormGroup className="col-5">
                <label>Nombre: </label>
                <input className="form-control" name="nombre" type="text"value={this.state.result.nombre} onChange = {this.handleChange} />
              </FormGroup>
              <FormGroup className="col-5">
                <label>Apellido: </label>
                <input className="form-control" name="apellido" type="text" value={this.state.result.apellido} onChange = {this.handleChange} />
              </FormGroup>
              <FormGroup className="col-5">
                <label>Nacionalidad: </label>
                <input className="form-control" name="nacionalidad" value={this.state.result.nacionalidad} type="text" onChange = {this.handleChange} />
              </FormGroup>
              <FormGroup className="col-5">
                <label>Telefono: </label>
                <input className="form-control" name="telefono" type="text" value={this.state.result.telefono} onChange = {this.handleChange} />
              </FormGroup>
              
              
              <div className="container mt-4 " >   

              <button className="btn btn-primary margin-left" onClick={() => this.peticionPost()} >Agregar</button>{" "}
                            
              </div> 

        </Form>

              <div className="container mt-3 ">
                  <button className="btn btn-outline-success "  onClick={ () => this.setState({modalAparece: true})} ><img src="./qr-code.png" width="21px" /> Escanear</button>
              </div>

        
  </Col>
</Row>


        <Table  className=" container mt-3 table table-bordered">
          <thead>
            <tr>
              <th># Identidad</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Nacionalidad</th>
              <th>Telefono</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(this.state.data).map(i => {
              return <tr key = {i}>
                <td>{this.state.data[i].id}</td>
                <td>{this.state.data[i].nombre}</td>
                <td>{this.state.data[i].apellido}</td>
                <td>{this.state.data[i].nacionalidad}</td>
                <td>{this.state.data[i].telefono}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => this.peticionBorrar()} >Eliminar</button>
                </td>
              </tr>
            })}
          </tbody>

        </Table>

        <Modal  isOpen={this.state.modalAparece}>

          <ModalHeader>
            <button className="btn"  onClick={() => this.setState({modalAparece: false})}><img src="./close.png"  /> </button>
          </ModalHeader>

          <ModalBody>
            <Container>
              
              <QrReader 
                delay={300}
                onError={this.handleError}
                onScan={this.handleScan}
                style={{ width: '80%', float: 'center' }}
              />
              
            </Container>
          </ModalBody>
          
          <ModalFooter>
          

          </ModalFooter>

        </Modal>


        { this.obj = JSON.stringify(this.state.result)}
               

      </Fragment>
    );
  }
}

export default App;
