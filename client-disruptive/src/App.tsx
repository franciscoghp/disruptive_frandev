import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  RegisterPages,
  LoginPages,
  HomePages,
  CategoriesListPage,
  CategoriesFormPages,
  PrivateRoute,
  NoFoundPages,
  ContentFromPages,
} from './pages';
import { AuthProvider } from './context/AuthContext';
import { PermissionsProvider } from './context/PermissionContext';
import { CategoriesProvider } from './context/CategoriesContext';
import { ContentProvider } from './context/ContentContext';

import { Navbar } from './components';
function App() {
  return (
    <AuthProvider>
      <PermissionsProvider>
        <CategoriesProvider>
          <ContentProvider>
            <BrowserRouter>
              <Navbar />
              <main className="mx-auto p-4">
                <Routes>
                  <Route path="*" element={<NoFoundPages />} />
                  {/* Publics Pages */}
                  <Route path="/" element={<HomePages />} />
                  <Route path="/login" element={<LoginPages />} />
                  <Route path="/register" element={<RegisterPages />} />

                  {/* Privates Pages */}
                  <Route element={<PrivateRoute />}>
                    <Route
                      path="/categories"
                      element={<CategoriesListPage />}
                    />
                    <Route
                      path="/categories/form"
                      element={<CategoriesFormPages />}
                    />
                    <Route
                      path="/categories/:id"
                      element={<CategoriesFormPages />}
                    />

                    <Route
                      path="/contents/form"
                      element={<ContentFromPages />}
                    />
                    <Route
                      path="/contents/form/:id"
                      element={<ContentFromPages />}
                    />
                  </Route>
                </Routes>
              </main>
            </BrowserRouter>
          </ContentProvider>
        </CategoriesProvider>
      </PermissionsProvider>
    </AuthProvider>
  );
}

export default App;

