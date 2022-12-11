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

import ManagerSettingsLanguage from './pages/[manager]/settings'

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

    const frontendRoutes = <Route path="/" element={<FrontendLayout><Outlet /></FrontendLayout>}>
        <Route path="/services/:slug" element={<ServicesShow />} />
        <Route path="/services" element={<Services />} />

        <Route path="/products/:slug" element={<ProductsShow />} />
        <Route path="/products" element={<Products />} />

        <Route path="/blog/:slug" element={<PublicationsShow />} />
        <Route path="/blog" element={<Publications />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
    </Route>;

    let routes = <Routes>
        {/* <Route path="/auth/admin">
            <Route element={<AuthAdminLayout />}>
                <Route path="/auth/admin/verify" element={<AuthAdminVerify />} />
                <Route path="/auth/admin/login" element={<AuthAdminLogin />} />
            </Route>
        </Route>
        <Route path="/admin" to="/auth/admin/login" /> */}

        <Route path="/auth/user" element={<AuthLayout><Outlet /></AuthLayout>}>
            <Route path="/auth/user/login" element={<AuthUserLogin />} />
        </Route>
        <Route path="/user" element={<Navigate to="/auth/user/login" />} />

        {frontendRoutes}
    </Routes>;

    if (token) {
        routes = <Routes>
            {['/user', '/admin'].map(path => <Route key={`route-${path}`} path={path} element={<BackendManagerLayout><Outlet /></BackendManagerLayout>}>
                {/* <Route path="/admin/admins/:id/edit" element={<AdminAdminsEdit />} />
                    <Route path="/admin/admins/add" element={<AdminAdminsAdd />} />
                    <Route path="/admin/admins" element={<AdminAdmins />} /> */}

                <Route path="/:manager/testimonials/:id/edit" element={<ManagerTestimonialsEdit />} />
                <Route path="/:manager/testimonials/add" element={<ManagerTestimonialsAdd />} />
                <Route path="/:manager/testimonials" element={<ManagerTestimonials />} />

                <Route path="/:manager/services/:id/edit" element={<ManagerServicesEdit />} />
                <Route path="/:manager/services/add" element={<ManagerServicesAdd />} />
                <Route path="/:manager/services" element={<ManagerServices />} />

                <Route path="/:manager/subscribers/:id/edit" element={<ManagerSubscribersEdit />} />
                <Route path="/:manager/subscribers/add" element={<ManagerSubscribersAdd />} />
                <Route path="/:manager/subscribers" element={<ManagerSubscribers />} />

                <Route path="/:manager/publications/:id/edit" element={<ManagerPublicationsEdit />} />
                <Route path="/:manager/publications/add" element={<ManagerPublicationsAdd />} />
                <Route path="/:manager/publications" element={<ManagerPublications />} />

                <Route path="/:manager/cms/global" element={<ManagerCmsGlobal />} />
                <Route path="/:manager/cms/general" element={<ManagerCmsGeneral />} />
                <Route path="/:manager/cms/auth" element={<ManagerCmsAuth />} />
                <Route path="/:manager/cms/backend" element={<ManagerCmsBackend />} />
                <Route path="/:manager/cms/frontend" element={<ManagerCmsFrontend />} />

                <Route path="/:manager/dashboard" element={<ManagerDashboard />} />

                <Route path="/:manager/features/:id/edit" element={<ManagerFeaturesEdit />} />
                <Route path="/:manager/features/add" element={<ManagerFeaturesAdd />} />
                <Route path="/:manager/features" element={<ManagerFeatures />} />

                {/* <Route path="/:manager/languages/:id/edit" element={<ManagerLanguagesEdit />} />
                    <Route path="/:manager/languages/add" element={<ManagerLanguagesAdd />} />
                    <Route path="/:manager/languages" element={<ManagerLanguages />} /> */}

                <Route path="/:manager/roles/:id/edit" element={<ManagerRolesEdit />} />
                <Route path="/:manager/roles/add" element={<ManagerRolesAdd />} />
                <Route path="/:manager/roles" element={<ManagerRoles />} />

                <Route path="/:manager/settings/language" element={<ManagerSettingsLanguage />} />

                <Route path="/:manager/users/:id/edit" element={<ManagerUsersEdit />} />
                <Route path="/:manager/users/add" element={<ManagerUsersAdd />} />
                <Route path="/:manager/users" element={<ManagerUsers />} />

                <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
                <Route path="/user" element={<Navigate to="/user/dashboard" />} />
            </Route>)}


            <Route path="/dashboard" element={<Navigate to={`/${role}/dashboard`} />} />
            <Route path="/login" element={<Navigate to={`/${role}/dashboard`} />} />
            <Route path="/start" element={<Navigate to={`/${role}/dashboard`} />} />
            <Route path="/auth" element={<Navigate to={`/${role}/dashboard`} />} />

            {frontendRoutes}
        </Routes>;
    }

    return <div className='App'>{routes}</div>;
}
