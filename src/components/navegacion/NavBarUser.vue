<script setup>
import authService from '@/store/AuthService';
const authStore= authService()

</script>

<template>
    <header class=" border-b shadow-md top-0 bg-gradient-to-r from-[#69d5f3] to-[#6EFFA0] max-w-screen px-2 sticky z-50 pt-0">
            <div class="p-2 flex justify-between items-center ">
                <div class="flex gap-1 p-1 items-center  md:w-2/3  rounded-full bg-white w-full">
                    <input
                        class="px-4  w-full  py-2 rounded-full  bg-[#ECECEC] appearance-none leading-tight focus:outline-none focus:shadow-xl-outline  "
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