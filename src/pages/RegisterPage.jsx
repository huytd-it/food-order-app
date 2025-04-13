import RegisterForm from '../components/Auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <a href="/login" className="font-medium text-primary hover:text-primary-dark">
              sign in to your existing account
            </a>
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage; 