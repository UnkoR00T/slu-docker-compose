import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PrepGame from '@/components/PrepGame.vue'
import InfoGame from '@/components/InfoGame.vue'
import MidGameGoals from '@/components/MidGameGoals.vue'
import EndGame from '@/components/EndGame.vue'
import MidGameGoalkeep from '@/components/MidGameGoalkeep.vue'
import Generated from '@/components/Generated.vue'
import MidGameFouls from '@/components/MidGameFouls.vue'
import AuthVerify from '@/components/AuthVerify.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/prep',
          component: PrepGame,
        },
        {
          path: '/info',
          component: InfoGame,
        },
        {
          path: '/midgame/goals',
          component: MidGameGoals,
        },
        {
          path: '/midgame/goalkeep',
          component: MidGameGoalkeep,
        },
        {
          path: '/midgame/fouls',
          component: MidGameFouls,
        },
        {
          path: '/endgame',
          component: EndGame,
        },
        {
          path: '/generated',
          component: Generated
        }
      ],
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthVerify,
    }
  ],
})

export default router
