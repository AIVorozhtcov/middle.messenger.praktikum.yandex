import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';
import getProperty from './src/handlebars-helpers';

export default defineConfig({
  plugins: [handlebars({
    helpers: {
      getProperty,
    },
    partialDirectory: './src/partials',
    context: {
      testName: {
        name: 'User',
        number: '42',
      },
      testUser: {
        email: 'dna@gmail.com',
        login: 'dna42',
        first_name: 'Douglas',
        second_name: 'Adams',
        display_name: 'Doug',
        phone: '+42434445',
      },
      profileData: [
        {
          name: 'Почта',
          type: 'email',
          property: 'email',
          rules: null,
        },
        {
          name: 'Логин',
          type: 'text',
          property: 'login',
          rules: null,
        },
        {
          name: 'Имя',
          type: 'text',
          property: 'first_name',
          rules: null,
        },
        {
          name: 'Фамилия',
          type: 'text',
          property: 'second_name',
          rules: null,
        },
        {
          name: 'Имя в чате',
          type: 'text',
          property: 'display_name',
          rules: null,
        },
        {
          name: 'Телефон',
          type: 'tel',
          property: 'phone',
          rules: null,
        },
      ],
    },
  })],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'src/pages/login/login.html'),
        signup: resolve(__dirname, 'src/pages/signup/signup.html'),
        chats: resolve(__dirname, 'src/pages/chats/chats.html'),
        profile: resolve(__dirname, 'src/pages/profile/profile.html'),
        error404: resolve(__dirname, 'src/pages/errors/error404.html'),
        error500: resolve(__dirname, 'src/pages/errors/error500.html'),
      },
    },
  },
  server: {
    open: 'index.html',
  },
});
