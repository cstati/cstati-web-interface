<template>
  <v-app>

    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            CStati Dasboard
          </v-list-item-title>
          <v-list-item-subtitle>
            Bot web-interface
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
          nav
      >
        <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
        app
        prominent
        color="#330b28"
        dark
        shrink-on-scroll
        :src="require('./assets/cstati-logo.png')"
    >
      <template v-slot:img="{ props }">
        <v-img
            v-bind="props"
            gradient="to top right, rgba(0,0,0,.5), rgba(51,11,40,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>
        {{ titleMessage }}
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main id="main">
      <router-view class="ma-4" id="router"/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    drawer: window.innerWidth > 1200,
    items: [
      { title: 'Обзор', icon: 'mdi-home', to: '/' },
      { title: 'Таблица гостей', icon: 'mdi-table-large', to: '/table' },
      { title: 'Рассылка', icon: 'mdi-send', to: '/broadcast' },
    ],
    right: null,
    phrases: [
        'Кстати, скоро Посвят',
        'Кстати, не опоздай на созвон',
        'Кстати, проверь оплаты',
        '🤑 🤑 🤑',
    ],
    titleMessage: '',
  }),
  mounted() {
    this.titleMessage = this.getRandomPhrase()
  },
  methods: {
    getRandomPhrase() {
      return this.phrases[Math.floor(Math.random() * this.phrases.length)]
    }
  }
};
</script>

<style>
 .v-app-bar-title__content {
   width: 100% !important;
 }
 body {
   background-color: rgb(18, 18, 18);
 }
</style>
