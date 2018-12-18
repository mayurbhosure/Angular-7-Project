import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
    recipes: State;
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
        new Recipe('Soup Recipe',
        'This is simply a test',
        'https://www.simplyrecipes.com/wp-content/uploads/2014/11/turkey-soup-horiz-a-1600-1024x735.jpg',
        [
            new Ingredient('Meat', 1),
            new Ingredient('French fries', 12)
        ]),
        new Recipe('Cake Recipe', 'This is simply a test',
        'https://preppykitchen.com/wp-content/uploads/2017/03/Cookies-and-Cream-Cake-3-feature.jpg',
        [
            new Ingredient('Buns', 5),
            new Ingredient('Bread', 4)
        ]),
      ]
};



export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case (RecipeActions.SET_RECIPES):
        return {
            ...state,
            recipes: [...action.payload]
        };
        case (RecipeActions.ADD_RECIPE):
        return {
            ...state,
            recipes: [...state.recipes, action.payload]
        };
        case (RecipeActions.UPDATE_RECIPE):
        const recipe = state.recipes[action.payload.index];
        const updatedRecipe = {
            ...recipe,
            ...action.payload.updatedRecipe
        };
        const recipes = [...state.recipes];
        recipes[action.payload.index] = updatedRecipe;
        return {
            ...state,
            recipes: recipes
        };
        case (RecipeActions.DELETE_RECIPE):
        const oldRecipes = [...state.recipes];
        oldRecipes.splice(action.payload, 1);
        return {
            ...state,
            recipes: oldRecipes
        };
        default:
        return state;
    }
}
