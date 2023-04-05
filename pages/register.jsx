import Input from '@/components/Input';
import PrimaryButton from '@/components/PrimaryButton';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {signUpUser} from '../apiRoute.js'
import { useRouter } from 'next/router';
import axios from 'axios';
import useUserState from '@/components/hooks/user.js';

const Register = () => {
    const router=useRouter()
    const setUser = useUserState();
	const user=useUserState(state=>state.user)
    const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [isLoading, setIsLoading] = useState(false);


    const onSubmit = (data) => {
		setIsLoading(true);
		axios.post(signUpUser, data)
			.then((userData) => {
				setUser.onLogin(userData.data.user);
                localStorage.setItem('todo-user', JSON.stringify(userData.data.user))
				router.replace('/')
			})
			.catch((err) => console.log(err))
			.finally(() => setIsLoading(false));
	};
	useEffect(()=>{
		if(user){
			router.push('/')
		}
	},[])
    return (
        <div className="flex items-center justify-center md:w-2/5 h-screen mx-auto sm:w-2/3 px-12 sm:px-2 md:px-4 w-full">
			<form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                <div className='flex gap-4'>
                    <Input label="First Name" register={register} errors={errors} id="firstName" required  disabled={isLoading}/>
                    <Input label="Last Name" register={register} errors={errors} id="lastName" required  disabled={isLoading}/>
                </div>
				<Input label="Email" register={register} errors={errors} id="email" required type='email' disabled={isLoading}/>
				<Input label="Password" register={register} errors={errors} id="password" type="password" required disabled={isLoading}/>
                <p>Already registered? <span className='cursor-pointer transition hover:underline' onClick={()=>router.push('/login')}>Please login</span></p>
				<PrimaryButton label='Signup' loading={isLoading}/>
			</form>
		</div>
    );
};

export default Register;