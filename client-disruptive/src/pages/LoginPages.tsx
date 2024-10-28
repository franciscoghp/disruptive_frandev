import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CustomInput from '../components/CustomInput';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components';
const LoginPages = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { signIn, errors: loginErrors, isAuthenticated } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    return signIn({
      email: data.email,
      password: data.password,
    });
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  });

  return (
    <Card>
      {loginErrors &&
        loginErrors.length > 0 &&
        loginErrors.map((error, i) => (
          <div
            key={i}
            className="text-slate-200 bg-red-500 py-2 px-3 text-sm text-center my-2 rounded-sm mb-1"
          >
            {error}
          </div>
        ))}
      <h1 className="text-white text-3xl mb-5">Login</h1>
      <form onSubmit={onSubmit}>
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 uppercase mt-2"
        >
          Login
        </button>
      </form>
      <p className="flex gap-x-2 justify-between mt-4">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-500">
          Register
        </Link>
      </p>
    </Card>
  );
};

export default LoginPages;

