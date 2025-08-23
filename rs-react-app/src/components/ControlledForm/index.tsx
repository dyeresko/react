import { useRef, type FC } from 'react';
import { schema, type FormInput } from '@/schema/schema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const ControlledForm: FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const onSubmit = async (data: FormInput) => {
    console.log(data);
  };
  return (
    <div className="p-10">
      <form
        className="flex flex-col gap-2"
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between">
          <label htmlFor="c-name">Name</label>
          <input
            {...register('name')}
            className="input"
            id="c-name"
            name="name"
          />
        </div>
        {errors.name && (
          <div className="flex flex-row-reverse text-red-600/100">
            {errors.name.message}
          </div>
        )}
        <div className="flex justify-between">
          <label htmlFor="c-age">Age</label>
          <input
            {...register('age')}
            className="input"
            id="c-age"
            name="age"
            type="number"
          />
        </div>
        {errors.age && (
          <div className="flex flex-row-reverse text-red-600/100">
            {errors.age.message}
          </div>
        )}
        <div className="flex justify-between">
          <label htmlFor="c-email">E-mail</label>
          <input
            {...register('email')}
            className="input"
            id="c-email"
            name="email"
          />
        </div>
        {errors.email && (
          <div className="flex flex-row-reverse text-red-600/100">
            {errors.email.message}
          </div>
        )}
        <div className="flex justify-between">
          <label htmlFor="c-password">Password</label>
          <input
            {...register('password')}
            className="input"
            id="c-password"
            name="password"
            type="password"
          />
        </div>
        {errors.password && (
          <div className="flex flex-row-reverse text-red-600/100">
            {errors.password.message}
          </div>
        )}
        <div className="flex justify-between">
          <label htmlFor="c-confirmPassword">Confirm Password</label>
          <input
            {...register('confirmPassword')}
            className="input"
            id="c-confirmPassword"
            name="confirmPassword"
            type="password"
          />
        </div>
        {errors.confirmPassword && (
          <div className="flex flex-row-reverse text-red-600/100">
            {errors.confirmPassword.message}
          </div>
        )}
        <fieldset className="border border-gray-300 rounded-md">
          <legend>Select gender:</legend>
          <div>
            <input
              {...register('gender')}
              type="radio"
              id="c-male"
              name="gender"
              value="male"
            />
            <label htmlFor="c-male">Male</label>
          </div>
          <div>
            <input
              {...register('gender')}
              type="radio"
              id="c-female"
              name="gender"
              value="female"
            />
            <label htmlFor="c-female">Female</label>
          </div>
        </fieldset>
        {errors.gender && (
          <div className="flex flex-row-reverse text-red-600/100">
            {errors.gender.message}
          </div>
        )}
        <div>
          <label>
            <input
              id="c-accept"
              {...register('accept')}
              type="checkbox"
              name="accept"
            />
            <label htmlFor="c-accept">Accept T&C</label>
          </label>
        </div>
        {errors.accept && (
          <div className="flex flex-row-reverse text-red-600/100">
            {errors.accept.message}
          </div>
        )}
        <label htmlFor="c-picture">Picture</label>
        <div>
          <input
            {...register('picture')}
            className="file:mr-5 file:p-1 file:border-[1px] file:bg-stone-50"
            id="c-picture"
            name="picture"
            type="file"
            accept=".png,.jpeg,.jpg"
          />
        </div>
        {errors.picture && (
          <div className="flex flex-row-reverse text-red-600/100">
            {errors.picture.message}
          </div>
        )}
        <div className="flex justify-between">
          <label htmlFor="c-country">Country</label>
          <input
            {...register('country')}
            className="input"
            id="c-country"
            name="country"
          />
        </div>
        {errors.country && (
          <div className="flex flex-row-reverse text-red-600/100">
            {errors.country.message}
          </div>
        )}
        <div className="flex justify-end pt-10">
          <button className="" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ControlledForm;
