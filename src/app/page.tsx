"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, mappedPlans } from "@/validations/userSchema";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  weight: string;
  plan: string;
};

const Home = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(userSchema),
  });

  const opcionesPlanes = Object.entries(mappedPlans).map(([key, value]) => (
    <option key={key} value={key}>
      {value}
    </option>
  ));

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };
  console.log(errors);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" {...register("name")} />
        {errors.name?.message && <p>{errors.name.message}</p>}

        {/*Email */}
        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register("email")} />
        {errors.email?.message && <p>{errors.email.message}</p>}

        {/*Password */}
        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register("password")} />
        {errors.password?.message && <p>{errors.password.message}</p>}

        {/*Confirm Password */}
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword?.message && (
          <p>{errors.confirmPassword.message}</p>
        )}

        {/*Fecha de nacimiento */}
        <label htmlFor="dateOfBirth">Fecha de nacimiento</label>
        <input type="date" id="birthDate" {...register("dateOfBirth")} />
        {errors.dateOfBirth?.message && <p>{errors.dateOfBirth.message}</p>}

        {/*Weight */}
        <label htmlFor="weight">Weight</label>
        <input type="number" id="weight" {...register("weight")} />
        {errors.weight?.message && <p>{errors.weight.message}</p>}

        {/*plan */}
        <label htmlFor="plan">Plan</label>
        {/* <select id="plan" {...register("plan")}>
          <option value="free">Free</option>
          <option value="basic">Basic</option>
          <option value="medium">Medium</option>
          <option value="premium">Premium</option>
        </select> */}
        <select id="plan" {...register("plan")}>
          {opcionesPlanes}
        </select>
        {errors.plan?.message && <p>{errors.plan.message}</p>}

        <button type="submit">Submit</button>
      </form>
      <div>{JSON.stringify(watch(), null, 2)}</div>
    </div>
  );
};

export default Home;
