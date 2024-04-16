<script setup>
import classService from "@/store/ClassService";
import groupService from "@/store/GroupService";
import userService from "@/store/UserService";

import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const grupoStore = groupService();
const userStore = userService();

const route = useRoute();
const idGroup = route.params.idGrupo;

const classStore = classService()

const tabSelected = ref(1);
const changeTabSlected = (value) => {
  tabSelected.value = value;
};

onMounted(() => {
  grupoStore.getGroup(idGroup);
  grupoStore.getFeedbackMessages(idGroup);
});

const Actividades = computed(() => grupoStore.grupo.clases);

const retroChat = computed(() => grupoStore.feedbackMessages);
const feedbackMessage = ref("");
// funcion para los chats de retroalimentacion
function handleChat(e) {
  e.preventDefault();
  const mensaje = {
    message: feedbackMessage.value,
    date: new Date().toLocaleString(),
  };

  grupoStore.giveFeedback(mensaje, idGroup);

  setTimeout(() => {
    grupoStore.getFeedbackMessages(idGroup);
  }, 2000);

  feedbackMessage.value = "";
  window.scrollTo(0, document.body.scrollHeight);
}
</script>

<template>
  <div class="flex gap-3 flex-col md:flex-row space-x-2">
    <div class="w-full md:w-1/4 h-full card card-compact bg-base-100 font-lato">
      <div class="card-body text-center sticky top-0">
        <div class="bg-white text-lg text-start">
          <h1 class="font-bold text-4xl text-center text-wrap">
            {{ grupoStore.grupo.nombre }}
          </h1>
          <p class="text-lg font">
            Codigo de grupo:
            <b class="text-xl font-bold">{{ grupoStore.grupo.codigo }}</b>
          </p>
          <p class="">
            <b>Maestro:</b> {{ grupoStore.grupo.profesor?.nombre }}
          </p>
          <p><b>Alumnos:</b> {{ grupoStore.grupo.alumnos?.length }}</p>
        </div>
        <div class="divider"></div>
        <ul
          class="menu md:menu menu-horizontal w-full flex gap-3 bg-base-200 rounded-md"
        >
          <button
            @click="changeTabSlected(1)"
            class="grow rounded-md p-1 is-active"
            :class="{ 'bg-primary text-white': tabSelected === 1 }"
          >
            Actividades
          </button>
          <button
            @click="changeTabSlected(2)"
            class="grow rounded-md"
            :class="{ 'bg-primary text-white': tabSelected === 2 }"
          >
            Alumnos
          </button>
          <button
            @click="changeTabSlected(3)"
            class="grow rounded-md"
            :class="{ 'bg-primary text-white': tabSelected === 3 }"
          >
            Novedades
          </button>
        </ul>
      </div>
    </div>
    <div class="grow">
      <div v-if="tabSelected === 1" class="w-full">
         <div class="rounded-lg p-4 bg-base-200">
          <h1 class="font-lato mb-2 font-bold text-center text-3xl">
            Actividades
          </h1>

          <div
            v-if="Actividades?.length > 0"
            class="flex gap-2 flex-col"
          >
            <div
              v-for="actividad in Actividades"
              :key="actividad?.clase._id"
              class="card bg-base-100 shadow-lg flex flex-row justify-beetwen gap-2"
            >
              <figure class="h-auto w-1/5 skeleton bg-slate-400"></figure>

              <div class="card-body grow">
                <h1 className="card-title text-3xl font-bold text-clip ">
                  {{ actividad.clase.nombre }}
                </h1>
                <h2>
                  {{ actividad.clase.area }}
                </h2>

                <p>
                  <i class="fas fa-tasks"></i>
                  {{ actividad.clase.Actividades?.length }} Ejercicios
                </p>

                <div>
                  <div class="card-actions end">
                   
                    <RouterLink  @click="classStore.currentActivity = actividad._id"  class="btn btn-outline btn-primary rounded-badge" :to="{name:'realizarActividad',params:{ idAct: actividad.clase._id } }"> Realizar Actividad </RouterLink>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="card-body text-center">
            <p>Este grupo aun no tiene actividades asignadas</p>
            <p class="font-thin">
              Aquí se mostrarán las clases asignadas a este grupo
            </p>
            <i class="fas fa-list-alt text-8xl text-gray-500 text-center"></i>
          </div>
        </div>
      </div>
      <div v-if="tabSelected === 2" class="font-lato">
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
      </div>
      <div v-if="tabSelected === 3" class="">
        <div class="card bg-base-100">
          <div class="card-body">
            {{ feedbackMessage }}

            <div
              class="chat"
              :class="
                mensaje.user?._id === userStore.perfil.id
                  ? 'chat-end'
                  : 'chat-start'
              "
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
                {{ mensaje.user?.nombre }}
                <time class="text-xs opacity-50">{{ mensaje.date }}</time>
              </div>
              <div
                :class="
                  mensaje.user?._id === userStore.perfil.id
                    ? 'chat-bubble-info'
                    : 'chat-bubble'
                "
                class="chat-bubble"
              >
                {{ mensaje.message }}
              </div>
            </div>

            <div
              class="card-actions bg-white w-full flex gap-2 sticky bottom-0"
            >
              <input
                v-model="feedbackMessage"
                class="bg-slate-50 input input-info grow"
                type="text"
                placeholder="escribe tus dudas a tu profesor"
              />
              <button class="btn btn-primary" @click="handleChat">
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
