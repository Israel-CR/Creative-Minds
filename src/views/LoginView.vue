<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import NavBarInicioVue from "@/components/navegacion/NavBarInicio.vue";
import router from "@/router";
import authService from "@/store/AuthService";
import { computed, ref, watch } from "vue";

const store = authService();

let usuario = ref("");
let password = ref("");
const loading = ref(false);
const rules = {
  usuario: {
    required,
  },
  password: {
    required,
    minLength: minLength(6),
  },
};
const validator = useVuelidate(rules, { usuario, password });
const v$ = validator.value;

let errors = computed(() => store.errors);

const loginUser = async () => {
  const valid = await v$.$validate();

  if (valid) {
    try {
      loading.value = true;
      const success = await store.login(usuario.value, password.value);
      if (success) {
        const getUser = await store.getUser();
        router.push({ name: store.user?.rol });
      } else {
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
  }
};
</script>

<template>
  <div
    class="bg-gradient-to-r from-[#00CED1] to-[#0000FF] flex gap-2 flex-col min-h-screen min-w-screen text-lg"
  >
    <NavBarInicioVue />

    <main class="flex justify-center flex-col md:flex-row items-center">
      <div class="hidden rounded-full h-auto md:flex items-center">
        <img
          src="@/assets/img/fondoLogin.png"
          alt=""
          className=" w-full md:float- "
        />
      </div>
      <div class="">
        <h1 class="text-4xl mb-5 font-lato">
          Bienvenido a <b>Creative Minds</b>
        </h1>
        <h2 class="font-changa text-3xl font-bold h-10 text-white text-center">
          Iniciar Sesión
        </h2>

        <div class="alert alert-error" v-for="error in errors">
          <i class="fa fa-circle-exclamation mr-2"></i>
          {{ error.toString() }}
        </div>

        <form class="mt-5 font-lato flex flex-col gap-3">
          <div>
            <label class="font-bold mb-2" htmlFor="">Usuario</label>
            <div class="flex items-center bg-[#ECECEC] rounded-full">
              <i
                class="fa fa-user p-3 translate-x-2 bg-gray-900 text-white rounded-full"
              ></i>
              <input
                class="shadow appearance-none border-2 bg-transparent w-full rounded-r-full p-3 focus:outline-none focus:shadow-xl-outline"
                v-model="usuario"
                type="text"
                placeholder="ejemplo:Juan"
              />
            </div>
            <div class="alert alert-error p-1" v-if="v$.usuario.$error">
              <i class="fa fa-circle-exclamation mr-2"></i>
              <span v-if="v$.usuario.$errors[0].$validator === 'required'"
                >el usuario es requerido.</span
              >
            </div>
          </div>
          <div class="pb-10">
            <label class="font-bold mb-2" htmlFor="">Contraseña</label>
            <div class="flex items-center bg-[#ECECEC] rounded-full">
              <i
                class="fa fa-lock p-3 translate-x-2 bg-gray-900 text-white rounded-full"
              ></i>
              <input
                class="shadow appearance-none border-2 bg-transparent w-full rounded-r-full p-3 focus:outline-none focus:shadow-xl-outline"
                type="password"
                v-model="password"
                placeholder="Escribe tu contraseña"
              />
            </div>
            <div class="alert alert-error p-1" v-if="v$.password.$error">
              <i class="fa fa-circle-exclamation mr-2"></i>
              <span v-if="v$.password.$errors[0].$validator === 'required'"
                >la contraseña es requerido.</span
              >
              <span v-else
                >la contraseña debe tener minimo 6 caracteres.</span
              >
            </div>

            <div v-if="loading" class="text-center text-white">
              <span class="loading loading-dots loading-lg"></span>
            </div>
          </div>

          <button
            class="flex justify-between items-center text-lg font-changa font-semibold shadow py-1 px-3 shadow-blue-400 bg-[#FFBD59] rounded-3xl hover:saturate-200 transition ease-out delay-150 hover:translate-y-1 hover:scale-100 duration-300"
            type="button"
            @click="loginUser"
          >
            <p class="grow">Iniciar Sesion</p>
            <i
              class="shadow-slate-50 rounded-full bg-gray-600 text-white p-3 fa fa-sign-in text-end"
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
