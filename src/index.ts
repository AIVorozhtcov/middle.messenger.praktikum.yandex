import Router from "./utils/router";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import Error404 from "./pages/error404/error404";
import Error500 from "./pages/error500/error500";
import Profile from "./pages/profile/profile";
import Sandbox from "./sandbox/sandbox";

const routes = [
    { path: '/login', name: 'Login' },
    { path: '/signup', name: 'Signup' },
    { path: '/error404', name: 'Error404' },
    { path: '/error500', name: 'Error500' },
    { path: '/profile', name: 'Profile' },
    { path: '/sandbox', name: 'Sandbox' }
  ];
  
  const StartupRouter = new Router('#app');
  StartupRouter.use('/login', Login);
  StartupRouter.use('/signup', Signup);
  StartupRouter.use('/error404', Error404);
  StartupRouter.use('/error500', Error500);
  StartupRouter.use('/profile', Profile);
  StartupRouter.use('/sandbox', Sandbox);
  
  function createLinks() {
    const body = document.querySelector('body');
    if (!body) return;
  
    const ul = document.createElement('ul');
  
    routes.forEach(route => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#'; 
      a.textContent = route.name;
      a.addEventListener('click', (event) => {
        event.preventDefault();
        StartupRouter.go(route.path);
      });
      li.appendChild(a);
      ul.appendChild(li);
    });
  
    body.appendChild(ul);
  }
  
  StartupRouter.start();
  createLinks();
