<script setup>
import classService from "@/store/ClassService";
import groupService from "@/store/GroupService";
import {onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

const classStore = classService();
const groupStore =groupService()

onMounted(async () => {
  await classStore.getClasses();
});

const idCurrentClass= ref(null)
const currentClass= ref('')
 const toastalert = ref(false);
const deleteClass=async()=>{
  await classStore.deleteClass(idCurrentClass.value)
  .then(async() => {
        toastalert.value= true
        await classStore.getClasses();
        setTimeout(() => {
          toastalert.value= false
         
        }, 3000);
  })

}
const selectedGroup= ref(null)
const handleAsignClass=(idClass, nombre)=>{
  currentClass.value= nombre
  idCurrentClass.value= idClass
  asignar_actividad.showModal()
}

const loading=ref(false)
const AsignarClase=  async () =>{

  await classStore.AsignClassGroup(selectedGroup.value, idCurrentClass.value)
      .then(() => {
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
        }, 3000);
      })
}

const handleDelete=(idClass, nombre)=>{
  currentClass.value= nombre
  idCurrentClass.value= idClass
  eliminar_clase.showModal()
}

</script>

<template>
  <div className="text-lg ">
    <div class="flex justify-between py-3">
      <h1 className="text-4xl font-changa font-semibold">Mis Clases</h1>
      <RouterLink
        v-if="classStore.clases.length > 0"
        class="btn btn-outline btn-primary"
        to="/docente/clases/crear"
      >
        Crear Clase
      </RouterLink>
    </div>
    <div v-if="toastalert" class="  toast toast-bottom z-10 toast-end">
            <div class="alert alert-warning">
              <span>Has eliminado la clase {{ currentClass }}.</span>
            </div>
          </div>

    <div
      v-if="classStore.clases.length === 0"
      class="p-5 rounded border border-black text-center"
    >
      <h1 className="text-2xl font-semibold ">Crea tu primera clase</h1>
      <p class="my-3">aqui se mostraran tus clases</p>
      <RouterLink
        class="btn btn-outline btn-primary"
        to="/docente/clases/crear"
      >
        Crear Clase
      </RouterLink>
    </div>


    <div
      v-else
      v-for="clase in classStore.clases"
      key="clase._id"
      className="card bg-base-300 shadow-lg  border flex md:flex-row flex-col items-center  gap-2 my-2 p-2"
    >
      <figure class="h-64  w-64 skeleton bg-slate-400">
        
      </figure>
      <div className="card-body flex-grow p-1">
        <h1 className="card-title text-3xl font-bold text-clip ">
          {{ clase.nombre }}
        </h1>
        <h1 className="text-xl">{{ clase.area }}</h1>
        <div class="divider m-0"></div>
        <div className="flex flex-col md:flex-row justify-between p-1 ">
          <p>Creado por: <b>{{ clase?.profesor.nombre }}</b>
            </p>
          <p><i class="fa fa-list"></i>    {{ clase?.Actividades.length }} Actividades </p>
        </div>
        <div class="divider m-0"></div>
        <div className="flex justify-between">
        </div>
        <div class="card-actions flex justify-end">
          <RouterLink
            :to="{ name: 'clase', params: { idClase: clase._id } }"
            class="btn btn-accent"
          >
            ver clase
          </RouterLink>

          <div class="dropdown dropdown-top dropdown-end ">
            <div tabindex="0" role="button" class="btn  btn-info">Opciones </div>
            <ul
              
              class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 flex gap-2"
            >
              <li><button @click="handleAsignClass(clase._id, clase.nombre)" class="btn btn-ghost"> Asignar a un grupo</button></li>
              <li  ><button @click="handleDelete(clase._id, clase.nombre)" class="btn btn-sm btn-error">Eliminar clase</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <dialog id="eliminar_clase" class="modal">
  <div class="modal-box flex items-center flex-col">
       <i class="fa fa-exclamation-triangle text-error  text-6xl p-2  "></i>
   
    <h2 class="font-bold text-lg p-4 text-center text-error">¿Estas seguro de eliminar la clase <b>{{currentClass}}</b>?</h2>

    
    
    <div class="modal-action">

      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Cancelar</button>
        <button @click="deleteClass()" class="btn btn-error">
        Eliminar
      </button>
      </form>
      
    </div>
  </div>
</dialog>


<dialog id="asignar_actividad" class="modal">
  <div class="modal-box flex items-center flex-col">
      
   
    <h2 class="font-bold text-2xl p-4 text-center">Asignar <b>{{currentClass}}</b> a un grupo</h2>
{{ selectedGroup }}
    <label class="label font-lato text-pretty text-left font-bold text-lg "for="">Elige un  Grupo</label>
    <select v-model="selectedGroup" class="select select-bordered select-accent w-full ">
      <option disabled value="">Selecciona una opción</option>
      <option class="p-2 text-xl hover:bg-blue-200" v-for="grupo in groupStore.grupos"  :value="grupo?._id">{{ grupo.nombre }}</option>
      </select>
      
      <div v-if="loading" class="flex justify-center pt-4">
            <span
              class="loading loading-spinner text-info loading-lg"
            >
            </span>
          </div>
    <div v-else class="modal-action w-full flex justify-end gap-2">

      <form method="dialog" class="">

        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Cancelar</button>
       
      </form>
       <button :class="!selectedGroup ?'btn-disabled':''" @click="AsignarClase" class="btn btn-primary"  >
        Asignar
      </button>
    </div>
  </div>
</dialog>
</template>

