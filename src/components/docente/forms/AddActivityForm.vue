<script setup>

import router from "@/router";
import classService from "@/store/ClassService";
import { computed, onMounted, ref } from "vue";
import {  useRoute } from "vue-router";

const classStore = classService();
const route = useRoute();
const idClase = route.params.idClase;

const tipoPregunta = ref(["Opcion Multiple", "Veradero-Falso"]);

const infoActivity = ref({
  pregunta: "",
  tipo: "",
  respuestas: [],
  correcta:'',
  retroalimentacion:''
});
const opcRespuesta = ref("");


const selectTipo = (tipo) => {
  infoActivity.value.tipo = tipo;
};
const addResp = (e) => {
  if (opcRespuesta.value!=='') {infoActivity.value.respuestas.push(opcRespuesta.value);}
  opcRespuesta.value = "";
};
const removeResp = (opc) => {
  infoActivity.value.respuestas = infoActivity.value.respuestas.filter(
    (item) => item !== opc
  );
};

const currentStep = ref(1);

const nextStep = () => {
  currentStep.value++;
};
const afterStep = () => {
  currentStep.value--;
};
const AddActivity= async ()=>{
  await classStore.AddActivity(idClase, infoActivity.value)
  .then(()=>{
    router.back()})
   .catch((error)=>alert(error));
}
</script>

<template>
    <div class="modal-box bg-base-200">
      <h1 className=" text-2xl text-center font-bold">Agregar Actividad</h1>
      <!-- pasos dentro del formulario -->
      <ul class="steps w-full">
        <li class="step step-primary">Pregunta</li>
        <li :class="`step ${currentStep >= 2 ? 'step-primary' : ''}`">
          Respuesta
        </li>
        <li :class="`step ${currentStep === 3 ? 'step-primary' : ''}`">Retroalimentacion</li>
      </ul>
      <!-- primera parte del formulario -->
      <form  v-if="currentStep === 1">
        <div className="py-2 ">
          <label className="label font-bold text-lg">Pregunta</label>
          <div class="input input-success rounded-full flex items-center gap-2">
            <i class="fa fa-question text-2xl rounded-full"></i>
            <input
              class="grow form-control"
              v-model="infoActivity.pregunta"
              id="pregunta"
              type="text"
              placeholder="ejemplo:¿Cuanto es 4 x 4?"
              required
            />
          </div>
         
        </div>
        <div className="py-2">
          <label className="label font-bold text-lg">tipo de pregunta</label>
          <div class="flex flex-wrap gap-3">
            <button
            type="button"
              v-for="tipo in tipoPregunta"
              @click="selectTipo(tipo)"
              :class="`btn ${
                infoActivity.tipo === tipo ? 'bg-success' : 'bg-blue-300'
              }`"
            >
              {{ tipo }}
              <i
                v-if="infoActivity.tipo === tipo"
                class="fa fa-check text-md"
              ></i>
            </button>
          </div>
        </div>
      </form>
      <!-- segunda parte del formulario -->
      <div v-if="currentStep === 2">
        <div v-if="infoActivity.tipo==='Opcion Multiple'" className="py-2 ">
          <label className="label font-bold text-lg"
            >Opciones de respuesta</label
          >
          <div class="flex gap-3 flex-wrap">
            <div
              class="btn bg-green-300 rounded"
              v-for="opcion in infoActivity.respuestas"
            >
              {{ opcion }}
              <div class="tooltip" data-tip="eliminar">
                <button @click="removeResp(opcion)" class="">
                  <i class="fa fa-close"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="infoActivity.tipo==='Opcion Multiple'" className="py-2 ">
          <label className="label font-bold text-lg">Agregar Opcion</label>
          <div class="input input-success rounded-full flex items-center gap-2">
            <i class="fa fa-answer text-2xl rounded-full"></i>
            <input
              class="grow"
              v-model="opcRespuesta"
              type="text"
              placeholder="ejemplo:Juan"
            />
            <button @click="addResp">
              <i class="fa fa-add text-2xl rounded-full"></i>
            </button>
          </div>
        </div>
        <div className="py-2 ">
          <label className="label font-bold text-lg">Respuesta correcta</label>
          <select class="select select-bordered w-full max-w-xs" v-model="infoActivity.correcta">
            <option disabled selected>Who shot first?</option>
            <option v-if="infoActivity.tipo==='Opcion Multiple'" v-for="opcion in infoActivity.respuestas" :value="opcion">{{ opcion }}</option>
              <option v-else  v-for="opcion in ['Veradero', 'Falso']" :value="opcion">{{ opcion }}</option>
              
            
          </select>
        </div>
      </div>
      <!-- Tercera parte del formulario -->
      <div v-if="currentStep === 3">
        <div className="py-2 ">
          <label className="label font-bold text-lg">Agregar retroalimentacion</label>
          <textarea v-model="infoActivity.retroalimentacion" class="textarea textarea-bordered  w-full "></textarea>

        </div>
      </div>

      <div class="modal-action">
         <button v-if="currentStep>1"@click="afterStep" class="btn btn-info">
            regresar
          </button>
        <form v-else method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button  class="btn btn-error">
            Cancelar
          </button>
        </form>
        
        <button type="submit" v-if="currentStep<=2"  @click="nextStep" class="btn btn-primary"
        
        >Continuar</button>
        <button v-else @click="AddActivity"   class="btn btn-success">Agregar Actividad</button>
      </div>
    </div>
</template>

<style scoped>
</style>