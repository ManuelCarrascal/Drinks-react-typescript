import { StateCreator } from 'zustand';
import { Recipe } from '../types';
import { createRecipeSlice, recipeSliceType } from './recipeSlice';
import {
	createNotificationSlice,
	NotificationSliceType,
} from './notificationSlice';

export type FavoritesSliceType = {
	favorites: Recipe[];
	handleClickFavorite: (recipe: Recipe) => void;
	favoriteExists: (id: Recipe['idDrink']) => boolean;
	loadFromStorage: () => void;
};

export const createFavoritesSlice: StateCreator<
	FavoritesSliceType & recipeSliceType & NotificationSliceType,
	[],
	[],
	FavoritesSliceType
> = (set, get, api) => ({
	favorites: [],
	handleClickFavorite: (recipe) => {
		if (get().favoriteExists(recipe.idDrink)) {
			set((state) => ({
				favorites: state.favorites.filter(
					(favorite) => favorite.idDrink !== recipe.idDrink
				),
			}));
			createNotificationSlice(set, get, api).showNotification({
				text: 'Se ha eliminado de favoritos',
				error: false,
			});
		} else {
			//Primera forma de agregar un elemento al array
			// set({
			//     favorites: [...get().favorites, recipe]
			// })
			//Segunda forma de agregar un elemento al array
			set((state) => ({
				favorites: [...state.favorites, recipe],
			}));
			createNotificationSlice(set, get, api).showNotification({
				text: 'Se ha agregado a favoritos',
				error: false,
			});
		}
		createRecipeSlice(set, get, api).closeModal();
		localStorage.setItem('favorites', JSON.stringify(get().favorites));
	},
	favoriteExists: (id) => {
		return get().favorites.some((favorite) => favorite.idDrink === id);
	},
	loadFromStorage: () => {
		const storedFavorites = localStorage.getItem('favorites');
		if (storedFavorites) {
			set({
				favorites: JSON.parse(storedFavorites),
			});
		}
	},
});
