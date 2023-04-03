import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import PrimaryButton from "./PrimaryButton";

const Modal = ({ actionLabel, onClose, onSubmit, body, disabled, footer, isOpen, secondaryAction, secondaryActionLabel, title, loading }) => {
	const [showModal, setShowModal] = useState(isOpen);
	useEffect(() => {
		setShowModal(isOpen);
	}, [isOpen]);

	const handleClose = useCallback(() => {
		if (disabled) {
			return;
		}
		setShowModal(false);
		setTimeout(() => {
			onClose();
		}, 300);
	}, [disabled, onClose]);

	const handleSubmit = ()=> {
		if (disabled) return;
		console.log('submit')
		onSubmit()
	}

	const handleSecondaryAction = useCallback(() => {
		if (disabled || !secondaryAction) return;
		secondaryAction();
	}, [disabled, secondaryAction]);

	if (!isOpen) {
		return null;
	}

	return (
		<div
			className="
        flex 
        items-center 
        justify-center
        bg-neutral-600/70 
        overflow-x-hidden 
        overflow-y-auto 
        fixed 
        z-50 
        inset-0 
        focus:outline-none
        "
		>
			{/* wrapper */}
			<div
				className="
            relative
            w-full
            sm:w-5/6
            md:w-4/6
            lg:w-3/6
            xl:w-2/5
            mx-auto
            // h-full
            lg:h-auto
            md:h-auto
            "
			>
				{/* content */}
				<div
					className={`  translate 
                 duration-300
                 h-full
                 ${showModal ? "translate-y-0" : "translate-y-full"}
                 ${showModal ? "opacity-100" : "opacity-0"}
                 `}
				>
					{/* content wrapper */}
					<div
						className="
                        translate 
                        my-6
                      bg-white
                      shadow-lg
                        lg:h-auto 
                        md:h-auto 
                        border-0 
                        rounded-lg 
                        relative
                        flex
                        flex-col
                         w-full
                         outline-none
                    "
					>
						{/* header */}
						<div
							className="flex
                        items-center
                        p-6
                        rounded-t
                        justify-center
                        relative 
                        border-b-2 
                        "
						>
							<button
								onClick={handleClose}
								className="absolute right-8  rounded-full border-none  w-8 h-8  shadow-sm bg-rose-500 text-white top-5   flex items-center justify-center"
							>
								<IoMdClose />
							</button>
							<div className="text-center text-lg font-semibold text-slate-900">{title}</div>
						</div>

						{/* body */}
						<div className="flex-auto relative p-6">{body}</div>
						{/* footer */}
						<div className="flex flex-col gap-2 p-6">
							<div className="flex flex-row w-full gap-2 items-center">
								{/* {secondaryAction && secondaryActionLabel && <button label={secondaryActionLabel} disabled={disabled} onClick={handleSubmit}  />} */}
								<PrimaryButton loading={loading} label={actionLabel} disabled={disabled} onClick={handleSubmit} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
