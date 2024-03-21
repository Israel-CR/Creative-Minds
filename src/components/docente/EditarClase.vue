<script setup>
import classService from "@/store/ClassService";
import { computed, onMounted, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import AddActivityForm from "./forms/AddActivityForm.vue";
const classStore = classService();
const route = useRoute();
const idClase = route.params.idClase;
const infoClass = computed(() => classStore.clase);

//  se obtiene la informacion de la clase
onMounted(async () => {
  await classStore.getAClass(idClase);
});
</script>

<template>
  <div
    className=" bg-cyan-400 mt-2 rounded-xl py-3 px-5 font-lato text-lg border border-black relative"
  >
    <h1 className="text-3xl font-bold text-center">{{ infoClass?.nombre }}</h1>
    <h2 className=" font-bold text-center text-pretty text-xl">
      {{ infoClass?.area }}
    </h2>

    <div className="flex justify-around border-b border-black">
      <div>
        <i className=" fa fa-users "></i>
        <p className="inline m-2">{{ infoClass?.alumnos?.length }} alumnos</p>
      </div>
      <div>
        <i className="fa fa-check font-bold text-xl"></i>
        <p className="inline m-2">{{ infoClass?.finalizado }} finalizado</p>
      </div>
      <div>
        <i className="fa fa-heart"></i>
        <p className="inline m-2">{{ infoClass?.Valoracion }} valoracion</p>
      </div>
    </div>

    <div className="flex justify-end items-center p-2">
      <div class="flex gap-2">
        <RouterLink className="btn  btn-info" to="">
          editar detalles de la clase
        </RouterLink>
        <RouterLink
          className="btn btn-secondary"
          :to="{ name: 'editarClase', params: { idClase: idClase } }"
        >
          Editar Clase
        </RouterLink>
      </div>
    </div>
  </div>

  <!-- formulario para agregar actividad -->
  <div
    className="bg-sky-200 mt-2 rounded-xl px-10 py-5 font-lato border border-black text-lg "
  >
  <div class="flex justify-between">
    <h1 className="  text-2xl font-bold">Actividades</h1>
    <button class="btn glass btn-info" onclick="addActivity.showModal()">
      Agregar Actividad
    </button>
  </div>
   
    <div
      v-for="actividad in infoClass?.Actividades"
      class="my-2 card bg-base-100 shadow-md"
    >
      <div class="card-body" :key="actividad">
        <div class="flex justify-between items-center">
          <h1 class="card-title font-salsa text-xl">pregunta</h1>
          <label class="btn  btn-circle swap swap-rotate btn-info self-start"> 
            <input type="checkbox">
            <i class="swap-off fas 
            fa-ellipsis-h rotate-90 text-3xl"></i>
            <i class="swap-on fas fa-ellipsis-h rotate-45 text-3xl"></i>
          </label>
          
        </div>
        <p>{{ actividad.pregunta }}</p>

        
        <div v-if="actividad.respuestas.length>0">
           <h1 class="card-title font-salsa text-xl">Opciones de respuesta</h1>
           <div v-for="respuesta in actividad.respuestas"  class="m-2 card w-auto">
          <div class="alert alert-info">
            <span>{{respuesta}}</span>
          </div>
        </div>
        </div>
       
        
       
        <h1 class="card-title font-salsa text-xl">Respuesta Correcta</h1>
        <div class="alert alert-success">
            <span>{{ actividad.correcta }}</span>
          </div>
        
        <h1 class="card-title font-salsa text-xl">Retroalimentacion</h1>
        {{ actividad.retroalimentacion }}
      </div>
    </div>
  
    <p v-if="infoClass.Actividades=== 0">Esta clase aun no tiene actividades</p>
    <button class="btn btn-success" onclick="addActivity.showModal()">
      Agregar Actividad
    </button>
  </div>

  <div
    className="bg-gray-200 mt-2 rounded-xl px-10 py-5 font-lato border border-black text-lg "
  >
    <h1 className=" text-2xl font-bold">Agregar Actividad</h1>
    <div v-if="currentStep === 1">
      <div className="py-2">
        <label className="font-bold text-lg">Pregunta</label>
        <div class="input rounded-full flex items-center gap-2">
          <i class="fa fa-question text-2xl rounded-full"></i>
          <input
            class="grow"
            v-model="infoActivity.pregunta"
            type="text"
            placeholder="ejemplo:Juan"
          />
        </div>
      </div>

      <div className="py-2">
        <label className="font-bold text-lg">tipo de pregunta</label>
        <div class="flex flex-wrap gap-3">
          <button
            v-for="tipo in tipoPregunta"
            @click="selectTipo(tipo)"
            class="btn bg-blue-300 rounded-xl"
          >
            {{ tipo }}
            <i
              v-if="infoActivity.tipo === tipo"
              class="fa fa-check text-md"
            ></i>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Formulario para agregar una nueva actividad -->
  <dialog id="addActivity" class="modal">
    <AddActivityForm />
  </dialog>
</template>

<style scoped></style>
