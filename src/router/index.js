import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CardPost from "@/components/CardPost.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import DocenteView from "@/views/DocenteView.vue";
import PerfilDocente from "@/components/docente/PerfilDocente.vue";
import ClasesDocente from  "@/components/docente/ClasesDocente.vue";
import GruposDocente from "@/components/docente/GruposDocente.vue";
import AlumnosDocente from "@/components/docente/AlumnosDocente.vue";
import  InformesDocente from "@/components/docente/InformesDocente.vue";

import authService from "@/store/AuthService";
import InicioDocente from "@/components/docente/InicioDocente.vue";
import GrupoDocente from "@/components/docente/GrupoDocente.vue";
import ClaseDocente from "@/components/docente/ClaseDocente.vue";
import CrearClase from "@/components/docente/CrearClase.vue";
import EditarClase from "@/components/docente/EditarClase.vue";

import AlumnoView from "@/views/AlumnoView.vue";
import InicioAlumno from "@/components/alumno/InicioAlumno.vue";
import ActividadesAlumno from "@/components/alumno/ActividadesAlumno.vue";
import RealizarActividades from "@/components/alumno/RealizarActividades.vue";

import GruposAlumno from "@/components/alumno/GruposAlumno.vue";
import PerfilAlumno from "@/components/alumno/PerfilAlumno.vue"
import ExplorarCursos from "@/components/alumno/ExplorarCursos.vue";
import GrupoAlumno from "@/components/alumno/GrupoAlumno.vue";
import DetallesInforme from "@/components/docente/DetallesInforme.vue"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      beforeEnter: async (to, from, next) => {
        const authStore = authService();
        if (authStore.isAuthenticated ) {
          await authStore.getUser();
          // Si el usuario ya está autenticado, redirige a la página principal
          next({ name: authStore.user?.rol });
        } else {
          next();
        }
      },
    },
    {
      path: "/registro",
      name: "register",
      component: RegisterView,
      beforeEnter: async (to, from, next) => {
        const authStore = authService();
        if (authStore.isAuthenticated ) {
         const res = await authStore.getUser();
          // Si el usuario ya está autenticado, redirige a la página principal
          next({ name: authStore.user?.rol });
        } else {
          next();
        }
      },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/post/:id",
      name: "post",
      component: CardPost,
    },
    {
      path: "/docente",
      name: "Docente",
      component: DocenteView,
      redirect: {name:"inicioDocente"},
      children: [
        {
          path:'',
        
          name: "inicioDocente",
          component:InicioDocente
        },
        {
          path: "perfil",
          name: "perfil",
          component:PerfilDocente
        },
        {
          path: "clases",
          name: "clases",
          component: ClasesDocente
        ,
        },
        {
          path: "clases/:idClase",
          name: "clase",
          component: ClaseDocente
        ,
        },
        {
          path: "clases/:idClase/editar",
          name: "editarClase",
          component: EditarClase
        ,
        },
        {
          path: "clases/crear",
          name: "crearClase",
          component: CrearClase
        ,
        },
        {
          path: "grupos",
          name: "grupos",
          component: GruposDocente
        },
        {
          path: "grupos/:idGrupo",
          name: "grupo",
          component: GrupoDocente
        },
        {
          path: "alumnos",
          name: "alumnos",
          component:AlumnosDocente
        ,
        },
        {
          path: "informes",
          name: "informes",
          component:InformesDocente,
        },
        {
          path: "informes/:idInforme",
          name: "informeDetalle",
          component:DetallesInforme,
        },
        {
          path: "recursos",
          name: "recursos",
          component:import("../views/AboutView.vue")
        ,
        },
      ],
      meta: {
        requireAuth: true,
      },
    },
    {
      path:"/alumno",
      name:"Alumno",
      component:AlumnoView,
      redirect:{name:"inicioAlumno"},
      children:[
        {
          path:"",
          name:"inicioAlumno",
          component:InicioAlumno
        },
        {
          path:"actividades",
          name:"actividades",
          component:ActividadesAlumno
        },
        {
          path:"actividades/:idAct",
          name:"realizarActividad",
          component:RealizarActividades
        },
        {
          path:"grupos",
          name:"gruposA",
          component:GruposAlumno
        },
        {
          path: "grupos/:idGrupo",
          name: "grupoA",
          component: GrupoAlumno
        },
        {
          path:"perfil",
          name:"perfilA",
          component:PerfilAlumno
        },
        {
          path:'explorar',
          name:'explorarCursos',
          component:ExplorarCursos
        }


      ],
      meta:{
        requireAuth:true
      }
    }
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = authService();
  if (to.meta.requireAuth) {
    if (!authStore.isAuthenticated) {
      // Si no está autenticado, redirigir al login
      next('/login');
    } else {
      next()
    }
  } else {
    next();
  }
});

export default router;
