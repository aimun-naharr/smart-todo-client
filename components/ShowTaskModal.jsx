import React from 'react';
import Modal from './Modal';
import useAddTaskModal from './hooks/useAddTaskModal';
import useUpdateTaskModal from './hooks/useUpdateTaskModal';
import useShowTaskModal from './hooks/useShowTaskModal';

const ShowTaskModal = () => {
    const close = useShowTaskModal(state=>state.onClose);
	const isOpen = useShowTaskModal(state=>state.isOpen);
  console.log('showtask', isOpen)
    const currentTask=useUpdateTaskModal(state=>state.currentTask)
    const formatDate=new Date(currentTask.dueDate).toLocaleDateString('en-ca')
    const bodyContent=(
      <div>
        <p className='text-xl mb-4'>{currentTask?.description}</p>
        <p>Due Date: {formatDate}</p>
      </div>
    )
    return (
        <Modal title={currentTask?.title} onClose={close} isOpen={isOpen}   body={bodyContent} 
        actionLabel={'close'} onSubmit={close}
        />
    );
};

export default ShowTaskModal;