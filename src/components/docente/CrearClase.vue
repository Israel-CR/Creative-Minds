<script setup>
import classService from "@/store/ClassService";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { ref } from "vue";

const classStore = classService();

const classInfo = ref({
  nombre: "",
  area: "",
});

const rules = {
  classInfo: {
    nombre: {
      required,
    },
    area: {
      required,
    },
  },
};
const validator = useVuelidate(rules.classInfo, classInfo);
const v$ = validator.value;

const areas = ref(["Matemáticas", "Español", "Ciencias", "Historia"]);

const selectArea = (area) => {
  classInfo.value.area = area;
};

const toastalert = ref(false);
const newClass = async () => {
  const valid = await v$.$validate();
  if (valid) {
    await classStore
      .addClase(classInfo.value)
      .then(() => {
        toastalert.value= true
        setTimeout(() => {
          toastalert.value= false
        }, 3000);
      }).then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
        alert("Ha ocurrido un error ");
      });
  }
};
</script>

<template>
  <div class="text-lg">
    <h1 class="text-4xl font-changa font-semibold">Crea una Nueva Clase</h1>
    <div className="card bg-base-200 mt-2 font-lato border shadow-lg ">
      <div class="py-2 card-body">
        <div>
          <div v-if="toastalert" class="toast toast-top toast-end">
            <div class="alert alert-success">
              <span>Has creado una nueva clase.</span>
            </div>
          </div>
          <label class="label font-bold text-lg">Nombre de la clase</label>

          <div class="input rounded-full flex items-center gap-2">
            <i class="fa fa-chalkboard p-3 border rounded-full"></i>
            <input
              class="grow"
              type="text"
              v-model="classInfo.nombre"
              placeholder="Ej:Matemáticas basico"
            />
          </div>
          <div class="alert alert-error px-4 p-1 m-2" v-if="v$.nombre.$error">
            <i class="fa fa-circle-exclamation"></i>
            <span v-if="v$.nombre.$errors[0].$validator === 'required'"
              >debe especificar el nombre de la clase.</span
            >
          </div>
        </div>
        <div>
          <label class="font-bold text-lg"
            >Elige el área que corresponde la clase</label
          >
          <div class="flex gap-2 flex-wrap">
            <button
              v-for="area in areas"
              @click="selectArea(area)"
              class="btn bg-red-300 rounded-xl"
            >
              {{ area }}
              <i v-if="classInfo.area === area" class="fa fa-check text-md"></i>
            </button>
          </div>
          <div class="divider">
            <label class="label font-bold text-lg" for="">o </label>
          </div>
          <label class="label font-bold text-lg" for=""
            >especifica tu propia área</label
          >

          <div class="input rounded-full flex items-center gap-2 myx|-2">
            <i class="fa fa-book-open p-3 border rounded-full"></i>
            <input
              class="grow"
              type="text"
              v-model="classInfo.area"
              placeholder="Ej:Biología"
            />
          </div>
          <div class="alert alert-error px-4 p-1 m-2" v-if="v$.area.$error">
            <i class="fa fa-circle-exclamation"></i>
            <span v-if="v$.area.$errors[0].$validator === 'required'"
              >el area es requirido</span
            >
          </div>

          <div class="flex justify-end mt-2">
            <button
              @click="newClass"
              class="btn btn-info rounded-full hover:translate-y-2"
            >
              Crear Clase
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
