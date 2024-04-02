<script setup>
import groupService from "@/store/GroupService";
import userService from "@/store/UserService";
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
const groupStore = groupService();
const userStore= userService()

onMounted(async () => {
  await groupStore.getGroups();
});

function handleDelete(){
  alert('hola mundo')
}
</script>

<template>
  <div class="text-lg font-lato">
    <div className=" rounded-2xl  py-3">
      <div className=" flex flex-wrap">
        <div class="w-full">
          <div class="flex justify-between items-center py-3">
            <h1 className="text-4xl font-play ">Mis grupos</h1>
            <button
              v-if="groupStore.grupos.length !== 0"
              class="btn btn-info hover:bg-sky-400 shadow-blue-300 shadow-inner mt-4"
            >
              crear nuevo grupo
            </button>
          </div>
        </div>

        <div
          v-if="groupStore.grupos.length === 0"
          className=" flex  gap-2 border border-black rounded-xl "
        >
          <div class="w-1/3 bg-slate-600 animate-pulse"></div>
          <div className="   p-5">
            <h1 className="text-xl font-bold ">
              ¡Crea grupos, añade alumnos, y asigna tareas!
            </h1>
            <p className="pt-3">
              Crea tus grupos, agrega a tus alumnos en cada uno o comparte el
              codigo de clase para comenzar a publicar y asignar tareas, dar
              retroalimentacion
            </p>

            <button
              class="btn btn-info hover:bg-sky-400 shadow-blue-300 shadow-inner mt-4"
            >
              crear nuevo grupo
            </button>
          </div>
        </div>
        <div v-else v-for="grupo in groupStore.grupos" class="p-1 w-1/3">
          <div
            className="card card-compact bg-base-100 shadow-xl hover:-translate-y-1 "
          >
            <figure class="bg-red-200 p-4">
              <a className="fa fa-users text-6xl text-sky-900"></a>
            </figure>
            

            <div className="card-body relative">
             

          <div class="dropdown  dropdown-start ">
          <div tabindex="0" role="button" className="btn btn-circle btn-sm btn-secondary absolute top-0 end-1 -translate-y-7">
            <i class="fas 
            fa-ellipsis-h rotate-90 text-xl"></i></div>
            <ul
              
              class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 flex gap-2"
            >
              <li  ><button @click="handleDelete(grupo._id, grupo.nombre)" class="btn btn-sm btn-error">Eliminar grupo</button></li>
            </ul>
          </div>
             
              <h1 className="card-title">{{ grupo.nombre }}</h1>
              <p>creado por: {{ grupo.profesor.nombre }}</p>

              <p className="text-sm">creado: {{userStore.formatFecha(grupo.createdAt)}}</p>
              <p className=" text-left text-lg">
                codigo de grupo: </p>
                <p class=" text-xl font-extrabold">{{ grupo.codigo }}</p> 
              <div class="card-actions justify-end">
                <RouterLink
                  :key="grupo.nombre"
                  class="btn btn-ghost bg-blue-300 rounded-full "
                  :to="{ name: 'grupo', params: { idGrupo: grupo._id } }"
                >
                Ver Grupo
                </RouterLink>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p className="text-2xl text-center">crear nuevo grupo</p>

    <form className="">
      <label htmlFor="">Nombre</label>
      <input
        className="w-full rounded-md px-5 py-2 border border-sky-300"
        type="text"
        placeholder="nombre del grupo"
      />
      <label htmlFor="">Codigo del grupo</label>
      <input
        className="w-full rounded-md px-5 py-2 border border-sky-300"
        type="text"
        placeholder="codigo"
      />

      <button className="bg-blue-500 py-2 px-5 rounded-lg mt-5">crear</button>
    </form>
  </div>
</template>

<style scoped></style>
