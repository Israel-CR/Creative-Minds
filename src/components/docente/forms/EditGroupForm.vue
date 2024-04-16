<script setup>
import router from "@/router";
import groupService from "@/store/GroupService";
import { ref, defineProps } from "vue";

const groupStore = groupService();


const toastalert = ref(false);


async function editGroup() {
  await groupStore
    .updateGroup(groupStore.currentGroup.idGroup)
    .then(() => {
      toastalert.value = true;
      setTimeout(() => {
        toastalert.value = false;
        
      }, 3000);
    })
    .then(async () => {
      await groupStore.getGroups();
      
    })
    .catch((error) => {
      console.log(error);
      alert("Ha ocurrido un error ");
    });
}
</script>

<template>
  <div class="modal-box px-10 bg-base-200">
    <p class="text-2xl text-center font-bold">Editar Grupo</p>
    <form class="">
      <label class="label font-lato font-bold text-lg" htmlFor="">Nombre</label>
      <input
        v-model="groupStore.currentGroup.nombre"
        class="input input-success w-full"
        type="text"
        placeholder="nombre del grupo"
      />
      <label class="label font-lato font-bold text-lg" htmlFor=""
        >Codigo del grupo</label
      >
      <input
        v-model="groupStore.currentGroup.codigo"
        class="w-full input input-success"
        type="text"
        placeholder="codigo"
      />
    </form>
    <div v-if="toastalert" class="flex justify-center pt-4">
      <span
        v-if="toastalert"
        class="loading loading-spinner text-info loading-lg"
      >
      </span>
    </div>

    <div v-else class="modal-action flex gap-2">
      <form class="" method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button @click="cancelar" class="btn btn-accent">Cancelar</button>
      </form>
      <button @click="editGroup" class="btn btn-primary">Editar</button>
    </div>
  </div>
</template>

<style scoped></style>
