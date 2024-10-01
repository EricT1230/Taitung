import { createRouter, createWebHashHistory } from 'vue-router';
import calculatorPage from '../views/calculator.vue';

const routes = [
  {
    path: '/calculator',
    name: 'calculatorPage',
    component: calculatorPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),  
  routes,
});

export default router;
