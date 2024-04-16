<script setup>
import groupService from "@/store/GroupService";
import { computed, ref } from "vue";

const groupStore= groupService()
const alumnooos=[]
const misAlumnos= computed(()=>{
  const alumnos = []

  for(let i=0;i< groupStore.grupos?.length;i++){


      // if(groupStore.grupos[i]?.alumnos.filter(alumnos  )){
      groupStore.grupos[i]?.alumnos.map(alumno=>{
        const infoAlumno={};
        
        if(!alumnooos.includes(alumno._id)){
          alumnooos.push(alumno._id)
          infoAlumno.nombre=alumno
          
          alumnos.push(infoAlumno)
        }
        
      })
      
     
      
      
      
  }
return(alumnos)
})
const alumnos = ref([
  {
    nombre_completo: "Juan Pérez",
    id_estudiante: "123456",
    correo_electronico: "juanperez@example.com",
    telefono: "555-123-4567",
    cursos_inscritos: ["Matemáticas Básicas"],
    fecha_inscripcion: "2023-09-15",
    estado_inscripcion: "Activo",
    calificaciones_progreso: "Promedio: 90%",
    comentarios_notas_adicionales: "-",
  },
  {
    nombre_completo: "María González",
    id_estudiante: "789012",
    correo_electronico: "mariagonzalez@example.com",
    telefono: "555-987-6543",
    cursos_inscritos: ["Inglés Intermedio"],
    fecha_inscripcion: "2023-08-20",
    estado_inscripcion: "Inactivo",
    calificaciones_progreso: "Pendiente",
    comentarios_notas_adicionales: "Problemas de conexión",
  },
  {
    nombre_completo: "Carlos Rodríguez",
    id_estudiante: "345678",
    correo_electronico: "carlosrodriguez@example.com",
    telefono: "555-234-5678",
    cursos_inscritos: ["Historia del Arte"],
    fecha_inscripcion: "2023-10-10",
    estado_inscripcion: "Activo",
    calificaciones_progreso: "Promedio: 85%",
    comentarios_notas_adicionales: "-",
  },
]);
</script>

<template>
 
  <div>
    <h1 class="text-4xl font-changa font-semibold">Mis Alumnos</h1>
    <div
      v-for="(alumno, index) in misAlumnos"
      :key="index"
      class="card bg-base-200 m-3"
    >
      <div class="p-2">
        <div class="flex items-center font-lato space-x-6 gap-2">
          <div class="avatar">
            <div class="w-20 rounded-full ring-2">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div class="p-2 w-1/4">
            <b>nombre: </b> {{ alumno.nombre.nombre }}
            
          </div>

          <div class="p-2">
            
           <p><b>correo:</b>{{ alumno.nombre.correo }}</p>
          </div>
         
        </div>
      </div>
    </div>
 
  </div>
</template>

<style scoped></style>
