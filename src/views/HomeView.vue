<script setup>
import TheWelcome from "../components/TheWelcome.vue";
import ListCard from "../components/ListCard.vue";
import NavBarInicio from "@/components/navegacion/NavBarInicio.vue";



</script>

<template>
  <div
    class="bg-gradient-to-r text-lg  from-[#00CED1] to-[#0000FF] h-full min-h-screen min-w-screen"
  >
    <NavBarInicio/>
    <main class=" md:px-20 text-white">
      <div class="flex justify-center flex-col md:flex-row items-center">
         <img
          src="@/assets/img/fondoHome.png"
          alt=""
          className=" w-full md:float- md:w-1/2"
        />
        <div class="">
          <h1
            class="text-8xl py-4 font-changa text-center font-extrabold inline-block overflow-hidden"
          >
            Creative Minds
            <span class="pl-1 animate-pulse">|</span>
          </h1>

          <p class="font-salsa text-justify typing-effect">
            Plataforma de aprendizaje interactivo para alumnos de primaria,
            aprende de forma divertida
          </p>
        </div>
       
      </div>
    </main>
  </div>
</template>

<style scoped>
.typing-effect {
  max-width: 600px;
  margin: auto;
  text-align: center;
  padding: 20px;
}

.typing-cursor {
  display: inline-block;
  vertical-align: middle;
  width: 8px;
  height: 1.2em;
  background-color: #000;
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>