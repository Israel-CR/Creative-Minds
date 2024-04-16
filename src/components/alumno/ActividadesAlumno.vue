<script setup>
import classService from '@/store/ClassService';
import { onMounted } from 'vue';
const classStore= classService()

onMounted(()=>{
    classStore.getInformesAlumno()
})

</script>

<template>
    <div class="font-lato text-lg  ">
        <h1 class="font-lato my-3 font-bold  text-3xl">
            Actividades
        </h1>

        <div v-if="classStore.informes?.length===0" class="card bg-transparent  ring-1 ring-black p-2 flex flex-col justify-center items-center">
            <h1 class="card-title ">Aún no tienes Actividades Asignadas</h1>
            <div class="card-body">
                <i class="fas fa-list-alt text-8xl text-gray-500 text-center"></i>

                <p class="font-thin ">
                    Aquí se mostrarán las clases que asignó tu maestro
                </p>

            </div>
           
        </div>

        <div v-else>
            <div
              v-for="actividad in classStore.informes"
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
                <h2>
                 grupo: <b>{{ actividad.grupo.nombre }}</b> 
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
        

        
       
    </div>
</template>

<style scoped>
</style>