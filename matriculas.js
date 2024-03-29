Vue.component('v-select-alumno', VueSelect.VueSelect);
Vue.component('matriculas',{
    data(){
        return{
          db:'',
          buscar:'',
          matriculas:[],
          alumnos:[],
          accion: 'nuevo',
          matricula:{
            idMatricula:'',
            fecha:'',
            pago: false,
            comprobante:'',
            alumno:{
                id:'',
                label:''
            }
        
          }
        }
      },
      methods:{
        nuevoMatricula(){
          this.accion = 'nuevo';
          this.matricula.idMatricula = '';
          this.matricula.pago = false;
          this.matricula.fecha = '';
          this.matricula.alumno.id = '';
          this.matricula.alumno.label = '';
        },
        modificarMatricula(matricula){
          this.accion = 'modificar';
          this.matricula = matricula;
          
        },
        guardarMatricula(){
          if(this.matricula.alumno.id=='' || this.matricula.alumno.label=='' || this.matricula.fecha==''){
            console.log('Por favor ingrese los datos correspondientes');
            return;
          }
          let store = abrirStore('tblmatriculas','readwrite');
          if(this.accion==='nuevo'){
            this.matricula.idMatricula = new Date().getTime().toString(16); //las cantidad milisegundo y lo convierte en hexadecimal
            
          }
          let query = store.put( JSON.parse( JSON.stringify(this.matricula)));
          query.onsuccess = resp=>{
            fetch(`private/modulos/matriculas/matriculas.php?accion=${this.accion}&matricula=${JSON.stringify(this.matricula)}`)
            .then(resp=>resp.json())
            .then(resp=>{
                console.log(resp);
            });
            this.nuevoMatricula();
            this.listar();
          };
          query.onerror = err=>{
            console.error('ERROR al guardar matricula', err);
          };
          
        },
        eliminarMatricula(matricula){
          if(confirm(`Esta seguro de eliminar el ${matricula.nombre}?`)){
            let store = abrirStore('tblmatriculas','readwrite'),
                req = store.delete(matricula.idMatricula);
                req.onsuccess = res=>{
                  fetch(`private/modulos/matriculas/matriculas.php?accion=eliminar&matricula=${JSON.stringify(this.matricula)}`)
                  .then(resp=>resp.json())
                  .then(resp=>{
                      console.log(resp);
                  });
                  this.listar();
                };
                req.onerror = err=>{
                  console.error('ERROR al guardar matricula')
                };
          }
        },
        listar(){
        let store = abrirStore('tblmatriculas','readonly'),
            data = store.getAll();
            data.onsuccess = resp=>{
            this.matriculas = data.result.filter(matricula=>matricula.alumno.label.toLowerCase().indexOf(this.buscar.toLowerCase())>-1 || matricula.fecha.indexOf(this.buscar)>-1);
        };
        let storeAlumno = abrirStore('tblalumnos','readonly'),
            datAlumno = storeAlumno.getAll();
        datAlumno.onsuccess = resp=>{
            this.alumnos = datAlumno.result.map(alumno=>{
                return {id: alumno.idAlumno, label: alumno.nombre}
            })
        }
        fetch(`private/modulos/matriculas/matriculas.php`)
          .then((response) => response.json())
          .then((data)=> (this.docentes = data));
    },
  },
    template : `
    <div class="row">
        <div class="row justify-content-md-center">
            <div class="col-12 col-md-6">
                <div class="card border-primary" >
                    <div class="card-header bg-primary text-white">Registro de Alumno</div>
                    <div class="card-body">
                        <form id="frmAlumno" @submit.prevent="guardarMatricula" @reset.prevent="nuevoMatricula()">
                        <div class="row p-1">
                            <div class="col-3 col-md-2">ALUMNO:</div>
                            <div class="col-9 col-md-3">
                                <v-select-alumno required v-model="matricula.alumno" :options="alumnos">Por favor seleccione un alumno</v-select-alumno>
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">FECHA:</div>
                            <div class="col col-md-6">
                            <input required class="form-control" v-model="matricula.fecha" type="date">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2"><label for="chkPagoMatriculas">ACTUALIZAR PAGO</label></div>
                            <div class="col col-md-6">
                            <input class="form-check-input" type="checkbox" v-model="matricula.pago"  id="chkPagoMatriculas">
                            </div>
                        </div>
                        <div class="row p-1">
                          <div class="col-3 col-md-2">
                              <img :src='matricula.comprobante' width="50" height="50"/>
                          </div>
                        <div class="col-9 col-md-10">
                            <div class="input-group mb-3">
                                <label class="input-group-text" for="inputGroupFile01">Subir comprobante</label>
                                <input type="file" accept="image/*" onChange="seleccionarImagen(this)" class="form-control" id="inputGroupFile01">
                            </div>
                          </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col md-6">
                            <input class="btn btn-success" type="submit" value="Guardar Datos">
                            </div>
                            <div class="col col md-6">
                            <input class="btn btn-warning" type="reset" value="Nuevo Registro">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    
    <div class="row ">
      <div class="col-12 col-md-10">
        <div class="card text-bg-light" >
          <div class="card-header" >CONSULTA DE MATRICULAS</div>
            <div class="card-body">
                    <form>
                        <table class="table table-dark table-hover">
                            <thead>
                            <tr>
                                <th>BUSCAR</th>
                                <th colspan="3"><input type="text" @keyup="listar()" class="form-control" 
                                v-model="buscar" placeholder="Buscar por nombre"></th>
                            </tr>
                            <tr>
                                <th>NOMBRE</th>
                                <th>FECHA</th>
                                <th>COMPROBANTE</th>
                                <th colspan="2">PAGO</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="matricula in matriculas" @click='modificarMatricula(matricula)' :key="matricula.idAlumno" >
                                <td>{{matricula.alumno.label}}</td>
                                <td>{{ (new Date(matricula.fecha +' 01:00:00')).toLocaleDateString() }}</td>
                                <td><img :src='matricula.comprobante' width="50" height="50" /></td>
                                <td>{{matricula.pago ? 'ACTUALIZO PAGO' : 'PENDIENTE ACTUALIZAR' }}</td>
                                <td><button @click.prevent="eliminarMatricula(matricula)" class="btn btn-danger">Eliminar</button></td>
                            </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    </div>  
  </div>
`,

});