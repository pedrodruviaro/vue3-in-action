import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

interface Recipe {
  id: string;
  name: string;
  description: string;
}

type NewRecipe = Omit<Recipe, 'id'>;

export const useRecipeStore = defineStore('recipe', () => {
  const recipes = ref<Recipe[]>([]);

  const addRecipe = (recipe: NewRecipe) => {
    const newRecipe = {
      id: String(Date.now()),
      ...recipe
    };

    recipes.value.push(newRecipe);
    return newRecipe;
  };

  const getRecipeById = (id: string) => {
    return recipes.value.find((recipe) => recipe.id === id);
  };

  const filteredRecipes = (query: string) => {
    return recipes.value.filter((recipe: Recipe) =>
      recipe.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  return {
    recipes,
    filteredRecipes,
    addRecipe,
    getRecipeById
  };
});
