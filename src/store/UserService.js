
import { defineStore } from "pinia";
import { computed } from "vue";

const userService = defineStore("userService", {
  state: () => {
    return {
    perfil: {},
    token: getUseAuth("token") || "",
    isAuthenticated: getUseAuth("isAuth") || false,
  }
  },
  actions: {
    async getProfile() {
      await fetch("http://localhost:5000/api/usuarios/perfil", {
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
        this.perfil = data;
        
      }).catch((error) => {
        console.log("error al procesar la solicitud", error);
        // Si hay algun error, se redirecciona a login
      })
    },
   
    async updateProfile(userProfile) {
      await fetch("http://localhost:5000/api/usuarios/perfil",{
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(userProfile),
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
    formatFecha(fecha){
        const date = new Date(fecha);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Zero-pad month
        const day = String(date.getDate()).padStart(2, "0"); // Zero-pad day
        
        return `${year}-${month}-${day}`;
    }
  },
});

function setUseAuth(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getUseAuth(key) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
}
function deleteUseAuth(key) {
  localStorage.removeItem(key);
}

export default userService;
