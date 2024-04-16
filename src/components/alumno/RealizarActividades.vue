<script setup>
import router from "@/router";
import classService from "@/store/ClassService";
import groupService from "@/store/GroupService";
import { computed, handleError, onMounted, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
const classStore = classService();
const groupStore= groupService()
const route = useRoute();
const idClase = route.params.idAct;
const infoClass = computed(() => classStore.clase);


const Actividad = computed(
  () => infoClass.value.Actividades[currentActivity.value]
);

const isStarted = ref(false);

const currentActivity = ref(0);
const selectRespuesta = ref("");

const isCorrect = ref(null);



const finalizado = computed(() => {
  if (currentActivity.value + 1 === infoClass.value.Actividades?.length  && isCorrect.value!==null) {
    return true;
  } else {
    return false;
  }
});

const completedActivity=ref(false)

const calificacion= computed(()=>{
  const porc= 100 / infoClass.value.Actividades?.length
  var calif= 0
  // Contar las respuestas correctas
  for (let respuesta of Respuestas.value) {
    if (respuesta.correcta) {
      calif += porc
    }
  }
  return calif
  
})



const Respuestas= ref([])

function verifyResponse() {
  if (selectRespuesta.value === "") {
    alert("Debes seleccionar una opción para continuar");
  } else {
    selectRespuesta.value === Actividad.value.correcta
      ? (isCorrect.value = true)
      : (isCorrect.value = false);

      const respuesta={
        pregunta: Actividad.value.pregunta,
        respuesta: selectRespuesta.value,
        correcta: isCorrect.value
      }

      Respuestas.value.push(respuesta)
  }
}

function nextActivity(){
  currentActivity.value++
  isCorrect.value = null
   selectRespuesta.value=''

}

function handleCompeletedActivity(){

  completedActivity.value= true
  const respuestas = Respuestas.value 
 
  classStore.SendActivity(idClase,respuestas,calificacion.value)
  

}

onMounted(async () => {
  await classStore.getAClass(idClase);
});
</script>

<template>
  <div
    class="font-lato text-lg min-h-screen flex justify-center items-center absolute z-50 right-0 top-0 w-screen bg-[#6EFFA0]"
  >
    <!-- Interfaz al iniciar una actividad -->
    <div class="text-center" v-if="!isStarted">
      <h1 class="text-7xl font-play font-extrabold">
        {{ infoClass.nombre }}
      </h1>
      <button
        @click="isStarted = true"
        class="btn btn-lg btn-primary my-6 px-10"
      >
        iniciar
      </button>
    </div>
    <!-- Pregunta actual -->
    <div v-else >
      <!-- Actividad en Proceso -->
    <div v-if="!completedActivity" class="h-full min-h-screen font-lato text-lg">
      <div
        class="bg-[#6EDFFF] sticky right-0 top-0 z-50 w-screen text-center px-10"
      >
        <h1 class="text-2xl font-bold">{{ infoClass.nombre }}</h1>
        <p>{{ infoClass.Actividades.length }} Actividades</p>
        <progress
          class="progress progress-primary w-full"
          :value="100/infoClass.Actividades.length * (currentActivity+1)"
          max="100"
        ></progress>
      </div>

      
      <div
        v-if="isCorrect === null"
        class="px-20 font-play py-10 text-gray-600 flex flex-col justify-between gap-3"
      >
        <h2 class="text-4xl font-bold text-center">{{ Actividad.pregunta }}</h2>
        <div>
          <div class="divider divider-neutral">
            <h1 v-if="Actividad.tipo === 'Opcion Multiple'">
              Selecciona una respuesta correcta
            </h1>
            <h1 v-if="Actividad.tipo === 'Veradero-Falso'">
              Elige verdadero o falso
            </h1>
          </div>

          <!-- pregunta tipo v-f -->
          <div v-if="Actividad.tipo === 'Veradero-Falso'">
            <button
              @click="selectRespuesta = 'Verdadero'"
              :class="
                selectRespuesta === 'Verdadero'
                  ? 'btn-lg btn-primary '
                  : 'btn-info'
              "
              class="my-2 btn w-full text-center"
            >
              <span class="text-2xl font-bold">Verdadero</span>
              <i
                v-if="selectRespuesta === 'Verdadero'"
                class="fa fa-check-circle text-2xl font-bold"
              ></i>
            </button>
            <button
              @click="selectRespuesta = 'Falso'"
              :class="
                selectRespuesta === 'Falso' ? 'btn-lg btn-primary' : 'btn-info'
              "
              class="btn w-full text-center"
            >
              <span class="text-2xl font-bold">Falso</span>
              <i
                v-if="selectRespuesta === 'Falso'"
                class="fa fa-check-circle text-2xl font-bold"
              ></i>
            </button>
          </div>
          <!-- pregunta tipo opcion multiple -->
          <div v-if="Actividad.tipo === 'Opcion Multiple'">
            <button
              v-for="respuesta in Actividad.respuestas"
              @click="selectRespuesta = respuesta"
              :class="
                selectRespuesta === respuesta
                  ? 'btn-lg btn-primary'
                  : 'btn-info'
              "
              class="my-2 btn w-full text-center"
            >
              <span class="text-2xl font-bold">{{ respuesta }}</span>
              <i
                v-if="selectRespuesta === respuesta"
                class="fa fa-check-circle text-2xl font-bold"
              ></i>
            </button>
          </div>

          {{ isCorrect }}
        </div>
      </div>
      <!-- interfaz despues de responder -->
      <div
        v-else
        :class="isCorrect ? 'bg-primary' : 'bg-error'"
        class="h-full min-h-screen absolute top-0 z-10 flex flex-col items-center justify-center w-full font-lato text-lg text-white px-20 self-center"
      >
        <i v-if="isCorrect" class="fas fa-thumbs-up text-7xl"></i>
        <i v-else class="fa fa-thumbs-down text-7xl"></i>
        <h1 class="font-bold text-4xl">
          {{ isCorrect ? "!ES CORRECTO¡" : "!ES INCORRECTO¡" }}
        </h1>
        <p class="font-bold my-4">{{ Actividad.retroalimentacion }}</p>
      </div>
   

      <!-- barra de botones -->
      <div
        class="fixed z-50 bg-[#6EDFFF] bottom-0 flex justify-center shadow-lg w-full right-0 left-0 p-3 px-10"
      >
        <button
          v-if="isCorrect === null"
          @click="verifyResponse"
          :class="selectRespuesta === '' && 'btn-disabled'"
          class="btn btn-primary"
        >
          Contestar
        </button>
        <button
          v-else-if="currentActivity <= infoClass.Actividades.length && !finalizado"
          @click="nextActivity"
          class="btn btn-accent"
        >
          Siguiente
        </button>

        <button v-if="finalizado" class="btn btn-primary" @click="handleCompeletedActivity">Finalizar</button>
      </div>

    </div>
      <!-- Interfaz al terminar la actividad -->
      <div class="h-screen font-changa w-screen text-gray-200 flex flex-col gap-5 justify-center items-center bg-success " v-if="completedActivity">
        <i class="fas fa-trophy text-7xl "></i>
        <h1 class="text-4xl font-bold">muy bien</h1>
        <p class="font-thin">!Has completado esta actividad!</p>
       
        <p>Obtuviste {{ calificacion }}% de respuestas correctas</p>

        <button @click="router.back()" class="btn btn-lg btn-primary">Volver
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
