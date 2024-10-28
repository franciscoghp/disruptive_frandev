import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Card, CustomInput, Label } from '../components/';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
const RegisterPages = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { signUp, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/login');
    }
  });

  const onSubmit = handleSubmit(async (data) => {
    signUp({
      username: data.username,
      email: data.email,
      password: data.password,
      role: data.role || 'readers',
    });
  });

  return (
    <Card>
      {registerErrors &&
        registerErrors.length > 0 &&
        registerErrors.map((error, i) => (
          <p
            key={i}
            className="text-slate-200 bg-red-500 py-2 px-3 text-sm rounded-sm mb-1"
          >
            {error}
          </p>
        ))}
      <h1 className="text-white text-3xl mb-5">Register</h1>
      <form onSubmit={onSubmit}>
        <CustomInput
          type="text"
          label="Username"
          name="username"
          register={register}
          registerOptions={{ required: true }}
        />
        {errors.username && (
          <p className="text-red-500">Username is required</p>
        )}
        <CustomInput
          type="email"
          label="Email"
          name="email"
          register={register}
          registerOptions={{ required: true }}
        />
        {errors.email && <p className="text-red-500">Email is required</p>}
        <CustomInput
          type="password"
          label="Password"
          name="password"
          register={register}
          registerOptions={{ required: true }}
        />
        {errors.password && (
          <p className="text-red-500">Password is required</p>
        )}
        <div className="w-full mb-4">
          <Label name="role">Role</Label>
          <select
            id="role"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue=""
            {...register('role', { required: false })}
          >
            <option selected disabled>
              Select Role
            </option>
            <option value="creators">Creators</option>
            <option value="readers">Readers</option>
          </select>
        </div>
        <Button>Register</Button>
      </form>
      <p className="flex gap-x-2 justify-between mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-500">
          Login
        </Link>
      </p>
    </Card>
  );
};

export default RegisterPages;

