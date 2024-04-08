<script setup>
import { RouterLink, useRouter } from 'vue-router';
import authService from '@/store/AuthService';
import router from '@/router';



const authStore= authService()
const navRutas=[
    {
        nombre: "Mis clases",
        path:'clases',
        icon:"fa fa-home"
    },
    {
        nombre:'Mis Grupos',
        path:'grupos',
        icon:'fa fa-users'
    }
    ,
    {
        nombre:'Mis Alumnos',
        path:'alumnos',
        icon:'fa fa-graduation-cap'
    }
    ,
    {
        nombre:'Informes',
        path:'informes',
        icon:'fa fa-chart-bar'
    }
    ,
    {
        nombre:'Recursos Educativos',
        path:'recursos',
        icon:'fa fa-book'
    }
]


const logout=()=>{
    authStore.logout();
    
      router.push('/')
}

</script>

<template>
   <div className="min-h-screen md:w-56 bg-transparent w-16  border shadow-md flex-shrink-0 ">
                <div className="sticky  top-0 font-play font-bold ">
                   <div className="min-h-screen flex flex-col justify-between ">
                    <div class=" flex items-center flex-col md:flex-row border-b-2 shadow-md">
                        <RouterLink className="h-24" to='/docente'>
                        <img src="@/assets/img/CrMinds.png" className='h-24' alt="CreativeMinds" />
                    </RouterLink>
                    <div class=" ">
                            <p class=" font-lato font-bolder">Creative</p>
                        <p class=" font-salsa">Minds</p>
                        </div>
                    </div>
                    <ul className=" menu bg-base-200 rounded-box  text-md flex flex-col gap-2  " >
                            <RouterLink v-for="ruta in navRutas"  :key="ruta.nombre" :to="{name:ruta.path}" class="flex justify-between rounded-xl p-3 bg-blue-300 hover:bg-primary" active-class="bg-primary text-white"> <p className=" hidden md:inline-block">{{ ruta.nombre }}</p><p :class="ruta.icon"></p></RouterLink>
                    </ul>
                    <div class="divider"></div> 
                    
                        <div class="menu">
                             <p>perfil</p>
                       
                            <RouterLink :to= " {name: 'perfil'}" class="flex bg-[#94B9FF] justify-between p-3 rounded-xl hover:bg-primary " active-class="bg-primary text-white"> <p className=" hidden md:inline-block">Perfil</p><p class="fa fa-user"></p></RouterLink>
                        </div>
                       
    
                         <button class="btn btn-outline btn-error m-2 flex justify-between" @click="logout"> <p className=" hidden md:inline-block"
                            
                            >Cerrar sesion</p><i class="fas fa-sign-out-alt"></i></button>
                    
                   </div>
                    
                </div>
                </div>
</template>

<style scoped>
</style>