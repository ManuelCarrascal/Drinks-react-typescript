import { z } from 'zod';
import {
	CategoriesAPIResponseSchema,
	DrinkAPIresponse,
	DrinksAPIresponse,
	RecipeAPIResponseSchema,
	SearchFilterSchema,
} from '../schemas/recipes-schema';

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>;

export type SearchFilter = z.infer<typeof SearchFilterSchema>;

export type Drinks = z.infer<typeof DrinksAPIresponse>;

export type Drink = z.infer<typeof DrinkAPIresponse>;

export type Recipe = z.infer<typeof RecipeAPIResponseSchema>
