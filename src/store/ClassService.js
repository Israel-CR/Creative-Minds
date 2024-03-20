import { defineStore } from "pinia";

const classService = defineStore("classService", {
  state: () => {
    return {
      clases: [],
      clase: {},
      token: getUseAuth("token") || "",
      isAuthenticated: getUseAuth("isAuth") || false,
    };
  },
  actions: {
    async getClasses() {
      await fetch("http://localhost:5000/api/clases", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        mode: "cors",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          this.clases = data.clases;
        });
    },
    async getAClass(idClass) {
      await fetch("http://localhost:5000/api/clases/" + idClass, {
        method: "GET",
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
          this.clase = data;
        })
        .catch((error) => {
          console.log("error al procesar la solicitud", error);
          // Si hay algun error, se redirecciona a login
        });
    },
    async AddActivity(idClass, actividad) {
      await fetch("http://localhost:5000/api/actividad/" + idClass, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        mode: "cors",
        credentials: "include",
        body:JSON.stringify(actividad)
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        }).catch((error) => {
          console.log("error al procesar la solicitud", error);
          // Si hay algun error, se redirecciona a login
        });
    },
  },
});

function getUseAuth(key) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
}

export default classService;
