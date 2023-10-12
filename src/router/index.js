// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import("@/layouts/default/Default.vue"),
        children: [
            {
                path: "",
                name: "Home",
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
            },
            {
                path: "login",
                name: "Login",
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
            },
            {
                path: "signup",
                name: "SignUp",
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import(
                        /* webpackChunkName: "login" */ "@/views/Signup.vue"
                    ),
            },
            {
                path: "manager-test",
                name: "ManagerTest",
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import(
                        /* webpackChunkName: "managertest" */ "@/views/ManagerTest.vue"
                    ),
            },
            {
                path: "manager-test-detail/:id",
                name: "ManagerTestDetail",
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import(
                        /* webpackChunkName: "managertestdetail" */ "@/views/ManagerTestDetail.vue"
                    ),
            },
            {
                path: "manager-question",
                name: "ManagerQuestion",
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import(
                        /* webpackChunkName: "managerquestion" */ "@/views/ManagerQuestion.vue"
                    ),
            },
            {
                path: "error",
                name: "Error",
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import(
                        /* webpackChunkName: "managerquestion" */ "@/views/error.vue"
                    ),
            },
            {
                path: "manager-user",
                name: "ManagerUser",
                component: () => import("@/views/ManagerUser.vue"),
            },
            {
                path: "manager-user-detail/:id",
                name: "ManagerUserDetail",
                component: () => import("@/views/ManagerUserDetail.vue"),
            },
            {
                path: "list-topic",
                name: "ListTopic",
                component: () => import("@/views/ListTopic.vue"),
            },
            {
                path: "list-test/:id",
                name: "ListTest",
                component: () => import("@/views/ListTest.vue"),
            },
            {
                path: "test/:id",
                name: "Test",
                component: () => import("@/views/Test.vue"),
            },
            {
                path: "test/:id/result",
                name: "TestResult",
                component: () => import("@/views/TestResult.vue"),
            },
            {
                path: "test/:id/dashboard",
                name: "Dashboard",
                component: () => import("@/views/Dashboard.vue"),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
