import Router from "./utils/router";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import Error404 from "./pages/error404/error404";
import Error500 from "./pages/error500/error500";
import Profile from "./pages/profile/profile";
import Chats from "./pages/chats/chats";
import UserController from "./controllers/userController";

const UserControllerInstance = new UserController;

  
const StartupRouter = new Router('#app');
StartupRouter.use('/login', Login);
StartupRouter.use('/sign-up', Signup);
StartupRouter.use('/error404', Error404);
StartupRouter.use('/error500', Error500);
StartupRouter.use('/settings', Profile);
StartupRouter.use('/messenger', Chats);
 
StartupRouter.start();



