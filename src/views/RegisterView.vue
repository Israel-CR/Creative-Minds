<script setup>
import NavBarInicio from '@/components/navegacion/NavBarInicio.vue';
import {computed,  ref } from 'vue';
import router from "@/router";
import authService from "@/store/AuthService";


const authStore = authService();

let nombre= ref('')
let fechaNacimiento= ref('')
let genero= ref('')
let usuario= ref('')
let rol=ref('')
let correo=ref('')
let password=ref('')




const loading = ref(false);

let errors = computed(() => authStore.errors);

const registerUser = async () => {
  try {
    loading.value = true;
    const success = await authStore.register(nombre.value,fechaNacimiento.value,genero.value, usuario.value, rol.value, correo.value, password.value);
    if (success) {
      const getUser = await authStore.getUser();
          router.push({ name: authStore.user?.rol });
     
      }else {
      loading.value = false;
    }
  } catch (error) {
    loading.value = true;
    console.log(error);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 5000);
  }
};
</script>

<template>
  <div
    class="bg-gradient-to-r from-[#00CED1] to-[#0000FF] flex gap-5 flex-col min-h-screen min-w-screen transition-transform transform translate-x-0 duration-700 text-lg"
  >
    <NavBarInicio/>
    <main
      class=" md:px-20 flex items-center px-10 z-0 text"
    >
      <div class="hidden  h-auto w-1/2  md:flex items-center">
        <img src="@/assets/img/fondoRegister.png" className="object-cover w-full h-full " />
      </div>

      <div class="self-center md:w-1/2">
        <h1 class="text-4xl mb-5 font-lato ">
          Bienvenido a <b>Creative Minds</b>
        </h1>

        <h2 class=" font-play text-3xl font-bold h-10 text-white text-center">Crear Cuenta</h2>
        <div
          class="bg-red-400 p-2 rounded-md flex justify-between items-center"
          v-for="error in errors" :key="error"
        >
          {{ error.toString() }} <i class="fa fa-circle-exclamation mr-2"></i>
        </div>
        <form
          class="text-md font-coming-soon grid gap-2 pb-2"
        >
          <div>
            <label class="  font-bold" htmlFor="">Nombre completo</label>
            <input
              class="shadow appearance-none bg-[#ECECEC] border-2  w-full rounded-full p-3 focus:outline-none focus:shadow-xl-outline"
              type="text"
              placeholder="ejemplo: Juan Hernandez Hernandez"
              v-model="nombre"
              required
            />
          </div>
          <div class="grid grid-cols-2 gap-5">
            <div class=" col-span-1 flex flex-col">
              <label class="  font-bold" htmlFor=""
                >Fecha de nacimiento</label
              >
              <input
                class="shadow appearance-none border-2 bg-[#ECECEC] rounded-full py-2 px-3
                        leading-tight focus:outline-none focus:shadow-xl-outline"
                type="date"
                v-model='fechaNacimiento'
                required
              />
            </div>
            <div class="flex flex-col items-center ">
              <p class="font-bold mb-2">Genero</p>
              <div class="flex items-center gap-2 mb-2">
                <label class="  font-bold" htmlFor="">Masculino</label>
                <input
                  class=" form-radio h-5 w-5 text-indigo-600"
                  type="radio"
                  value="Masculino"
                  v-model="genero"
                  required
                />
                <label class="font-bold" htmlFor="">Femenino</label>
                <input
                  class=" form-radio h-5 w-5 text-indigo-600"
                  type="radio"
                  value="Femenino"
                  v-model="genero"
                  required
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div class="col-span-1">
              <label class="  font-bold" htmlFor="">Usuario</label>
              <input
                class="shadow appearance-none border-2 bg-[#ECECEC] w-full rounded-full p-3 focus:outline-none focus:shadow-xl-outline"
                type="text"
                v-model="usuario"
                placeholder="ejemplo:Juan"
              />
            </div>

            <div class="col-span-1">
              <p class="font-bold">Rol</p>
              <select class="border-2 p-3 rounded-full w-full bg-[#ECECEC]" v-model="rol">
                <option value="">elige tu rol</option>
                <option  value="Alumno">Alumno</option>
                <option  value="Docente">Docente</option>
              </select>
            </div>
          </div>
          <div>
            <label class="font-bold" htmlFor="">Correo Electrónico</label>
            <input
              class="shadow appearance-none border-2 bg-[#ECECEC] w-full rounded-full p-3 focus:outline-none focus:shadow-xl-outline"
              type="email"
              placeholder="ejemplo:juanhh@gmail.com"
              v-model="correo"
            />
          </div>
          <div>
            <label class="  font-semibold" htmlFor="">Contraseña</label>
            <input
              class="shadow appearance-none border-2 bg-[#ECECEC] w-full rounded-full p-3 focus:outline-none focus:shadow-xl-outline"
              type="password"
              placeholder="Escribe tu contraseña"
              v-model="password"
            />
           
          </div>
          <button
            class="flex items-center text-lg font-changa font-semibold shadow py-1 px-3 shadow-sky-400 bg-[#5CA1C6]  rounded-3xl hover:saturate-200 transition ease-out delay-150 hover:translate-y-1 hover:scale-100 duration-300"
            type="button"
            @click="registerUser"
          >
            <p class="grow">Registrarse</p>
            <i
              class=" rounded-full bg-blue-600 text-white p-3 fa fa-sign-in text-end"
            ></i>
          </button>
        </form>
      </div>
    </main>
  </div>
</template>


<style scoped>
.animation-delay-100 {
  animation-delay: 100ms;
}
.animation-delay-200 {
  animation-delay: 200ms;
}
</style>
