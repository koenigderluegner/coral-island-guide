import { CookingRecipeIngredientsPipe } from './cooking-recipe-ingredients.pipe';

describe('CookingRecipeIngredientsPipe', () => {
    it('create an instance', () => {
        const pipe = new CookingRecipeIngredientsPipe();
        expect(pipe).toBeTruthy();
    });
});
