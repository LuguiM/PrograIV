import './bootstrap';
import { createApp } from 'vue';
import alumnos from './components/AlumnoComponent.vue';
import docentes from './components/DocenteComponent.vue';
import materias from './components/MateriaComponent.vue';
import matriculas from './components/MatriculaComponent.vue';
import inscripcion from './components/InscripcionComponent.vue';
import chat from './components/ChatComponent.vue';
window.db='';
window.socketio = io('http://127.0.0.1:3001');
socketio.on('conect', socket=>{
    console.log('conectado a nodejs en puerto 3001');
});

window.db = '';

const app = createApp({
  
    components:{
        alumnos,
        docentes,
        materias,
        matriculas,
        inscripcion,
        chat,
    },
    data(){
        return {
            forms:{
                docente:{ mostrar:false, },
                materia:{ mostrar:false, },
                alumno:{ mostrar:false, },
                matricula:{ mostrar:false, },
                inscripcion:{ mostrar:false, },
                chat:{mostrar:false,},
            }
        }
    },
    methods: {
        abrirCerrarFormulario(form){
            this.forms[form].mostrar = !this.forms[form].mostrar;
            //this.$refs[form].listar();
        },
        abrirBD() {
            let indexDB = indexedDB.open('db_sistema_academico', 1);
            indexDB.onupgradeneeded = e => {
                let req = e.target.result,
                    tbldocentes = req.createObjectStore('tbldocentes', {
                        keyPath: 'idDocente'
                    }),
                    tblalumnos = req.createObjectStore('tblalumnos', {
                        keyPath: 'idAlumno'
                    }),
                    tblmaterias = req.createObjectStore('tblmaterias', {
                        keyPath: 'idMateria'
                    }),
                    tblmatriculas = req.createObjectStore('tblmatriculas', {
                        keyPath: 'idMatricula'
                    }),
                    tblinscripcion = req.createObjectStore('tblinscripcion', {
                        keyPath: 'idinscripcion'
                    });
                tbldocentes.createIndex('idDocente', 'idDocente', {
                    unique: true
                });
                tbldocentes.createIndex('codigo', 'codigo', {
                    unique: true
                });
            };
            indexDB.onsuccess = e => {
                db = e.target.result;
            };
            indexDB.onerror = e => {
                console.error('ERROR al crear, abrir la BD', e);
            };
        }
    },
    created() {
        this.abrirBD();
    }

});

import ExampleComponent from './components/ExampleComponent.vue';

app.component('example-component', ExampleComponent);



app.mount('#app');

async function seleccionarImagen(image){
    let archivo = image.files[0];
    if(archivo){
        let blob = await img(archivo, 1),
            reader = new FileReader();
        reader.onload = e=>{
            app.$refs.matricula.matricula.comprobante = e.target.result;
            console.log(e.target.result);
        };
        reader.readAsDataURL(blob);
    }else {
        console.log("Poir favor seleccione una imagen validad...")
    }
}
