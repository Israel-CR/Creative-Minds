<script setup>
import groupService from "@/store/GroupService";
import userService from "@/store/UserService";


import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const grupoStore = groupService();
const userStore= userService()

const route = useRoute();
const idGroup = route.params.idGrupo;

const tabSelected = ref(1);
const changeTabSlected = (value) => {
  tabSelected.value = value;
};

onMounted(() => {
  grupoStore.getGroup(idGroup);
});

const retroChat = ref([
  {
    user:'israel',
    date: '12 jun, 12:45',
    message: "hola como estas",
  },
  {

    user:'juan',
    date: '12 jun, 12:50',
    message: "hola como estas",
  },
]);
const feedbackMessage=ref('')
// funcion para los chats de retroalimentacion
function handleChat(e) {
  e.preventDefault();
  const mensaje = {
        user: userStore.perfil.nombre,
        message: feedbackMessage.value,
        date: new Date().toLocaleString(),
      };

      retroChat.value.push(mensaje);
      feedbackMessage.value = '';
      window.scrollTo(0, document.body.scrollHeight);
 
}
</script>

<template>
  <div class="  card card-compact bg-base-100 font-lato">
    <div class="card-body text-center">
      
      <div class="bg-white ">
        <h1 class="font-bold text-4xl">{{ grupoStore.grupo.nombre }}</h1>
      <p class="text-lg font">
        Codigo de grupo:
        <b class="text-xl font-bold">{{ grupoStore.grupo.codigo }}</b>
      </p>
      </div>
      <div class="divider"></div>
      <ul
        class="menu menu-horizontal w-full flex gap-3 bg-base-200 rounded-full"
      >
        <button
          @click="changeTabSlected(1)"
          class="grow rounded-t-lg p-1 is-active"
          :class="{ 'bg-primary text-white': tabSelected === 1 }"
        >
          Actividades
        </button>
        <button
          @click="changeTabSlected(2)"
          class="grow rounded-t-lg"
          :class="{ 'bg-primary text-white': tabSelected === 2 }"
        >
          Alumnos
        </button>
        <button
          @click="changeTabSlected(3)"
          class="grow rounded-t-lg"
          :class="{ 'bg-primary text-white': tabSelected === 3 }"
        >
          Novedades
        </button>
      </ul>
    </div>
  </div>
  <div v-if="tabSelected === 1" class="my-3 }">
    <div class="card bg-base-200">
      <div class="card-body text-center text-lg">
        <h1 class="font-bold text-2xl text-center">Asignar una clase</h1>
        <p>Este grupo aun no tiene actividades asignadas</p>
        <p class="font-thin">Elige una clase y asígnala a esta grupo</p>
        <div class="card-actions flex justify-center">
          <button class="btn btn-info">explorar cursos</button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="tabSelected === 2" class="my-3">
    <div class="card bg-base-200">
      <div class="card-body flex justify-center items-center text-lg">
        <h1 class="font-bold text-2xl text-center">Agregar alumnos</h1>
        <p>Este grupo aun no tiene alumnos</p>
        <p class="font-thin">
          Comparte el siguiente codigo para que los estudiantes puedan unirse al
          grupo.
        </p>
        <div class="border border-black w-40 p-4 rounded-lg">
          <h1 class="text-5xl font-bold">{{ grupoStore.grupo.codigo }}</h1>
        </div>
      </div>
    </div>
  </div>
  <div v-if="tabSelected === 3" class="my-3">
    <div class="card bg-base-100">
      <div class="card-body">
        {{ feedbackMessage }}
      
        <div
          class="chat"
          :class="mensaje.user=== userStore.perfil.nombre?'chat-end': 'chat-start'"
          v-for="mensaje in retroChat"
          @key="mensaje.message"
        >
          <div class="chat-image avatar">
            <div class="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div class="chat-header">
            {{mensaje.user}}
            <time class="text-xs opacity-50">{{ mensaje.date }}</time>
          </div>
          <div :class="mensaje.user=== userStore.perfil.nombre?'chat-bubble-info': 'chat-bubble-'" class="chat-bubble ">{{ mensaje.message }}</div>
        </div>




        <div class="card-actions bg-white w-full flex gap-2 sticky bottom-0">
          <input v-model="feedbackMessage" class="bg-slate-50 input input-info grow" type="text" />
          <button class="btn btn-primary" @click="handleChat">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
