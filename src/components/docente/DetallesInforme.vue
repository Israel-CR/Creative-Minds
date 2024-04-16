<script setup>
import { useRoute } from 'vue-router';
import { computed, onMounted } from 'vue';
import classService from '@/store/ClassService';

const classStore= classService()


const route = useRoute();
const idInforme = route.params.idInforme;

onMounted(() => {
    classStore.getAnInforme(idInforme)
})


const informeAlumno=computed(()=>{
    const Informe= classStore.informe?.resultados
    let alumnos=[]
    
   for(let i=0 ; i< Informe?.length ;i++){
    let informeAlumno={}
    const alumno= classStore.informe?.alumnos.filter(alumno => alumno._id === Informe[i].alumno);
    informeAlumno.alumno=alumno[0]
    informeAlumno.correctas= Informe[i].resultados.filter(resultado => resultado.correcta=== true).length
    informeAlumno.incorrectas= Informe[i].resultados.filter(resultado => resultado.correcta=== false).length
    informeAlumno.calificacion= Informe[i].calificacion
    alumnos.push(informeAlumno)
   }

    return alumnos
})

</script>

<template>
   

    <div class="card bg-base-300 shadow-md shadow-blue-300 text-lg font-lato">
    <div class="card-body">
      <h1 class="text-4xl font-bold">{{ classStore.informe.clase?.nombre }}</h1>
      <h2>{{ classStore.informe.clase?.area }}</h2>
      <h2>Docente: <b>{{ classStore.informe.profesor?.nombre }}</b></h2>
      <time datetime="">{{new Date(classStore.informe.fechaAsignacion).toLocaleString()  }}</time>
      <div>
       
        <div class="badge badge-info p-4 m-2">
          alumnos: {{ classStore.informe.alumnos?.length }}
        </div>
        <div class="badge badge-primary p-4">
          preguntas: {{classStore.informe.clase?.Actividades?.length }}
        </div>
      </div>
    </div>
  </div>

  <div
  v-if="informeAlumno?.length>0"
  

    v-for="alumno in informeAlumno"
    class="card flex justify-between bg-base-100 shadow mt-4 w-full"
  >
    <div class="flex w-full justify-between">
      <div class="w-1/4 p-2">
        <div class="stat-title">Nombre del alumno</div>
        <div class="stat-value text-xl text-black text-wrap">
          {{ alumno.alumno?.nombre }}
        </div>
      </div>

      <div class="w-1/4 p-2">
        <div class="stat-title">Respuestas incorrectas</div>
        <div class="stat-value text-error">{{ alumno.incorrectas }}<i class="fas fa-times text-4xl self-right"></i>
        </div>
      </div>

      <div class="w-1/4 p-2">
        <div class="stat-title">Respuestas correctas</div>
        <div class="stat-value text-success">
            {{ alumno.correctas }} <i class="fas fa-check text-4xl"></i>
        </div>
      </div>

      <div class="w-1/4 stat p-2">
        <div class="stat-title">Calificación</div>
        <div class="stat-value">{{ alumno.calificacion }}%</div>
      </div>
    </div>
  </div>
  <div v-else  class="card flex justify-between bg-base-100 shadow mt-4 w-full">
    <div class="card-body font-thin">
      tus alumnos aun no realizan la Actividad
    </div>
    
  </div>
</template>

<style scoped>
</style>