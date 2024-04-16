import router from "@/router";
import { defineStore } from "pinia";

const classService = defineStore("classService", {
  state: () => {
    return {
      clases: [],
      informes: [],
      informe:{},
      currentClase:	null,
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
          this.clases = data?.clases;
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
          return (this.clase = data);
        })
        .catch((error) => {
          console.log("error al procesar la solicitud", error);
          // Si hay algun error, se redirecciona a login
        });
    },
    async addClase(infoClass) {
      await fetch("http://localhost:5000/api/clase/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(infoClass),
      })
        .then((res) => res.json())
        .then((data) => {
          setTimeout(() => {
            router.replace({
              name: "editarClase",
              params: { idClase: data?._id },
            });
          }, 3000);
        })
        .catch((error) => {
          console.log("error al procesar la clase", error);
        });
    },

    async deleteClass(idClase) {
      await fetch("http://localhost:5000/api/clases/" + idClase, {
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
          return data;
        })
        .catch((error) => {
          console.log(error);
        });
    },//CRUD DE CLASES


    async getInformes() {
      await fetch("http://localhost:5000/api/informes", {
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
          this.informes= data
        });
    },

    async getAnInforme(idInforme) {
      console.log(idInforme)

      await fetch("http://localhost:5000/api/informes/" + idInforme, {
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
       
        this.informe= data
        })
        .catch((error) => {
          console.log("error al procesar la solicitud", error);
          // Si hay algun error, se redirecciona a login
        });
    },
    async getInformesAlumno() {
      await fetch("http://localhost:5000/api/alumno/informes", {
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
       
        this.informes= data
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
        body: JSON.stringify(actividad),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log("error al procesar la solicitud", error);
          // Si hay algun error, se redirecciona a login
        });
    },
    async AsignClassGroup(idGrupo, idClase) {
      await fetch("http://localhost:5000/api/grupos/asignar-actividad", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({ grupoId: idGrupo, actividadId: idClase }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTimeout(() => {
            router.replace({ name: "grupo", params: { idGrupo: idGrupo } });
          }, 3000);
        })
        .catch((error) => {
          console.log("error al procesar la clase", error);
        });
    },
    

    async SendActivity(idClass, respuestas, calificacion) {
     
      await fetch(
        "http://localhost:5000/api/alumno/actividad/" +
          idClass +
          "/guardar-resultados",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          mode: "cors",
          credentials: "include",
          body: JSON.stringify({
            respuestas: respuestas,
            calificacion: calificacion,
            idActividad: this.currentClase,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log("error al procesar la solicitud", error);
          // Si hay algun error, se redirecciona a login
        });
    },
    reset() {
      this.clases = [];
      this.clase = {};
      // Restablece otros datos del estado si los tienes...
    },
  },
});

function getUseAuth(key) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
}

export default classService;
