<script setup>
import classService from "@/store/ClassService";
import groupService from "@/store/GroupService";
import userService from "@/store/UserService";
import { onMounted, ref, computed } from "vue";

const userStore = userService();
const groupStore= groupService()
const classStore = classService()

const infoPerfil = ref({});

const noClases= ref(classStore.clases.length)
const noGrupos= ref(groupStore.grupos.length)

const fechaNacimiento =ref(userStore.formatFecha(userStore.perfil.fechaNacimiento))

const editarPerfil = ref(false);
function showForm() {
  editarPerfil.value = true;
}
function hideForm() {
  editarPerfil.value = false;
  infoPerfil.value = JSON.parse(JSON.stringify(userStore.perfil));
  infoPerfil.value.fechaNacimiento = fechaNacimiento;
}


const handleEditProfile=async()=>{
  await userStore.updateProfile(infoPerfil.value)
  .then(()=>{
    userStore.getProfile();
    editarPerfil.value = false;
  infoPerfil.value = JSON.parse(JSON.stringify(userStore.perfil));
  infoPerfil.value.fechaNacimiento = userStore.formatFecha(userStore.perfil.fechaNacimiento);
  })
  .catch(() => {
    alertEditarPerfil.showModal()
    editarPerfil.value = false;
  infoPerfil.value = JSON.parse(JSON.stringify(userStore.perfil));
  infoPerfil.value.fechaNacimiento = fechaNacimiento;
  })
}



onMounted( () => {
   userStore.getProfile();
     infoPerfil.value = JSON.parse(JSON.stringify(userStore.perfil));
      infoPerfil.value.fechaNacimiento = userStore.formatFecha(userStore.perfil.fechaNacimiento);
});
</script>

<template>
  <div class="w-full">
    <h1 class="text-4xl font-play font-semibold">Mi Perfil</h1>

    <div
      class="card bg-sky-200 shadow-md my-4 flex md:flex-row flex-col items-center font-lato"
    >
      <figure class="avatar p-2">
        <div
          class="w-40 rounded-full ring ring-info ring-offset-base-100 ring-offset-2"
        >
          <img
            alt="perfil"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </figure>
      <div class="card-body flex-grow">
        <h1 class="text-5xl capitalize font-bold">
          {{ userStore.perfil?.nombre }}
        </h1>
        <p class="text-2xl">
          <i class="fa fa-chalkboard-teacher"></i> {{ userStore.perfil?.rol }}
        </p>
        <div class="flex flex-col md:flex-row justify-between mt-2">
          <p class="text-xl">
            <i class="fa fa-envelope"></i> {{ userStore.perfil?.correo }}
          </p>
          <p class="text-xl"><i className="fa fa-users"></i>{{ noGrupos }} Grupos</p>
          <p class="text-xl">
            <i class="fa fa-chalkboard"></i>{{ noClases }} Clases creadas
          </p>
          <p class="text-xl"><i className="fa fa-star"></i> 0 valoracion</p>
        </div>
      </div>
    </div>

    <div class="card shadow-md bg-sky-200">
      <div>
        <div class="flex justify-between pb-3 p-3">
          <h1 class="card-title text-3xl font-bold">
            {{ editarPerfil ? "Editar mis datos" : "Mis Datos" }}
          </h1>
          <button
            v-if="editarPerfil"
            @click="hideForm"
            class="btn btn-outline btn-primary rounded-full"
          >
            Cancelar
          </button>
          <button
            v-else
            @click="showForm"
            class="btn btn-outline btn-primary rounded-full"
          >
            Editar datos
            <i class="fa fa-edit"></i>
          </button>
        </div>

        <div
          v-if="!editarPerfil"
          class="card-body grid grid-cols-2 text-lg flex-col md:flex-row gap-3"
        >
          <div class="w-1/2">
            <p><b>Nombre:</b>{{ userStore.perfil?.nombre }}</p>
          </div>
          <div class="w-1/2">
            <p><b>Usuario:</b> {{ userStore.perfil.usuario }}</p>
          </div>
          <div class="w-1/2">
            <p><b>Correo Electronico:</b> {{ userStore.perfil.correo }}</p>
          </div>
          <div class="w-1/2">
            <p><b>Rol del Usuario:</b>{{ userStore.perfil.rol }}</p>
          </div>
          <div class="w-1/2">
            <p><b>Fecha de Nacimento:</b>{{ infoPerfil.fechaNacimiento }}</p>
          </div>
          <div class="w-1/2">
            <p><b>Genero:</b> {{ userStore.perfil.genero }}</p>
          </div>
        </div>
        <div v-else class="card-body">
          <form class="flex flex-wrap md:flex-row felx-col">
            <div class="md:w-1/2">
              <label class="label font-bold" for="">Nombre</label>
              <input
                v-model="infoPerfil.nombre"
                type="text"
                class="input grow"
              />
            </div>
            <div class="md:w-1/2">
              <label class="label font-bold">Usuario</label>
              <input
                v-model="infoPerfil.usuario"
                type="text"
                class="input grow"
              />
            </div>
            <div class="md:w-1/2">
              <label class="label font-bold" or="">Correo Electrónico</label>
              <input
                v-model="infoPerfil.correo"
                type="text"
                class="input grow"
              />
            </div>
            <div class="md:w-1/2">
              <label for="" class="label font-">Rol del Usuario</label>
              <select
                v-model="infoPerfil.rol"
                class="select font-bold text-black grow max-w-xs"
                disabled
              >
                <option value="Alumno">Alumno</option>
                <option value="Docente">Docente</option>
              </select>
            </div>
            <div class="md:w-1/2">
              <label for="" class="label font-">Fecha de Nacimento</label>
              <input
                v-model="infoPerfil.fechaNacimiento"
                type="date"
                class="input grow"
              />
            </div>
            <div class="w-full flex justify-end ">
              <button type="button" @click="handleEditProfile" class="btn btn-info">Editar datos</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>


  <dialog id="alertEditarPerfil" class="modal">
  <div class="modal-box flex items-center flex-col">
       <i class="fa fa-exclamation-triangle text-error  text-6xl p-2  "></i>
   
    <h2 class="font-bold text-lg p-4 text-center text-error">El usuario ya esta en uso elige otro</h2>
    
    <div class="modal-action">

      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-primary">Aceptar</button>
      </form>
      
    </div>
  </div>
</dialog>

</template>
