import { defineStore } from "pinia";

const authService = defineStore("authService", {
  state: () => {
    return {
      token: getUseAuth("token") || "",
      user: {},
      isAuthenticated: getUseAuth("isAuth") || false,
      errors: [],
    };
  },
  actions: {
    async login(usuario, password) {
      try {
        const res = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: {
            Acept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario: usuario,
            password: password,
          }),
        });

        const response = await res.json();

        if ("error" in response) {
          this.errors.push(response.error);
          setTimeout(() => {
            this.errors = [];
          }, 3000);

          return false;
        }
        this.token = response.token;
        this.isAuthenticated = true;
        setUseAuth("token", this.token);
        setUseAuth("isAuth", this.isAuthenticated);
        return true;
      } catch (error) {
        console.log("este es el error", error);
        return false;
      }
    },
    async register(
      nombre,
      fechaNacimiento,
      genero,
      usuario,
      rol,
      correo,
      password
    ) {
      try {
        const res = await fetch("http://localhost:5000/api/register", {
          method: "POST",
          headers: {
            Acept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: nombre,
            fechaNacimiento: fechaNacimiento,
            genero: genero,
            rol: rol,
            usuario: usuario,
            correo: correo,
            password: password,
          }),
        });

        const response = await res.json();

        if ("error" in response) {
          this.errors.push(response.error);
          setTimeout(() => {
            this.errors = [];
          }, 3000);

          return false;
        }
        this.token = response.token;
        this.isAuthenticated = true;
        setUseAuth("token", this.token);
        setUseAuth("isAuth", this.isAuthenticated);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },

    logout() {
      // Marca al usuario como no autenticado y elimina el token
      this.isAuthenticated = false;
      this.token = null;

      // Elimina el estado de autenticación y el token de localStorage
      deleteUseAuth("isAuth");
      deleteUseAuth("token");
    },

    async getUser() {
      await fetch("http://localhost:5000/api/verify", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        mode: "cors",
        credentials: "include",
      })
        .then((res) => {
          if (res.ok) {
            // La solicitud se completó con éxito, procesamos el JSON
            return res.json();
          } else {
            // Marca al usuario como no autenticado y elimina el token
            this.isAuthenticated = false;
            this.token = null;
            // Elimina el estado de autenticación y el token de localStorage
            deleteUseAuth("isAuth");
            deleteUseAuth("token");

            // La solicitud falló, manejamos el error
            console.error("La solicitud falló con código:", res.status);

            // Puedes lanzar una excepción o devolver un valor indicando error
            throw new Error("Error en la petición");
          }
        })
        .then((data) => {
          this.user = data;
          // Actualiza el estado del componente con la respuesta
        })
        .catch((error) => {
          console.log("error al procesar la solicitud", error);
          // Si hay algun error, se redirecciona a login
        });
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

export default authService;
