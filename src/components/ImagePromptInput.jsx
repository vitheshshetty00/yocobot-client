


// eslint-disable-next-line react/prop-types
const ImagePromptInput = ({inputPrompt,setInputPrompt,generate}) => {
	
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!inputPrompt) return;
		generate({ sender: "user", message: inputPrompt });
		
	};
	
	const handleKeyDown = (e) => {
		if (e.keyCode === 13 && e.shiftKey === false) {
			handleSubmit(e);
		}
	};

	return (
		<div className=" w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient  dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient pt-2">
			<form
				onSubmit={handleSubmit}
				className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
			>
				<div
					onSubmit={handleSubmit}
					className="flex flex-col gap-1 w-full mx-2 p-2 flex-grow   relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]"
				>
					{/* {true ? (
						<img
							src={loadinggif}
							alt="loading"
							className="w-8 m-auto"
						/>
					) : ( */}
					<>
						<textarea
							onKeyDown={handleKeyDown}
							tabIndex="0"
							rows="1"
							className="m-0 w-full font-satoshi resize-none border-0 bg-gray-500/40  focus:ring-0 focus-visible:ring-0 dark:bg-gray-500/40 p-2 rounded-md  max-h-[200px] outline-none overflow-y-hidden"
							placeholder="Send a message."
							value={inputPrompt}
							onChange={(e) => {
								setInputPrompt(e.target.value);
								e.target.style.height = "auto";
								e.target.style.height = e.target.scrollHeight + "px";
							}}
						></textarea>
						<button
							type="submit"
							className="
                                 p-2 rounded-md text-black/80 bg-green-600   md:bottom-2.5 hover:bg-green-300 enabled:dark:hover:text-black dark:hover:bg-green-700 disabled:hover:bg-green-400 dark:disabled:hover:bg-green-300  md:right-2 disabled:opacity-40"
							disabled={!inputPrompt}
						>
							Generate
						</button>
					</>
					{/* )} */}
				</div>
			</form>
		</div>
	);
};

export default ImagePromptInput;
