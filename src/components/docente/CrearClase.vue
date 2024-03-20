<script setup>
import { ref } from 'vue';
const areas= ref(["Matematicas", "Español", "Ciencias","Historia"])

const classInfo= ref({
    nombre:'',
    area:''
})

const selectArea=(area)=>{
    classInfo.value.area = area
}
</script>


<template>
  <div class="text-lg ">
    <h1 class="text-4xl font-salsa">Crea una Nueva Clase</h1>
    <div
      className="bg-red-100 mt-2 rounded-xl px-5 py-2 font-lato border border-black "
    >
      <div className="py-2">
        <label className="font-bold text-lg">Nombre de la clase</label>
        
     
      <div class="input rounded-full flex items-center gap-2 ">
              <i
                class="fa fa-book-open p-3 border rounded-full"
              ></i>
              <input
                class="grow"
                type="text"
                v-model="classInfo.nombre"
                placeholder="Ej:Matematicas basico"
              />
            </div>
     
      </div>
      <div>
        <label className="font-bold text-lg"
          >Elige ela área que corresponde la clase</label
        >
        <div className=" flex gap-2 flex-wrap">
            <button 
            v-for="area in areas" 
            @click="selectArea(area)"
            class="btn  bg-red-300 rounded-xl">
                {{ area }}
                <i v-if="classInfo.area === area" class="fa fa-check text-md"></i>
            </button>
        </div>
        
        <div className=" flex justify-end">
          <button
            className="btn btn-info rounded-full hover:translate-y-2   "
            
          >
            Crear Clase
           
          </button> 
        </div>
      </div>
    </div>
    {{ classInfo }}
  </div>
</template>

<style scoped></style>
