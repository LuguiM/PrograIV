var db;

app = new Vue({
    el:"#app",
    data:{
        forms:{
          alumno:{ mostrar:false, },
          materia:{ mostrar:false, },
          matricula:{ mostrar:false, },
          inscripcion:{ mostrar:false, },
          docente:{mostrar:false,}
        }
    },
    methods: {
      abrirCerrarFormulario(form){
        this.forms[form].mostrar = !this.forms[form].mostrar;
        this.$refs[form].listar();
      },
      abrirBD(){
        let indexDB = indexedDB.open('db_sistema_academico',1);
        indexDB.onupgradeneeded = e=>{
          let req = e.target.result,
            tblalumnos = req.createObjectStore('tblalumnos',{keyPath: 'idAlumno'}),
            tblmaterias = req.createObjectStore('tblmaterias',{keyPath: 'idMateria'});
            tbldocentes = req.createObjectStore('tbldocentes',{keyPath:'idDocente'})
            
            tblalumnos.createIndex('idAlumno','idAlumno',{unique:true});
            tblalumnos.createIndex('codigo','codigo',{unique:true});
            tbldocentes.createIndex('idDocente','idDocente',{unique:true});
        };
        indexDB.onsuccess = e=>{
          db = e.target.result;
        };
        indexDB.onerror = e=>{
          console.error('ERROR al crear, abrir la BD',e);
        };
      }
    
     
    },
    created(){
      this.abrirBD();
    }
  });

  function abrirStore(store,modo){
    let ltx = db.transaction(store,modo);
    return ltx.objectStore(store);
  }