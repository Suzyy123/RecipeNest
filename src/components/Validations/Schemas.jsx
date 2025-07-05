import * as Yup from 'yup';
export const RegisterSchema = Yup.object({
    username: Yup.string()
    .min(2)
    .max(25)
    .required("Username is required"),
    email: Yup.string()
    .email()
    .required("Email is required"),
    password : Yup.string()
    .min(6)
    .required("Password is required"),
    confirmPassword: Yup.string()
    .required("Confim password is required")
    .oneOf([Yup.ref('password'), null],
    "Password must match")
});
export const LoginSchema = Yup.object({
    email: Yup.string()
    .email()
    .required("Email is required"),
    password: Yup.string()
    .min(6)
    .required("Password is required")
});
export const RecipeSchema = Yup.object({
    title: Yup.string()
    .required("Recipe title is required"),
    description: Yup.string()
    .min(20)
    .required("Description is required"),
    cuisineType: Yup.string()
    .required("Cuisine Type is required"),
    prepTime: Yup.string()
    .required("Preparation Time is required"),
    cookTime: Yup.string()
    .required("Cook Time is required"),
    foodType : Yup.string()
    .required("Food Type is required"),
    image:Yup.string()
    .required("Image is required"),
    ingrediants: Yup.string()
    .required("Ingrediants are required"),
    quantity:Yup.string()
    .required("Quantity  is required"),
    instruction:Yup.string()
    .required("Instruction  is required"),
    nutrition: Yup.string()
    .required("Nutrition is required"),

});