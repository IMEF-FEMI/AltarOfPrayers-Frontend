import {Landing} from '../views/Landing/index'
import Login from '../views/Login'
import About from '../views/About'
const routes = [
	{ path: '/', name: 'Home', component: Landing },
	{ path: '/about', name: 'About', component: About },
	// { path: '/contact', name: 'Contact', component: 'Contact' },
	{ path: '/admin', name: 'Admin', component: Login },
	{ path: '/thanks', name: 'Thanks', component: 'Thanks', hidden: true }
];
 
export default routes;
