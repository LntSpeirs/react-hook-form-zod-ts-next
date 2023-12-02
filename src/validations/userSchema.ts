import path from "path";
import { z } from "zod";

// Definición de un arreglo llamado 'plans' que contiene cadenas de texto
const plans = ["free", "basic", "medium", "premium"] as const;

// Definición de un tipo llamado 'Plans', que es una unión de los elementos del arreglo 'plans'
export type Plans = (typeof plans)[number];

// Definición de un objeto llamado 'mappedPlans', que asigna cada elemento del tipo 'Plans' a una cadena de texto
export const mappedPlans: { [key in Plans]: string } = {
  free: "Gratis",
  basic: "Básico",
  medium: "Medio",
  premium: "Premium",
};

export const userSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        message: "El nombre debería ser de al menos 3 caracteres de largo.",
      })
      .max(200, { message: "El nombre no puede ser mayor a 200 caracteres." }),
    email: z.string().email({
      message: "El email debe ser un email válido.",
    }),
    password: z.string().min(6, {
      message: "La contraseña debe ser de al menos 6 caracteres de largo.",
    }),
    confirmPassword: z.string().min(6, {
      message: "La contraseña debe ser de al menos 6 caracteres de largo.",
    }),
    dateOfBirth: z
      .string()
      .refine((dob) => new Date(dob).toString() !== "Invalid Date", {
        message: "La fecha de nacimiento debe ser una fecha válida.",
      }),
    weight: z.string().refine(
      (weight) => {
        return !isNaN(parseFloat(weight)); // Devuelve true si es un número
      },
      { message: "El peso debe ser un número." }
    ),
    plan: z.enum(plans, {
      errorMap: () => ({ message: "El plan no es válido." }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });
