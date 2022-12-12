import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { useAppSelector } from './app/hooks';

import AuthLayout from './components/auth/navigation/layout';
import BackendManagerLayout from './components/backend/navigation/layout';
import FrontendLayout from './components/frontend/navigation/layout';

import { selectAuth } from './features/auth/authSlice';

// Manager routes
import ManagerCmsGlobal from './pages/[manager]/cms/global'
import ManagerCmsGeneral from './pages/[manager]/cms/general'
import ManagerCmsAuth from './pages/[manager]/cms/auth'
import ManagerCmsBackend from './pages/[manager]/cms/backend'
import ManagerCmsFrontend from './pages/[manager]/cms/frontend'

import ManagerDashboard from './pages/[manager]/dashboard'

import ManagerFeatures from './pages/[manager]/features'
import ManagerFeaturesAdd from './pages/[manager]/features/add'
import ManagerFeaturesEdit from './pages/[manager]/features/[id]/edit'

// import ManagerLanguages from './pages/[manager]/languages'
// import ManagerLanguagesAdd from './pages/[manager]/languages/add'
// import ManagerLanguagesEdit from './pages/[manager]/languages/[id]/edit'

import ManagerRoles from './pages/[manager]/roles'
import ManagerRolesAdd from './pages/[manager]/roles/add'
import ManagerRolesEdit from './pages/[manager]/roles/[id]/edit'

import ManagerSettings from './pages/[manager]/settings'

import ManagerProducts from './pages/[manager]/products'
import ManagerProductsAdd from './pages/[manager]/products/add'
import ManagerProductsEdit from './pages/[manager]/products/[id]/edit'

import ManagerPublications from './pages/[manager]/publications'
import ManagerPublicationsAdd from './pages/[manager]/publications/add'
import ManagerPublicationsEdit from './pages/[manager]/publications/[id]/edit'

import ManagerSubscribers from './pages/[manager]/subscribers'
import ManagerSubscribersAdd from './pages/[manager]/subscribers/add'
import ManagerSubscribersEdit from './pages/[manager]/subscribers/[id]/edit'

import ManagerServices from './pages/[manager]/services'
import ManagerServicesAdd from './pages/[manager]/services/add'
import ManagerServicesEdit from './pages/[manager]/services/[id]/edit'

import ManagerTestimonials from './pages/[manager]/testimonials'
import ManagerTestimonialsAdd from './pages/[manager]/testimonials/add'
import ManagerTestimonialsEdit from './pages/[manager]/testimonials/[id]/edit'

import ManagerUsers from './pages/[manager]/users'
import ManagerUsersAdd from './pages/[manager]/users/add'
import ManagerUsersEdit from './pages/[manager]/users/[id]/edit'

// Admin routes
// import AdminAdmins from './pages/admin/admins'
// import AdminAdminsAdd from './pages/admin/admins/add'
// import AdminAdminsEdit from './pages/admin/admins/[id]/edit'

// Auth routes
import AuthUserLogin from './pages/auth/user/login'

// import AuthAdminLogin from './pages/auth/admin/login'
// import AuthAdminVerify from './pages/auth/admin/verify'

// Frontend routes
import Home from './pages'
import About from './pages/about'
import Contact from './pages/contact'

import Publications from './pages/blog'
import PublicationsShow from './pages/blog/[slug]'

import Products from './pages/products'
import ProductsShow from './pages/products/[slug]'

import Services from './pages/services'
import ServicesShow from './pages/services/[slug]'

export default function App() {
    const { token, role } = useAppSelector(selectAuth)

    return <div className='App'>
        <Routes>
            {token ? <>
                {['/user', '/admin'].map(path => <Route key={`route-${path}`} path={path} element={<BackendManagerLayout><Outlet /></BackendManagerLayout>}>
                    {/* <Route path="/admin/admins/:id/edit" element={<AdminAdminsEdit />} />
                    <Route path="/admin/admins/add" element={<AdminAdminsAdd />} />
                    <Route path="/admin/admins" element={<AdminAdmins />} /> */}

                    <Route path={`${path}/testimonials/:id/edit`} element={<ManagerTestimonialsEdit />} />
                    <Route path={`${path}/testimonials/add`} element={<ManagerTestimonialsAdd />} />
                    <Route path={`${path}/testimonials`} element={<ManagerTestimonials />} />

                    <Route path={`${path}/services/:id/edit`} element={<ManagerServicesEdit />} />
                    <Route path={`${path}/services/add`} element={<ManagerServicesAdd />} />
                    <Route path={`${path}/services`} element={<ManagerServices />} />

                    <Route path={`${path}/subscribers/:id/edit`} element={<ManagerSubscribersEdit />} />
                    <Route path={`${path}/subscribers/add`} element={<ManagerSubscribersAdd />} />
                    <Route path={`${path}/subscribers`} element={<ManagerSubscribers />} />

                    <Route path={`${path}/publications/:id/edit`} element={<ManagerPublicationsEdit />} />
                    <Route path={`${path}/publications/add`} element={<ManagerPublicationsAdd />} />
                    <Route path={`${path}/publications`} element={<ManagerPublications />} />

                    <Route path={`${path}/products/:id/edit`} element={<ManagerProductsEdit />} />
                    <Route path={`${path}/products/add`} element={<ManagerProductsAdd />} />
                    <Route path={`${path}/products`} element={<ManagerProducts />} />

                    <Route path={`${path}/cms/global`} element={<ManagerCmsGlobal />} />
                    <Route path={`${path}/cms/general`} element={<ManagerCmsGeneral />} />
                    <Route path={`${path}/cms/auth`} element={<ManagerCmsAuth />} />
                    <Route path={`${path}/cms/backend`} element={<ManagerCmsBackend />} />
                    <Route path={`${path}/cms/frontend`} element={<ManagerCmsFrontend />} />

                    <Route path={`${path}/dashboard`} element={<ManagerDashboard />} />

                    <Route path={`${path}/features/:id/edit`} element={<ManagerFeaturesEdit />} />
                    <Route path={`${path}/features/add`} element={<ManagerFeaturesAdd />} />
                    <Route path={`${path}/features`} element={<ManagerFeatures />} />

                    {/* <Route path={path + "/languages/:id/edit"} element={<ManagerLanguagesEdit />} />
                    <Route path={path + "/languages/add"} element={<ManagerLanguagesAdd />} />
                    <Route path={path + "/languages"} element={<ManagerLanguages />} /> */}

                    <Route path={`${path}/roles/:id/edit`} element={<ManagerRolesEdit />} />
                    <Route path={`${path}/roles/add`} element={<ManagerRolesAdd />} />
                    <Route path={`${path}/roles`} element={<ManagerRoles />} />

                    <Route path={`${path}/settings`} element={<ManagerSettings />} />

                    <Route path={`${path}/users/:id/edit`} element={<ManagerUsersEdit />} />
                    <Route path={`${path}/users/add`} element={<ManagerUsersAdd />} />
                    <Route path={`${path}/users`} element={<ManagerUsers />} />

                    <Route path={path} element={<Navigate to={`${path}/dashboard`} />} />
                </Route>)}

                {["/auth", "/dashboard", "/login", "/start"].map(path => <Route key={`route-${path}`} path={path} element={<Navigate to={`/${role}/dashboard`} />} />)}
            </> : null}

            <Route path="/auth" element={<AuthLayout><Outlet /></AuthLayout>}>
                <Route path='/auth/admin'>
                    {/* <Route path="/auth/admin/verify" element={<AuthAdminVerify />} />
                <Route path="/auth/admin/login" element={<AuthAdminLogin />} /> */}
                </Route>

                <Route path="/auth/user">
                    <Route path="/auth/user/login" element={<AuthUserLogin />} />
                </Route>
            </Route>
            <Route path="/admin" element={<Navigate to="/auth/admin/login" />} />
            <Route path="/user" element={<Navigate to="/auth/user/login" />} />

            <Route path="/" element={<FrontendLayout><Outlet /></FrontendLayout>}>
                <Route path="/services/:slug" element={<ServicesShow />} />
                <Route path="/services" element={<Services />} />

                <Route path="/products/:slug" element={<ProductsShow />} />
                <Route path="/products" element={<Products />} />

                <Route path="/blog/:slug" element={<PublicationsShow />} />
                <Route path="/blog" element={<Publications />} />

                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/" index element={<Home />} />
            </Route>
        </Routes>
    </div>;
}
