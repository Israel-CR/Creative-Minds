import { defineStore } from "pinia";

const groupService = defineStore("groupService", {
  state: () => {
    return {
    grupos: [],
    token: getUseAuth("token") || "",
    isAuthenticated: getUseAuth("isAuth") || false,
  }
  },
  actions: {

     async getClasses (){
      

          await fetch("http://localhost:5000/api/clases", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        mode: "cors",
        credentials: "include",
      }).then(response => response.json())
      .then((data) => {
         this.clases = data.clases;
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
        console.log(data)
        
        if (!data.error) {
          this.grupos = data.grupos;
        } else {
          alert(data.message);
        }
        
      }).catch((error) => {
        console.log("error al procesar la solicitud", error);
        // Si hay algun error, se redirecciona a login
      })
    },
  },
});


function getUseAuth(key) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
}


export default groupService;
