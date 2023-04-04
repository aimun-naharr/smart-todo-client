

import { loginUser } from "@/apiRoute";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import useUserState from "@/components/hooks/user";
import axios from "axios";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
	const router=useRouter()
	
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [isLoading, setIsLoading] = useState(false);
	const setUser = useUserState();
	

	const onSubmit = (data) => {
		setIsLoading(true);
		axios.post(loginUser, data)
			.then((userData) => {
				setUser.onLogin(userData.data.user);
                localStorage.setItem('todo-user', JSON.stringify(userData.data.user))
				
			})
			.catch((err) => console.log(err))
			.finally(() => {setIsLoading(false)
				  router.replace('/')
			});
	};
	// useEffect(()=>{
	// 	if(user){
	// 		router.push('/')
	// 	}
	// 	return null
	// },[user])
	return (
		<div className="flex items-center justify-center md:w-2/5 h-screen mx-auto sm:w-2/3 px-12 sm:px-2 md:px-4 w-full">
			<form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
				<Input label="Email" register={register} errors={errors} id="email" required type='email' disabled={isLoading}/>
				<Input label="Password" register={register} errors={errors} id="password" type="password" required disabled={isLoading}/>
				<p>New to Smart todo? <span className='cursor-pointer transition hover:underline' onClick={()=>router.push('/register')}>Please register first</span></p>
				<PrimaryButton label='login' loading={isLoading}/>
			</form>
		</div>
	);
};

export default Login;
