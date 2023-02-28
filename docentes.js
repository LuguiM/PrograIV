Vue.component('docentes',{
    data(){
        return{
          db:'',
          buscar:'',
          docentes:[],
          accion: 'nuevo',
          docente:{
            idAlumno:'',
            codigo:'',
            nombre:'',
            direccion:'',
            municipio:'',
            departamento:'',
            telefono:'',
            nacimiento:'',
            sexo:''
          }
        }
      },
      methods:{
        nuevoAlumno(){
          this.accion = 'nuevo';
          this.docente.idAlumno = '';
          this.docente.codigo = '';
          this.docente.nombre = '';
          this.docente.direccion = '';
          this.docente.municipio = '';
          this.docente.departamento = '';
          this.docente.telefono = '';
          this.docente.nacimiento = '';
          this.docente.sexo = '';
        },
        modificarAlumno(docente){
          this.accion = 'modificar';
          this.docente = docente;
          
        },
        guardarAlumno(){
          if(this.docente.nombre=='' || this.docente.codigo==''){
            console.log('Por favor ingrese los datos correspondientes');
            return;
          }
          let store = abrirStore('tbldocentes','readwrite');
          if(this.accion==='nuevo'){
            this.docente.idAlumno = new Date().getTime().toString(16); //las cantidad milisegundo y lo convierte en hexadecimal
            
          }
          let query = store.put( JSON.parse( JSON.stringify(this.docente)));
          query.onsuccess = resp=>{
            this.nuevoAlumno();
            this.listar();
          };
          query.onerror = err=>{
            console.error('ERROR al guardar docente', err);
          };
          
        },
        eliminarAlumno(docente){
          if(confirm(`Esta seguro de eliminar el docente ${docente.nombre}?`)){
            let store = abrirStore('tbldocentes','readwrite'),
                req = store.delete(docente.idAlumno);
                req.onsuccess = res=>{
                  this.listar();
                };
                req.onerror = err=>{
                  console.error('ERROR al guardar docente')
                };
          }
        },
        listar(){
          let store = abrirStore('tbldocentes','readonly'),
              data = store.getAll();
            data.onsuccess = resp=>{
            this.docentes = data.result.filter(docente=>docente.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1 || docente.codigo.indexOf(this.buscar)>-1);
        };
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
                            <input class="form-control" type="text" v-model="docente.codigo" name="txtCodigoAlumno" id="txtCodigoAlumno">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">NOMBRE:</div>
                            <div class="col col-md-6">
                            <input class="form-control" v-model="docente.nombre" type="text" name="txtNombreAlumno" id="txtNombreAlumno">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">DIRECCION:</div>
                            <div class="col col-md-6">
                            <input class="form-control" v-model="docente.direccion" type="text" name="txtDireccionAlumno" id="txtDireccionAlumno">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">MUNICIPIO:</div>
                            <div class="col col-md-6">
                            <input class="form-control" v-model="docente.municipio" type="text" name="txtMunicipioAlumno" id="txtMunicipioAlumno">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">DEPARTAMENTO:</div>
                            <div class="col col-md-6">
                            <input class="form-control" v-model="docente.departamento" type="text" name="txtDepartamentoAlumno" id="txtDepartamentoAlumno">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">TELEFONO:</div>
                            <div class="col col-md-6">
                            <input class="form-control" v-model="docente.telefono" type="text" name="txtTelefonoAlumno" id="txtTelefonoAlumno">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">FECHA DE NACIMIENTO:</div>
                            <div class="col col-md-6">
                            <input class="form-control" v-model="docente.nacimiento" type="date" name="txtNacimientoAlumno" id="txtNacimientoAlumno">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">SEXO:</div>
                            <div class="col col-md-6">
                            <input class="form-control" v-model="docente.sexo" type="text" name="txtSexoAlumno" id="txtSexoAlumno">
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
                                <th colspan="2"><input type="text" @keyup="listar()" class="form-control" 
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
                                <th colspan="2">SEXO</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="docente in docentes" @click='modificarAlumno(docente)' :key="docente.idAlumno" >
                                <td>{{docente.codigo}}</td>
                                <td>{{docente.nombre}}</td>
                                <td>{{docente.direccion}}</td>
                                <td>{{docente.municipio}}</td>
                                <td>{{docente.departamento}}</td>
                                <td>{{docente.telefono}}</td>
                                <td>{{docente.nacimiento}}</td>
                                <td>{{docente.sexo}}</td>
                                <td><button @click.prevent="eliminarAlumno(docente)" class="btn btn-danger">Eliminar</button></td>
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