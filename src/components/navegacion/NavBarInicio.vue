<script setup>
import { RouterLink } from "vue-router";


let navRutas = [
  {
    name: "Inicio",
    ruta: "/",
  },
  // {
  //   name: "Nosotros",
  //   ruta: "/nosotros",
  // },
  // {
  //   name: "Contacto",
  //   ruta: "/contacto",
  // },
];
let authRutas = [
  {
    name: "Iniciar sesion",
    ruta: "/login",
    color:'bg-[#FFBD59]'
  },
  {
    name: "Registrarse",
    ruta: "/registro",
    color:'bg-[#5CE1E6]'
  },
];

</script>

<template>
  <header
    class="top-0 bg-gradient-to-r from-[#00CED1] to-[#0000FF] max-w-screen px-2 sticky z-50 pt-0 shadow-sm"
  >
    <div class="px-2 flex justify-between items-center">
      <div class="flex items-center gap-3">
        <RouterLink class="h-20" to="/"
          ><img class="h-20" src="@/assets/img/logoCM.png" alt=""
        /></RouterLink>
      </div>
      <!-- Botones de navegacion -->
      <nav class="hidden md:flex space-x-4 font-play text-md">
        <RouterLink
          v-for="navRuta in navRutas"
          to="/"
          class="relative hover:text-gray-300 font-medium hover:capitalize hover:font-bold after:content-[''] after:bg-blue-300 after:h-0.5 after:absolute after:left-0 after:bottom-0 after:w-0 hover:after:w-full after:duration-500"
        >
          {{ navRuta.name }}
        </RouterLink>
      </nav>
      <!-- Botones de incio de sesion y registro -->
      <div
        className=" flex flex-grow justify-center items-center space-x-4 md:justify-end"
      >
      <RouterLink v-for="authR in  authRutas" :to="authR.ruta"
      :class="`font-changa font-semibold shadow py-2 px-3  rounded-3xl ${authR.color} hover:saturate-200  hover:border-5 transition ease-out delay-150 hover:translate-y-1 hover:scale-100 duration-300`">
            {{ authR.name }}
      </RouterLink>
    </div>
    </div>

    <!-- <nav className="hidden md:flex space-x-4 font-mono">
                        <Link to={'/'} className="relative inline-block  hover:text-blue-600 hover:font-bold  px-3 py-2 text-md after:content-[''] after:bg-blue-600 after:h-0.5 after:absolute after:w-0 after:left-0 after:bottom-[5px]  hover:after:w-full   after:duration-500 active:after:-full ">Inicio</Link>

                        <Link to={'#'} className="relative inline-block  hover:text-blue-600 hover:font-bold  px-3 py-2 text-md after:content-[''] after:bg-blue-600 after:h-0.5 after:absolute after:w-0 after:left-0 after:bottom-[5px]  hover:after:w-full   after:duration-500 ">Sobre nostros
                        </Link>
                        <Link to={'#'} className="relative inline-block  hover:text-blue-600 hover:font-bold  px-3 py-2 text-md after:content-[''] after:bg-blue-600 after:h-0.5 after:absolute after:w-0 after:left-0 after:bottom-[5px]  hover:after:w-full   after:duration-500 ">Contacto</Link>
                    </nav>
                    <div className="absolute md:hidden  right-2">
                        <button className="text-black text-2xl hover:text-blue-500 "
                            onClick={activarNav}>
                            <i className="fa-solid fa-bars-staggered"></i>
                        </button>
                    </div>

                </div>
                <div className=" flex flex-grow justify-center items-center space-x-4 md:justify-end ">
                    <Link className="text-md font-changa font-semibold shadow py-2 px-3 shadow-sky-400 bg-[#5271FF] rounded-3xl 
                                                 hover:bg-indigo-400 hover:border-5 transition ease-out delay-150 hover:translate-y-1 hover:scale-100 duration-300"
                        to={'/login'}
                    >Iniciar sesion</Link>
                    <Link className="text-md font-changa font-semibold shadow py-2 px-3 shadow-white bg-[#00BF63] rounded-3xl hover:bg-green-300 transition ease-out delay-150 hover:translate-y-1 hover:scale-100 duration-300"
                        to={'/registro'}
                    >Registro</Link>
                </div>
            </div>
            <div className={estadoNav ? 'block space-y-4 px-2 pb-3 pt-2 font-mono md:hidden' : 'hidden '}>
                <ul className=" ">
                    <Link to={'/'} className="bg-green-500 text-white block rounded-md px-3 py-2 text-base" aria-current="page">Inicio</Link>
                    <Link to={'#'} className=" hover:transform-translate-y-0  hover:text-gray-500 block rounded-md px-3 py-2 text-base">Sobre nostros</Link>
                    <li className=" hover:bg-green-300 hover:text-gray-500 block rounded-md px-3 py-2 text-base">nuestra mision</li>
                    <li className=" hover:bg-green-300 hover:text-gray-500 block rounded-md px-3 py-2 text-md">Contacto</li>
                </ul>
            </div> -->
  </header>
</template>

<style scoped></style>
