<script setup>
import authService from "@/store/AuthService";
import groupService from "@/store/GroupService";
import userService from "@/store/UserService";

import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const grupoStore = groupService();
const userStore = userService();

const route = useRoute();
const idGroup = route.params.idGrupo;

const tabSelected = ref(1);
const changeTabSlected = (value) => {
  tabSelected.value = value;
};

onMounted(() => {
  grupoStore.getGroup(idGroup);
  grupoStore.getFeedbackMessages(idGroup);
});

const retroChat = computed(() => grupoStore.feedbackMessages);
const feedbackMessage = ref("");
// funcion para los chats de retroalimentacion
function handleChat(e) {
  e.preventDefault();
  const mensaje = {
    message: feedbackMessage.value,
    date: new Date().toLocaleString(),
  };
  feedbackMessage.value = "";

  grupoStore.giveFeedback(mensaje, idGroup);
  setTimeout(() => {
    grupoStore.getFeedbackMessages(idGroup);
  }, 1000);

  window.scrollTo(0, document.body.scrollHeight);
}

const chatContainer = ref(null);

if (tabSelected === 3) {
  window.scrollTo(0, document.body.scrollHeight);
}

const currentClass = ref('');
const idCurrentClass = ref('');

function handleDelete(idGroup, nombre) {
  idCurrentClass.value = idGroup;
  currentClass.value = nombre;
  
  eliminar_clase.showModal();
}
const toastalert=ref(false)

function deleteClassofGroup(){

  grupoStore.deleteClassGroup(idGroup, idCurrentClass.value)
  .then(()=>{
    grupoStore.getGroup(idGroup);
  })
  
  toastalert.value=true

  setTimeout(()=>{
    toastalert.value=false
  },3000)

}
</script>

<template>

<div v-if="toastalert"  class="toast toast-bottom z-10 toast-end">
      <div class="alert alert-warning">
        <span>Has eliminado la actividad {{ currentClass }} de este grupo.</span>
      </div>
    </div>

  <div
    class="sticky -top-10 z-30 card card-compact bg-base-100 font-lato -translate-y-2"
  >
    <div class="card-body text-center">
      <div class="bg-white">
        <h1 class="font-bold text-4xl">{{ grupoStore.grupo.nombre }}</h1>
        <p class="text-lg font">
          Codigo de grupo:
          <b class="text-xl font-bold">{{ grupoStore.grupo.codigo }}</b>
        </p>
      </div>
      <div class="divider"></div>
      <ul
        class="sticky top-0 menu menu-horizontal w-full flex gap-3 bg-base-200 rounded-full"
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
  <div v-if="tabSelected === 1" class="my-3">

    <div class="rounded-lg p-4 bg-base-200">
      <h1 class="font-lato mb-2 font-bold text-center text-3xl">Actividades</h1>

      <div
        v-if="grupoStore.grupo.clases?.length > 0"
        class="flex gap-2 flex-col"
      >
        <div
          v-for="actividad in grupoStore.grupo.clases"
          :key="actividad?.clase._id"
          class="card bg-base-100 shadow-lg flex flex-row justify-beetwen gap-2"
        >
          <figure class="h-auto w-1/5 skeleton bg-slate-400"></figure>

          <div class="card-body grow p-2">
            <h1 className="card-title text-3xl font-bold text-clip ">
              {{ actividad.clase.nombre }}
            </h1>
            <div class="flex gap-5">
              <h2>
              {{ actividad.clase.area }}
            </h2>
            <p>
              <i class="fas fa-tasks"></i>
              {{ actividad.clase.Actividades?.length }} Ejercicios
            </p>
            </div>

            <div>
              <div class="card-actions flex  justify-end">
                <button @click="handleDelete(actividad?._id, actividad.clase.nombre)" class="btn btn-error">Eliminar Clase</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      <div v-else class="card-body text-center text-lg">
        <h1 class="font-bold text-2xl text-center">Asignar una clase</h1>
        <p>Este grupo aun no tiene actividades asignadas</p>
        <p class="font-thin">Elige una clase y asígnala a esta grupo</p>
        <div class="card-actions flex justify-center">
          <RouterLink class="btn btn-info" to="/docente/clases">Explorar Clases</RouterLink>
        
        </div>
      </div>
    </div>
  </div>
  <div v-if="tabSelected === 2" class="my-3 font-lato">
    <div
      v-if="grupoStore.grupo.alumnos.length > 0"
      class="p-4 rounded-lg bg-base-200 my-2"
    >
      <h1 class="font-lato mb-3 font-bold text-3xl">Alumnos</h1>
      <div
        v-for="alumno in grupoStore.grupo.alumnos"
        :key="alumno._id"
        class="my-2 card bg-white shadow-lg w-full p-2"
      >
        <div class="flex space-x-4 items-center">
          <div class="avatar">
            <div class="w-10 rounded-full ring-2 bg-black">
              <i class="fa fa-user text-2xl text-white p-2.5"></i>
            </div>
          </div>
          <div>
            <h1 class="font-bold">{{ alumno.nombre }}</h1>
            <h2>{{ alumno.correo }}</h2>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="card bg-base-200">
      <div class="card-body flex justify-center items-center text-lg">
        <h1 class="font-bold text-2xl text-center">Agregar alumnos</h1>
        <p>Este grupo aun no tiene alumnos</p>
        <p class="font-thin">
          Comparte el siguiente codigo para que los estudiantes puedan unirse al
          grupo.
        </p>
        <div class="border border-black w-auto p-4 rounded-lg">
          <h1 class="text-5xl font-bold">{{ grupoStore.grupo.codigo }}</h1>
        </div>
      </div>
    </div>
  </div>
  <div v-if="tabSelected === 3" class="mt-3 translate-y-2" ref="chatContainer">
    <div class="card bg-base-100">
      <div class="card-body">
        <div
          class="chat"
          :class="
            mensaje.user?._id === userStore.perfil.id
              ? 'chat-end'
              : 'chat-start'
          "
          v-for="mensaje in retroChat"
          @key="mensaje._id"
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
            {{ mensaje.user?.nombre }}
            <time class="text-xs opacity-50">{{ mensaje.date }}</time>
          </div>
          <div
            :class="
              mensaje.user?._id === userStore.perfil.id
                ? 'chat-bubble-info'
                : 'chat-bubble-'
            "
            class="chat-bubble"
          >
            {{ mensaje.message }}
          </div>
        </div>

        <div class="card-actions bg-white w-full flex gap-2 sticky bottom-0">
          <input
            v-model="feedbackMessage"
            class="bg-slate-50 input input-info grow"
            type="text"
            placeholder="Ecribe una indicacion para tus alumnos"
            required
          />
          <button class="btn btn-primary" @click="handleChat">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  </div>


  <!-- modal para eliminar una clase del grupo -->
  <dialog id="eliminar_clase" class="modal">
    <div class="modal-box flex items-center flex-col">
      <i class="fa fa-exclamation-triangle text-error text-6xl p-2"></i>

      <h2 class="font-bold text-lg p-4 text-center text-error">
        ¿Estas seguro de eliminar la actividad <b>{{ currentClass }} </b>de este grupo?
      </h2>

      <div class="modal-action w-full">
        <form class="w-full" method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <div class="flex justify-end gap-2">
            <button class="btn">Cancelar</button>
            <button @click="deleteClassofGroup()" class="btn btn-error">
              Eliminar
            </button>
          </div>
        </form>
      </div>
    </div>
  </dialog>
</template>

<style scoped></style>
