import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import useUpdateTaskModal from "./hooks/useUpdateTaskModal";
import Input from "./Input";
import { getAllTasks, updateTaskById } from "@/apiRoute";
import axios from "axios";
import useUserState from "./hooks/user";
import useTasks from "./hooks/useTasks";

const UpdateTaskModal = ({ tasks }) => {
	console.log(tasks)
	const updateTask = useUpdateTaskModal();

	const user = useUserState((state) => state.user);
	
	const currentTask=useUpdateTaskModal(state=>state.currentTask)
	const setCurrentTask=useUpdateTaskModal(state=>state.setCurrentTask)
	const setTasks = useTasks((state) => state.setTasksData);

	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	let currentDate = new Date().toLocaleDateString("en-ca");
	const onSubmit = (data) => {
		setIsLoading(true);
		axios.patch(`${updateTaskById}/${currentTask._id}`, data)
			.then((data) => {
				console.log(data);
				updateTask.onClose();
			})
			.catch((err) => console.log(err))
			.finally(() => {
				reset();
				setIsLoading(false);
			});

		axios.get(`${getAllTasks}/${user._id}`)
			.then((data) => {
				console.log(data);
				setTasks(data.data);
				setIsLoading(false);
			})
			.catch((err) => console.log(err))
			.finally(() => setIsLoading(false));
	};
	const handleClose=()=>{
		updateTask.onClose()
setCurrentTask({})
	}
	const bodyContent = (
		<form className="flex flex-col gap-4">
			<div className="flex gap-4">
				<Input defaultValue={currentTask?.title} register={register} id="title" label="Title" errors={errors} />
				<Input register={register} defaultValue={currentTask?.dueDate} id="dueDate" label="Due Date" errors={errors} type="date" min={currentDate} />
			</div>
			<div>
				<Input register={register} id="description" defaultValue={currentTask?.description} label="Description" errors={errors} />
			</div>
		</form>
	);
	return (
		<Modal
			title="Edit your task"
			onClose={handleClose}
			isOpen={updateTask.isOpen}
			disabled={isLoading}
			actionLabel="Edit"
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			loading={isLoading}
		/>
	);
};

export default UpdateTaskModal;
