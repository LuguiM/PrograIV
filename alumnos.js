Vue.component('alumnos',{
    data(){
        return{
          db:'',
          buscar:'',
          alumnos:[],
          accion: 'nuevo',
          alumno:{
            idAlumno:'',
            codigo:'',
            nombre:'',
            direccion:'',
            municipio:'',
            departamento:'',
            telefono:'',
            nacimiento:'',
            sexo:'',
            dui:'',
            titulo:''
          }
        }
      },
      methods:{
        nuevoAlumno(){
          this.accion = 'nuevo';
          this.alumno.idAlumno = '';
          this.alumno.codigo = '';
          this.alumno.nombre = '';
          this.alumno.direccion = '';
          this.alumno.municipio = '';
          this.alumno.departamento = '';
          this.alumno.telefono = '';
          this.alumno.nacimiento = '';
          this.alumno.sexo = '';
          this.alumno.dui = '';
          this.alumno.titulo ='';
        },
        modificarAlumno(alumno){
          this.accion = 'modificar';
          this.alumno = alumno;
          
        },
        guardarAlumno(){
          if(this.alumno.nombre=='' || this.alumno.codigo==''){
            console.log('Por favor ingrese los datos correspondientes');
            return;
          }
          let store = abrirStore('tblalumnos','readwrite');
          if(this.accion==='nuevo'){
            this.alumno.idAlumno = new Date().getTime().toString(16); //las cantidad milisegundo y lo convierte en hexadecimal
            
          }
          let query = store.put( JSON.parse( JSON.stringify(this.alumno)));
          query.onsuccess = resp=>{
            fetch(`private/modulos/alumnos/alumnos.php?accion=${this.accion}&alumno=${JSON.stringify(this.alumno)}`)
            .then(resp=>resp.json())
            .then(resp=>{
                console.log(resp);
            });
            this.nuevoAlumno();
            this.listar();
          };
          query.onerror = err=>{
            console.error('ERROR al guardar alumno', err);
          };
          
        },
        eliminarAlumno(alumno){
          if(confirm(`Esta seguro de eliminar el docente ${alumno.nombre}?`)){
            let store = abrirStore('tblalumnos','readwrite'),
                req = store.delete(alumno.idAlumno);
                req.onsuccess = res=>{
                  fetch(`private/modulos/alumnos/alumnos.php?accion=${this.accion}&alumno=${JSON.stringify(this.alumno)}`)
                  .then(resp=>resp.json())
                  .then(resp=>{
                      console.log(resp);
                  });
                  this.listar();
                };
                req.onerror = err=>{
                  console.error('ERROR al guardar alumno')
                };
          }
        },
        listar(){
          let store = abrirStore('tblalumnos','readonly'),
              data = store.getAll();
            data.onsuccess = resp=>{
            this.alumnos = data.result.filter(alumno=>alumno.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1 || alumno.codigo.indexOf(this.buscar)>-1);
        };
        fetch(`private/modulos/alumnos/alumnos.php`)
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
                        <form id="frmAlumno" @submit.prevent="guardarAlumno" @reset.prevent="nuevoAlumno()">
                        <div class="row p-1">
                            <div class="col-3 col-md-2">CODIGO:</div>
                            <div class="col-9 col-md-3">
                            <input class="form-control" type="text" v-model="alumno.codigo" name="txtCodigoAlumno" id="txtCodigoAlumno">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">NOMBRE:</div>
                            <div class="col col-md-6">
                            <input class="form-control" v-model="alumno.nombre" type="text" name="txtNombreAlumno" id="txtNombreAlumno">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">DIRECCION:</div>
                            <div class="col col-md-6">
                            <input class="form-control" v-model="alumno.direccion" type="text" name="txtDireccionAlumno" id="txtDireccionAlumno">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">MUNICIPIO:</div>
                            <div class="col col-md-6">
                            <input class="form-control" v-model="alumno.municipio" type="text" name="txtMunicipioAlumno" id="txtMunicipioAlumno">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">DEPARTAMENTO:</div>
                            <div class="col col-md-6">
                            <input class="form-control" v-model="alumno.departamento" type="text" name="txtDepartamentoAlumno" id="txtDepartamentoAlumno">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">TELEFONO:</div>
                            <div class="col col-md-6">
                            <input class="form-control" v-model="alumno.telefono" type="text" name="txtTelefonoAlumno" id="txtTelefonoAlumno">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">FECHA DE NACIMIENTO:</div>
                            <div class="col col-md-6">
                            <input class="form-control" v-model="alumno.nacimiento" type="date" name="txtNacimientoAlumno" id="txtNacimientoAlumno">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">SEXO:</div>
                            <div class="col col-md-6">
                            <input class="form-control" v-model="alumno.sexo" type="text" name="txtSexoAlumno" id="txtSexoAlumno">
                            </div>
                        </div>
                        <div class="row p-1">
                          <div class="col-3 col-md-2">
                              <img :src='alumno.dui' width="50" height="50"/>
                          </div>
                        <div class="col-9 col-md-10">
                            <div class="input-group mb-3">
                                <label class="input-group-text" for="inputGroupFile01">Subir DUI</label>
                                <input type="file" accept="image/*" onChange="seleccionarImagen(this)" class="form-control" id="inputGroupFile01">
                            </div>
                          </div>
                        </div>
                        <div class="row p-1">
                          <div class="col-3 col-md-2">
                              <img :src='alumno.titulo' width="50" height="50"/>
                          </div>
                        <div class="col-9 col-md-10">
                            <div class="input-group mb-3">
                                <label class="input-group-text" for="inputGroupFile01">Subir Titulo</label>
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
          <div class="card-header" >CONSULTA DE ALUMNOS</div>
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
                                <th>CODIGO</th>
                                <th>NOMBRE</th>
                                <th>DIRECCION</th>
                                <th>MUNICIPIO</th>
                                <th>DEPARTAMENTO</th>
                                <th>TELEFONO</th>
                                <th>FECHA DE NACIMIENTO</th>
                                <th>SEXO</th>
                                <th>DUI</th>
                                <th colspan="2">TITULO</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="alumno in alumnos" @click='modificarAlumno(alumno)' :key="alumno.idAlumno" >
                                <td>{{alumno.codigo}}</td>
                                <td>{{alumno.nombre}}</td>
                                <td>{{alumno.direccion}}</td>
                                <td>{{alumno.municipio}}</td>
                                <td>{{alumno.departamento}}</td>
                                <td>{{alumno.telefono}}</td>
                                <td>{{alumno.nacimiento}}</td>
                                <td>{{alumno.sexo}}</td>
                                <td><img :src='alumno.dui' width="50" height="50" /></td>
                                <td><img :src='alumno.titulo' width="50" height="50" /></td>
                                <td><button @click.prevent="eliminarAlumno(alumno)" class="btn btn-danger">Eliminar</button></td>
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