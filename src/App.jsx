import React, { useState } from 'react';
import shortid from 'shortid';

function App() {

  const [tareas, setTareas] = useState([]);
  const [tareasFinalizadas, setTareasFinalizadas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [id, setId] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [error, setError] = useState(null);

  const obtenerHoraActual = () => {
    let today = new Date();
    let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let fecha = date + ' - ' + time;
    return fecha;
  }

  const agregarTarea = (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      setError('Hay elementos vacíos');
      return
    }
    if (!descripcion.trim()) {
      setError('Hay elementos vacíos');
      return
    }


    setTareas([...tareas, { id: shortid.generate(), nombreTarea: nombre, descTarea: descripcion, estado: 0, fecha: obtenerHoraActual() }]);
    setNombre('');
    setDescripcion('');
    setError(null);
  }

  const eliminarTarea = (id) => {
    const arrayFiltrado = tareas.filter(tarea => tarea.id !== id);
    setTareas(arrayFiltrado);
  }

  const editarTarea = (tarea) => {
    setModoEdicion(true);
    setId(tarea.id);
    setNombre(tarea.nombreTarea);
    setDescripcion(tarea.descTarea);
  }

  const agregarTareaEditada = (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      setError('Hay elementos vacíos');
      return
    }
    if (!descripcion.trim()) {
      setError('Hay elementos vacíos');
      return
    }

    const arrayEditado = tareas.map(tarea => tarea.id === id ? { id: id, nombreTarea: nombre, descTarea: descripcion, estado: 0 } : tarea);
    setTareas(arrayEditado);
    setNombre('');
    setDescripcion('');
    setId('');
    setModoEdicion(false);
    setError(null);
  }

  const finalizarTarea = (id) => {
    const arrayFiltrado = tareas.filter(tarea => tarea.id !== id);

    tareas.map(tarea => {
      if (tarea.id === id) {
        setTareasFinalizadas([...tareasFinalizadas, { id: tarea.id, nombre: tarea.nombreTarea, descripcion: tarea.descTarea, estado: 1, fecha: obtenerHoraActual() }]);
      }
    }
    );
    setTareas(arrayFiltrado);
  }

  const quitarTareaFinalizada = (id) => {
    const arrayFiltrado = tareasFinalizadas.filter(tarea => tarea.id !== id);
    setTareasFinalizadas(arrayFiltrado);
  }




  return (
    <div className="container-fluid">
      <h1 className="mt-5 text-center">App tareas en React JS!</h1>
      <hr />
      <div className="row">


        <div className="col-md-4 mb-5">
          <form onSubmit={modoEdicion ? agregarTareaEditada : agregarTarea}>
            <h3 className="text-center">
              {modoEdicion ? 'Editar tarea' : 'Agregar tarea'}
            </h3>

            {error !== null ? (
              <label className="list-group-item list-group-item-danger">{error}</label>
            ) : null}

            <input type="text" className="form-control mb-3" placeholder="Ingrese nombre"
              onChange={e => { setNombre(e.target.value) }}
              value={nombre}
            />
            <textarea className="form-control mb-3" cols="30" rows="5" placeholder="Ingrese descripción"
              onChange={e => { setDescripcion(e.target.value) }}
              value={descripcion}
            ></textarea>
            {modoEdicion ? (
              <button type="submit" className="btn btn-warning btn-block"> Editar </button>
            ) : (
                <button type="submit" className="btn btn-primary btn-block"> Agregar </button>
              )}
          </form>
        </div>

        <div className="col-md-4 mb-5">
          <div className="list-group">
            <h3 className="text-center">Pendientes</h3>
            {tareas.length === 0 ? (<p className="text-center list-group-item list-group-item-warning">NO HAY TAREAS PENDIENTES!</p>) : (null)}

            {
              tareas.map(item => (
                <div key={item.id} className="list-group-item mb-2 tareaPendiente">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{item.nombreTarea}</h5>
                    <small>{item.fecha}</small>
                  </div>
                  <p className="mb-1">{item.descTarea}</p>
                  <small>Estado: Pendiente</small>
                  <div className="float-right mt-2">
                    <button className="btn btn-danger btn-sm "
                      onClick={e => eliminarTarea(item.id)}
                    >Eliminar</button>
                    <button className="btn btn-warning btn-sm  mx-2"
                      onClick={e => editarTarea(item)}
                    >Editar</button>
                    <button className="btn btn-success btn-sm "
                      onClick={e => finalizarTarea(item.id)}
                    >Finalizar</button>
                  </div>
                 

                </div>
              ))
            }
          </div>
        </div>

        <div className="col-md-4 mb-5">
          <h3 className="text-center">Finalizadas</h3>
          {
            tareasFinalizadas.length === 0 ? (
              <p className="list-group-item list-group-item-success text-center">NO HAY TAREAS FINALIZADAS!</p>
            ) : (
                <div className="list-group">
                
                  {                    
                    tareasFinalizadas.map(tarea => (
                      
                      
                      <div key={tarea.id} className="list-group-item mb-2 tareaFinalizada">
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{tarea.nombre}</h5>
                        <small>{tarea.fecha}</small>
                      </div>
                      <p className="mb-1">{tarea.descripcion}</p>
                      <small>Estado: Finalizado</small>
                      <div className="float-right mt-2">
                        <button className="btn btn-primary btn-sm float-right"
                        onClick={e => quitarTareaFinalizada(tarea.id)}
                        >Quitar</button>
                      </div>
                     
                    </div>
                    ))
                  }
                 

                </div>
              )
          }
        </div>

      </div>

    </div>


  );
}

export default App;
