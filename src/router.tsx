import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './layouts/Layout';

const IndexPage = lazy(() => import('./views/IndexPage'));
const FavoritesPage = lazy(() => import('./views/FavoritesPage'));

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route
						index
						path="/"
						element={
							<Suspense fallback="Cargando....">
								<IndexPage />
							</Suspense>
						}
					/>
					<Route
						path="/favoritos"
						element={
							<Suspense fallback="Cargando....">
								<FavoritesPage />
							</Suspense>
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
