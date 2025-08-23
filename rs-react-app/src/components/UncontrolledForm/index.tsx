import { useRef, useState, type FC } from 'react';
import { schema } from '@/schema/schema';
import { ValidationError } from 'yup';

const UncontrolledForm: FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const dataObj = {
        name: formData.get('name'),
        age: Number(formData.get('age')),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        gender: formData.get('gender'),
        accept: formData.get('accept') === 'on',
        picture: formData.get('picture'),
        country: formData.get('country'),
      };
      try {
        setErrors({});
        await schema.validate(dataObj, {
          abortEarly: false,
        });
      } catch (errors) {
        const validationErrors: Record<string, string> = {};
        if (errors instanceof ValidationError) {
          console.log(errors.inner);
          for (const error of errors.inner) {
            if (error.path !== undefined) {
              validationErrors[error.path] = error.errors[0];
            }
          }
        }
        setErrors(validationErrors);
      }
    }
  };
  return (
    <div className="p-10">
      <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
        <div className="flex justify-between">
          <label htmlFor="name">Name</label>
          <input className="input" id="name" name="name" />
        </div>
        {errors.name && (
          <div className="flex flex-row-reverse text-red-600/100">
            {errors.name}
          </div>
        )}
        <div className="flex justify-between">
          <label htmlFor="age">Age</label>
          <input className="input" id="age" name="age" type="number" />
        </div>
        {errors.age && (
          <div className="flex flex-row-reverse text-red-600/100">
            {errors.age}
          </div>
        )}
        <div className="flex justify-between">
          <label htmlFor="email">E-mail</label>
          <input className="input" id="email" name="email" />
        </div>
        {errors.email && (
          <div className="flex flex-row-reverse text-red-600/100">
            {errors.email}
          </div>
        )}
        <div className="flex justify-between">
          <label htmlFor="password">Password</label>
          <input
            className="input"
            id="password"
            name="password"
            type="password"
          />
        </div>
        {errors.password && (
          <div className="flex flex-row-reverse text-red-600/100">
            {errors.password}
          </div>
        )}
        <div className="flex justify-between">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="input"
            id="confirm-password"
            name="confirmPassword"
            type="password"
          />
        </div>
        {errors.confirmPassword && (
          <div className="flex flex-row-reverse text-red-600/100">
            {errors.confirmPassword}
          </div>
        )}
        <fieldset className="border border-gray-300 rounded-md">
          <legend>Select gender:</legend>
          <div>
            <input type="radio" id="male" name="gender" value="male" />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input type="radio" id="female" name="gender" value="female" />
            <label htmlFor="female">Female</label>
          </div>
        </fieldset>
        {errors.gender && (
          <div className="flex flex-row-reverse text-red-600/100">
            {errors.gender}
          </div>
        )}
        <div>
          <label>
            <input type="checkbox" name="accept" />
            <label htmlFor="accept">Accept T&C</label>
          </label>
        </div>
        {errors.accept && (
          <div className="flex flex-row-reverse text-red-600/100">
            {errors.accept}
          </div>
        )}
        <label htmlFor="picture">Picture</label>
        <div>
          <input
            className="file:mr-5 file:p-1 file:border-[1px] file:bg-stone-50"
            id="picture"
            name="picture"
            type="file"
            accept=".png,.jpeg,.jpg"
          />
        </div>
        {errors.picture && (
          <div className="flex flex-row-reverse text-red-600/100">
            {errors.picture}
          </div>
        )}
        <div className="flex justify-between">
          <label htmlFor="country">Country</label>
          <input className="input" id="country" name="country" />
        </div>
        {errors.country && (
          <div className="flex flex-row-reverse text-red-600/100">
            {errors.country}
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

export default UncontrolledForm;
