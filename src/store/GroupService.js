import { defineStore } from "pinia";
import router from "@/router";

const groupService = defineStore("groupService", {
  state: () => {
    return {
    grupos: [],
    grupo:{},
    errorMessages:{},
    currentGroup:{},
    feedbackMessages:[],

    token: getUseAuth("token") || "",
    isAuthenticated: getUseAuth("isAuth") || false,
  }
  },
  actions: {

     async getGroup(idGrupo){
          await fetch("http://localhost:5000/api/grupos/" + idGrupo, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        mode: "cors",
        credentials: "include",
      })
      .then(res => res.json())
      .then(data => {
         this.grupo = data
         
      }).catch(err=>{
        console.log(err)
      }) 
  },
  async addGroup(infoGroup) {
    await fetch("http://localhost:5000/api/grupo/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(infoGroup),
    })
    .then(res=> res.json())
    .then(data=>{
      setTimeout(() => {
        router.replace({ name: 'grupo', params: { idGrupo: data?._id }})
      }, 3000);
      
     
    })
    .catch(error=>{
      console.log("error al procesar la clase", error)
    })
  },
  async joinAGroup(codigo){
    await fetch("http://localhost:5000/api/alumno/grupo",{
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({codigo:codigo}),
    }).then(res=> res.json())
    .then(data =>  {
      if('error' in data){
        this.errorMessages = data
        setTimeout(() => {
          this.errorMessages = {}
          
        }, 3000);

        
      }
      console.log(data)
    })
    .catch(error=>{
      console.log(error)
    })
  },

  async getGroupsStudent(){
    await fetch("http://localhost:5000/api/alumno/grupos",{
      method: 'GET',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      mode: "cors",
      credentials: "include",
    }).then(res=> res.json())
    .then(data =>  {
      if('error' in data){
        this.errorMessages = data
        setTimeout(() => {
          this.errorMessages = {} 
        }, 3000);
      }
      this.grupos= data
      
    })
    .catch(error=>{
      console.log(error)
    })

  },
  

  async giveFeedback(message,idGroup){
      console.log(message)
      await fetch("http://localhost:5000/api/alumno/feedback/" + idGroup,{
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({message:message}),
    }
    ).then(res=>{
      if(res.ok){
        return res.json()
      }else{
        throw new Error(res.status,"Error en la petición");
      }
    })
    .then(data=>{
      console.log(data)
    })
  },

  async getFeedbackMessages(idGrupo){
    await fetch("http://localhost:5000/api/alumno/feedback/" + idGrupo, {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.token}`,
  },
  mode: "cors",
  credentials: "include",
})
.then(res => res.json())
.then(data => {
   this.feedbackMessages = data
}).catch(err =>{
  console.log(err)
}) 
},

  async updateGroup(idGroup) {
    await fetch("http://localhost:5000/api/grupos/" + idGroup,{
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify(this.currentGroup),
    }
    ).then(res=>{
      if(res.ok){
        return res.json()
      }else{
        throw new Error(res.status,"Error en la petición");
      }
    })
    .then(data=>{
      console.log(data)
    })
  },
  async deleteGroup(idGroup){
    await fetch("http://localhost:5000/api/grupos/" + idGroup, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      mode: "cors",
      credentials: "include",}
      ).then(res=>res.json())
      .then(data=>{
        return data
      }).catch(error=>{
        console.log(error)
      })
  },

  async deleteClassGroup(idGrupo,idClase) {
    console.log(idClase)
    await fetch("http://localhost:5000/api/grupos/eliminar-actividad/" + idGrupo + '/' + idClase, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      mode: "cors",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        return data;
        
      })
      .catch((error) => {
        console.log(error);
      });
  },

    async getGroups() {
      await fetch('http://localhost:5000/api/grupos', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        mode: "cors",
        credentials: "include",
      })
      .then(res => res.json())
      .then((data) => {
        if('error' in data){
          this.errorMessages = data
          setTimeout(() => {
            this.errorMessages = {} 
          }, 3000);
        }else{
          this.grupos = data?.grupos;
          
        }
        
      }).catch((error) => {
        console.log("error al procesar la solicitud", error);
        // Si hay algun error, se redirecciona a login
      })
    },
    reset() {
      this.grupos = [],
    this.grupo={}
    this.errorMessages={}
    this.currentGroup={}
    this.feedbackMessages=[]
      // Restablece otros datos del estado si los tienes...
    },
  },
});


function getUseAuth(key) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
}


export default groupService;
