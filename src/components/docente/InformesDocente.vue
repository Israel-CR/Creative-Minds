<script setup>
import classService from "@/store/ClassService";
import { onMounted, ref } from "vue";

const classStore = classService();


// const filterInAnswers=(answers)=>{
//   const countAnswer=ref(0)

//   for(let i,  in answers){
//      if (answers.pregunta[i]=== actividad.value.respuestas_correctas.pregunta[i]){
//        countAnswer.value++
//      }
//      }
//    return countAnswer.value

// }

onMounted(() => {
  classStore.getInformes();
});
</script>

<template>
  <h1 class="text-4xl font-changa font-semibold" >Informes</h1>


  <div class="font-thin py-5" v-if="classStore.informes.length<=0">
    aun no tienes clases  registradas para obtener  informes
  </div>

  <div
    v-for="informe in classStore.informes"
    :key="informe._id"
    class="my-2 p-4 card bg-base-300 shadow-lg"
  >
    
    <div class="divider"><h1 class="text-2xl font-bold">{{ informe.clase?.nombre }}</h1></div>
    <h1 class="font-bold text-center">{{ informe.clase?.area }}</h1>
    
    <div class="card-body p-1 flex md:flex-row flex-col justify-between">
      <div>
        <p>
          Docente: <b>{{ informe.profesor?.nombre }}</b>
        </p>
        <p>
          grupo Asignado: <b>{{ informe.grupo?.nombre }}</b>
        </p>
      </div>
      <div>
        <p><i class="fa fa-users"></i> {{ informe.alumnos?.length }} Alumnos</p>
        <p>
          <i class="fa fa-check font-bold"> </i> {{ informe.resultados?.length }} han
          Finalizado
        </p>
      </div>
       <div class="card-actions">
        <RouterLink class="btn btn-info" :to="{name:'informeDetalle',params:{idInforme: informe?._id}}" >Ver Detalles</RouterLink>
    </div>
    </div>
   
  </div>

 
</template>

<style scoped></style>
