import INDEX from '../pages/index.jsx';
import PROJECTS from '../pages/projects.jsx';
import CONTACT from '../pages/contact.jsx';
import ABOUT from '../pages/about.jsx';
import PROJECT_DETAIL from '../pages/project-detail.jsx';
export const routers = [{
  id: "index",
  component: INDEX
}, {
  id: "projects",
  component: PROJECTS
}, {
  id: "contact",
  component: CONTACT
}, {
  id: "about",
  component: ABOUT
}, {
  id: "project-detail",
  component: PROJECT_DETAIL
}]