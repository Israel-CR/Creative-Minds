<script setup>
import authService from '@/store/AuthService';
import userService from '@/store/UserService';
const authStore= authService()
const userStore= userService()

</script>

<template>
    <header class=" border-b shadow-md top-0  bg-gradient-to-l from-[#6EDFFF] to-[#6EFFA0] max-w-screen px-2 sticky z-50 pt-0">
            <div class="p-2 flex justify-between items-center ">

                <div class=" flex items-center ">
                        <RouterLink className="h-20 " to='/docente'>
                        <img src="@/assets/img/CrMinds.png" className='h-20' alt="CreativeMinds" />
                    </RouterLink>
                    <div class="p-0">
                            <p class=" font-lato font-bold">Creative</p>
                        <p class=" font-salsa">Minds</p>
                        </div>
                    </div>

                <div class=" m-2 flex gap-1 p-1 px-2 items-center  md:w-2/3  rounded-full ring bg-base-100 shadow-red-300 w-full">
                    <input
                        class="px-4  w-full  py-2 rounded-full bg-transparent  appearance-none leading-tight focus:outline-none focus:shadow-xl-outline  "
                        type="text"
                        placeholder="Buscar"
                    />
                    <i class="fa fa-search p-3 rounded-full bg-blue-300"></i>
                </div>
                <div class=" hidden flex-grow justify-center items-end space-x-4 md:flex font-lato">
                    <div>
                        <p class="  text-xl font-bold">{{authStore.user?.rol}}</p>
                <p >{{authStore.user?.nombre}}</p>
                    </div>
                   
                
                </div>
            </div>

        </header>
</template>

<style scoped>
</style>