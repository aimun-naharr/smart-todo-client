import { loginUser } from "@/apiRoute";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import useUserState from "@/components/hooks/user";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
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
				console.log(userData);
				setUser.onLogin(userData.data.user);
                localStorage.setItem('todo-user', JSON.stringify(userData.data.user))
			})
			.catch((err) => console.log(err))
			.finally(() => setIsLoading(false));
	};
	return (
		<div className="flex items-center justify-center md:w-2/5 h-screen mx-auto sm:w-2/3 px-12 sm:px-2 md:px-4 w-full">
			<form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
				<Input label="Email" register={register} errors={errors} id="email" required type='email' disabled={isLoading}/>
				<Input label="Password" register={register} errors={errors} id="password" type="password" required disabled={isLoading}/>
				<PrimaryButton label='login' loading={isLoading}/>
			</form>
		</div>
	);
};

export default Login;
