import Input from '@/components/Input';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading , setIsLoading]=useState(false)
    const onSubmit = data => {
        setIsLoading(false);
		axios.post("api/register", data)
			.then(() => registerModal.onClose())
			.catch((err) => console.log(err))
			.finally(() => setIsLoading(false));
    };
    return (
        <div className='flex items-center justify-center w-2/5 h-screen mx-auto'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-4'>
                <Input label='Email' register={register} errors={errors} id='email' required/>
                <Input label='Password' register={register} errors={errors} id='password' type='password' required/>
                <button type='submit'>submit</button>
            </form>
        </div>
    );
};

export default Login;