import React, { useState } from "react";
import useAddTaskModal from "./hooks/useAddTaskModal";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import Input from "./Input";

const AddTaskModal = () => {
	const addTaskModal = useAddTaskModal();
	const [isLoading, setIsLoading] = useState(false);
	
    let currentDate = new Date().toLocaleDateString('en-ca');
    console.log(currentDate)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => {
		console.log(data);
		// setIsLoading(false);
		// axios.post("api/register", data)
		// 	.then(() => registerModal.onClose())
		// 	.catch((err) => console.log(err))
		// 	.finally(() => setIsLoading(false));
	};

	const bodyContent = (
		<form className="flex flex-col gap-4">
			<div className="flex gap-4">
				<Input register={register} id="title" label="Title" errors={errors} required />
				<Input register={register} id="dueDate" label="Due Date" errors={errors} required type="date" min={currentDate} />
			</div>
			<div>
				<Input register={register} id="description" label="Description" errors={errors} required />
			</div>
		</form>
	);

	return <Modal title="Add a task" onClose={addTaskModal.onClose} isOpen={addTaskModal.isOpen} disabled={isLoading} actionLabel="Save" onSubmit={handleSubmit(onSubmit)} body={bodyContent} />;
};

export default AddTaskModal;
