<template>
    <div class="row">
        <div class="row justify-content-md-center">
            <div class="col-12 col-md-6">
                <div class="card border-primary" >
                    <div class="card-header bg-primary text-white">CHAT USUARIO</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <ul id="ltsMensajes">
                                    <li v-for="msg in chats" :key="msg._id">
                                        {{msg.from}} - {{msg.message}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <form id="frmChat" @submit.prevent="guardarChat" @reset.prevent="nuevoChat()">
                            <input type="text" placeholder="escribe tu mensaje" required v-model="chat.message" class="form-control" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import alertify from 'alertifyjs';

    export default (await import('vue')).defineComponent({
        data() {
            return {
                chats:[],
                chat:{
                    from: 'usuario',
                    to: 'todos',
                    message:'',
                    status:'',
                    fecha: new Date()
                }
            }
        },
        methods:{
            guardarChat(){
                if(this.chat.msg!=''){
                    this.chats.push({...this.chat});
                    socketio.emit('chat',this.chat);
                }else{
                    alertify.error('Por favor escriba un mensaje');
                }
            },
            obtenerHistorial(){
                socketio.emit('historial');
                socketio.on('historial', chats=>{
                    this.chats = chats;
                });
            }
        },
        created(){
            this.obtenerHistorial();
            socketio.on('chat', chat=>{
                this.chats.push(chat);
            });
            
        }
    })


</script>
