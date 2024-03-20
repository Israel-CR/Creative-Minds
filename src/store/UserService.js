import { defineStore } from "pinia";

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
