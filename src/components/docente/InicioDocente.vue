<script setup>

</script>

<template>
    <div>
            <h1 className="text-2xl font-semibold py-2">Lo que puedes hacer en CrMinds</h1>

<div className="  grid gap-2   md:grid-cols-3 text-center py-2 ">
    <div className=" rounded-lg flex flex-col justify-between  px-10 py-2 shadow-md shadow-[#CDFFD8] bg-[#94B9FF]">
        <h1 className="text-xl font-bold ">Crear Clases</h1>
        <div className=" h-36 bg-gray-300 rounded-lg animate-pulse">
            aqui va una imagen

        </div>
        <p className=" text-lg py-2">Crea clases con actividades propias o eligiendo una de las clases ya creadas por otros docentes</p>
        <button class="btn btn-primary">Crear Clase</button>
    </div>
    <div class="flex flex-col justify-between rounded-lg px-10 shadow-md py-2 shadow-blue-300 bg-gradient-to-l from-[#CDFFD8] to-[#94B9FF]">
        <h1 class="text-lg font-bold ">Crear Grupos</h1>
        <div class=" h-36 bg-gray-300 rounded-lg animate-pulse">
            aqui va una imagen

        </div>
        <p class=" text-lg">Crea grupos para tener un mejor control de tus alumnos para asignarles clases</p>
        <button class="btn btn-primary">Crear Grupo</button>
    </div>
    <div class="rounded-lg p-3 px-10 shadow-md flex flex-col justify-between shadow-blue-300 bg-[#CDFFD8] ">
        <h1 class="text-xl font-bold">Informes</h1>
        <div class=" h-36 bg-gray-300 rounded-lg animate-pulse">
            aqui va una imagen
        </div>
        <p className="text-lg">Obten informes del rendimiento en las actividades de cada uno de tus alumnos</p>
        <button class="btn btn-primary ">Ver informes</button>
    </div>
</div>
</div>
</template>

<style scoped>
</style>