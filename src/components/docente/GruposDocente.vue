<script setup>
import CreateGroupForm from "./forms/CreateGroupForm.vue";
import EditGroupForm from "./forms/EditGroupForm.vue";
import groupService from "@/store/GroupService";
import userService from "@/store/UserService";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";


const groupStore = groupService();
const userStore = userService();

onMounted( () => {
   groupStore.getGroups();
});

const idCurrentGroup = ref('');
const currentGroup = ref('');

const toastalert = ref(false);
const deleteGroup = async () => {
  toastalert.value = true;
  await groupStore.deleteGroup(idCurrentGroup.value).then(async () => {
    toastalert.value = true;
    await groupStore.getGroups();
    setTimeout(() => {
      toastalert.value = false;
    }, 3000);
  });
};

function handleDelete(idGroup, nombre) {
  currentGroup.value = nombre;
  idCurrentGroup.value = idGroup;
  eliminar_grupo.showModal();
}

function handleEdit(idGroup, nombre , codigo) {

  groupStore.currentGroup={}
  groupStore.currentGroup={
    idGroup, nombre , codigo
  }
  
  editar_grupo.showModal();
}


</script>

<template>
  <div class="text-lg font-lato">
    <div v-if="toastalert" class="toast toast-bottom z-10 toast-end">
      <div class="alert alert-warning">
        <span>Has eliminado el grupo {{ currentGroup }}.</span>
      </div>
    </div>

    <div className=" rounded-2xl">
      <div className=" flex flex-wrap">
        <div class="w-full">
          <div class="flex justify-between items-center py-3">
            <h1 class="text-4xl font-changa font-semibold">Mis grupos</h1>

            <button
              v-if="groupStore.grupos.length !== 0"
              class="btn btn-primary btn-outline hover:shadow-lg"
              onclick="crear_grupo.showModal()"
            >
              crear nuevo grupo
            </button>
          </div>
        </div>

        <div
          v-if="groupStore.grupos.length === 0"
          className=" flex md:flex-row flex-col gap-2 border border-black rounded-2xl "
        >
          <div class="md:w-1/3 md:h-auto h-40 w-full skeleton bg-slate-400">
            
          </div>
          <div className=" text-center  p-5">
            <h1 className="text-xl font-bold ">
              ¡Crea grupos, añade alumnos, y asigna tareas!
            </h1>
            <p className="py-3">
              Crea tus grupos, agrega a tus alumnos en cada uno o comparte el
              codigo de clase para comenzar a publicar y asignar tareas, dar
              retroalimentacion
            </p>

            <button
              class="btn btn-primary btn-outline "
              onclick="crear_grupo.showModal()"
            >
              crear nuevo grupo
            </button>
          </div>
        </div>
        <div v-else v-for="grupo in groupStore.grupos" :key="grupo.nombre" class="p-1 md:w-1/3 w-full">
          <div
            className="card card-compact bg-base-100 shadow-xl hover:-translate-y-1 "
          >
            <figure class="bg-blue-100 p-8">
              <a className="fa fa-users text-8xl text-sky-900"></a>
            </figure>

            <div className="card-body relative">
              <div class="dropdown dropdown-start">
                <div
                  tabindex="0"
                  role="button"
                  className="btn btn-circle btn-sm btn-accent absolute top-0 end-1 -translate-y-7"
                >
                  <i class="fas fa-ellipsis-h rotate-90 text-xl"></i>
                </div>
                <ul
                  class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 flex gap-2"
                >
                <li>
                  <button  class="btn btn-sm btn-accent"
                  @click="handleEdit(grupo._id, grupo.nombre, grupo.codigo)"
                  >
                    Editar
                  </button>
                </li>
                  <li>
                    <button
                      @click="handleDelete(grupo._id, grupo.nombre)"
                      class="btn btn-sm btn-error"
                    >
                      Eliminar grupo
                    </button>
                  </li>
                </ul>
              </div>

              <h1 className="card-title">{{ grupo.nombre }}</h1>
              <p>creado por: {{ grupo.profesor.nombre }}</p>

              <p className="text-sm">
                creado: {{ userStore.formatFecha(grupo.createdAt) }}
              </p>
              <p className=" text-left text-lg">codigo de grupo:</p>
              <p class="text-xl font-extrabold">{{ grupo.codigo }}</p>
              <div class="card-actions justify-end">
                <RouterLink
                  :key="grupo.nombre"
                  class="btn btn-info border-3 border-black"
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

    
  </div>

  <!--  modal de alerta al eliminar un grupo -->
  <dialog id="eliminar_grupo" class="modal">
    <div class="modal-box flex items-center flex-col">
      <i class="fa fa-exclamation-triangle text-error text-6xl p-2"></i>

      <h2 class="font-bold text-lg p-4 text-center text-error">
        ¿Estas seguro de eliminar el grupo <b>{{ currentGroup }}</b
        >?
      </h2>

      <div class="modal-action w-full">
        <form class="w-full" method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <div class="flex justify-end gap-2">
            <button class="btn">Cancelar</button>
            <button @click="deleteGroup()" class="btn btn-error">
              Eliminar
            </button>
          </div>
        </form>
      </div>
    </div>
  </dialog>

  <!-- Formulario para crear un nuevo grupo -->
  <dialog id="crear_grupo" class="modal modal-bottom sm:modal-middle">
    
    <CreateGroupForm/>
  </dialog>
  <!-- Formulario para editar informacion del grupo -->
  <dialog id="editar_grupo" class="modal modal-bottom sm:modal-middle">
   <EditGroupForm  />
  </dialog>
</template>

<style scoped></style>
