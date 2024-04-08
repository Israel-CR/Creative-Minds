<script setup>
import groupService from "@/store/GroupService";
import { ref } from "vue";

const groupStore = groupService();

const groupInfo = ref({
  nombre: "",
  codigo: "",
});

const toastalert= ref(false)
async function createGroup() {
  await groupStore.addGroup(groupInfo.value)
    .then(() => {
      toastalert.value = true;
      setTimeout(() => {
        toastalert.value = false;
      }, 3000);
    })
    .then((response) => console.log(response))
    .catch((error) => {
      console.log(error);
      alert("Ha ocurrido un error ");
    });
}
</script>

<template>
  <div class="modal-box px-10 bg-base-200">
    
    <p class="text-2xl text-center font-bold">crear nuevo grupo</p>
    {{ groupInfo }}
    <form class="">
      <label class="label font-lato font-bold text-lg" htmlFor="">Nombre</label>
      <input
        v-model="groupInfo.nombre"
        class="input input-success w-full"
        type="text"
        placeholder="nombre del grupo"
      />
      <label class="label font-lato font-bold text-lg" htmlFor=""
        >Codigo del grupo</label
      >
      <input
        v-model="groupInfo.codigo"
        class="w-full input input-success"
        type="text"
        placeholder="codigo"
      />
     
    </form>
    <div v-if="toastalert" class="flex justify-center pt-4">
         <span v-if="toastalert" class="loading loading-spinner text-info loading-lg">
    </span>
    </div>
   
    <div v-else class="modal-action flex gap-2">
      <form class="" method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-accent">Cancelar</button>
        
      </form>
      <button @click="createGroup" class="btn btn-primary">Crear</button>
    </div>
  </div>
</template>

<style scoped></style>
