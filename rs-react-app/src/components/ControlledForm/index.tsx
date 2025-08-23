import { useRef, type FC } from 'react';
import { schema, type FormInput } from '@/schema/schema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toBase64 } from '@/utils/utils';
import { setControlledFormData } from '@/app/features/formSlice';
import { useAppDispatch } from '@/hooks/hooks';
import type { Props } from '@/types/types';
import { colors, strengthLabels } from '@/data/data';

const ControlledForm: FC<Props> = ({ onSuccess }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const password = watch('password', '');
  const dispatch = useAppDispatch();
  const onSubmit = async (data: FormInput) => {
    const picture64 = await toBase64(
      data.picture instanceof FileList ? data.picture[0] : new File([''], '')
    );
    dispatch(
      setControlledFormData({
        name: data.name,
        age: data.age,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        gender: data.gender,
        accept: data.accept,
        picture: typeof picture64 === 'string' ? picture64 : '',
        country: data.country,
      })
    );
    onSuccess();
  };
  const getPasswordStrength = (password: string) => {
    let strengthIndicator = 0;

    if (/[A-Z]/.test(password)) {
      strengthIndicator++;
    }
    if (/[0-9]/.test(password)) {
      strengthIndicator++;
    }
    if (/[^A-Za-z0-9]/.test(password)) {
      strengthIndicator++;
    }
    if (password.length >= 7) {
      strengthIndicator++;
    }
    return strengthIndicator;
  };

  const strength = getPasswordStrength(password);

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
        {password.length > 0 && (
          <div className={`flex flex-row-reverse ${colors[strength - 1]}`}>
            {strengthLabels[strength - 1]}
          </div>
        )}
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
          <button
            className="cursor-pointer disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
            disabled={!isValid}
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ControlledForm;
