<script setup>
import groupService from "@/store/GroupService";
import { onMounted, ref, computed } from "vue";
import GrupoDocente from "../docente/GrupoDocente.vue";

const groupStore = groupService();

const codigoGrupo = ref("");

const infoGroups = computed(() => groupStore.grupos);

async function unirseAGrupo() {
  await groupStore.joinAGroup(codigoGrupo.value);
  window.location.reload()
}

onMounted(async () => {
  await groupStore.getGroupsStudent();
});
</script>

<template>
  <div class="flex justify-between">
    <h1 class="text-3xl font-lato font-bold">
      {{ infoGroups.length<=0 ? " Aqui se mostraran los grupos" : "Mis Grupos" }}

    </h1>
    <h1></h1>

    <button
      class="btn btn-outline btn-primary"
      onclick="unirseGrupo.showModal()"
    >
      Unirse a un grupo <i class="fas fa-user-plus"></i>
    </button>
  </div>
  <div class="rounded-md flex flex-col md:flex-row p-5 gap-2">
    <div
      class="card font-lato bg-base-200 shadow-md p-3 flex flex-col items-center w-full md:w-1/3"
      v-for="grupo in infoGroups"
      :key="grupo._id"
    >
      <div class="w-full text-center shadow-md bg-info rounded-md">
        <i class="fa fa-users py-6 text-gray-500 text-9xl"></i>
      </div>
      <div class="card-body self-start">
        <div class="grow">
          <h1 class="text-4xl font-extrabold py-3 text-clip ">{{ grupo.nombre }}</h1>
          <p><b>Maestro:</b> {{ grupo.profesor?.nombre }}</p>
          <p><b>Alumnos:</b> {{ grupo.alumnos.length }}</p>
        </div>
      </div>


      <div class="card-actions">
        <RouterLink
          :key="grupo.nombre"
          class="btn btn-outline btn-primary self-end"
          :to="{ name: 'grupoA', params: { idGrupo: grupo._id } }"
        >
          Ver Grupo
        </RouterLink>
      </div>
    </div>
  </div>

  <!-- unirse a un grupo -->
  <dialog id="unirseGrupo" class="modal">
    <div class="modal-box bg-green-300">
      <p class="text-3xl text-center font-bold">Unirse a un grupo</p>
      <div class="p-4">
        <div
          v-if="groupStore.errorMessages.error"
          class="alert alert-error p-2"
        >
          <i class="fa fa-circle-exclamation"></i>
          {{ groupStore.errorMessages.error }}
        </div>
        <label for="" class="label font-bold text-xl">Código de Grupo</label>
        <input
          v-model="codigoGrupo"
          class="input input-info rounded-full w-full form-control"
          id="pregunta"
          type="text"
          placeholder="Ingresar el código del grupo"
          required
        />
      </div>

      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Cancelar</button>
        </form>
        <button class="btn btn-primary" @click="unirseAGrupo">Unirse</button>
      </div>
    </div>
  </dialog>
</template>

<style scoped></style>
