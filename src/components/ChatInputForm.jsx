import { useState } from "react";
import { loadinggif } from "../assets";
// eslint-disable-next-line react/prop-types
const ChatInputForm = ({ sendMessage, loading }) => {
	const [inputMsg, setInputMsg] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!inputMsg) return;
		sendMessage({ sender: "user", message: inputMsg });
		setInputMsg("");
	};
	const handleKeyDown = (e) => {
		if (e.keyCode === 13 && e.shiftKey === false) {
			handleSubmit(e);
		}
	};

	return (
		<div className=" w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient pt-2">
			<form
				onSubmit={handleSubmit}
				className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
			>
				<div
					className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]"
				>
					{loading ? (
						<img src={loadinggif} alt="loading" className="w-8 m-auto" />
					) : (
						<>
							<textarea
								onKeyDown={handleKeyDown}
								tabIndex="0"
								rows="1"
								className="m-0 w-full font-satoshi resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent pl-2 md:pl-0 max-h-[200px] outline-none overflow-y-hidden"
								placeholder="Send a message."
								value={inputMsg}
								onChange={(e) => {
									setInputMsg(e.target.value);
									e.target.style.height = "auto";
									e.target.style.height = e.target.scrollHeight + "px";
								}}
							></textarea>
							<button
								type="submit"
								className="absolute p-1 rounded-md text-gray-500 bottom-1.5 md:bottom-2.5 hover:bg-gray-100 enabled:dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent right-1 md:right-2 disabled:opacity-40"
								disabled={!inputMsg}
							>
								<svg
									stroke="currentColor"
									fill="none"
									strokeWidth="2"
									viewBox="0 0 24 24"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="h-4 w-4 mr-1"
									height="1em"
									width="1em"
									xmlns="http://www.w3.org/2000/svg"
								>
									<line x1="22" y1="2" x2="11" y2="13"></line>
									<polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
								</svg>
							</button>
						</>
					)}
				</div>
			</form>
		</div>
	);
};

export default ChatInputForm;
