import { useState } from "react";
import ChatInputForm from "./ChatInputForm";
import ChatBody from "./ChatBody";
import { useMutation } from "react-query";
import { fetchChatResponse } from "../api/fetchChatResponse";
import { Link } from "react-router-dom";

const Chat = () => {
	const [chat, setChat] = useState([]);
	const mutation = useMutation({
		mutationFn: () => {
			return fetchChatResponse(chat);
		},
		onSuccess: (data) =>
			setChat((prev) => [
				...prev,
				{ sender: "ai", message: data.message.replace(/^\n\n/, "") },
			]),
	});

	const sendMessage = async (message) => {
		await Promise.resolve(setChat((prev) => [...prev, message]));
		mutation.mutate();
	};

	return (
		<div className="app ">
			<div className="flex ">
				<div className=" relative flex flex-col flex-1 m-5 border-slate-300 border-[3px] rounded-md min-w-[900px] max-w-[900px] h-full min-h-[93vh] overflow-y-hidden max-h-[93vh] ">
					<div className="flex flex-col flex-1 h-full overflow-hidden w-full">
						<ChatBody chat={chat} />
					</div>

					<ChatInputForm sendMessage={sendMessage} loading={mutation.loading} />
				</div>
				<>
					<div className="lg:flex absolute right-0 hidden flex-col items-center">
						<div className="bg-gradient-to-tr from-orange-400 to-rose-400 flex  m-5 shadow-lg border-white/40 border-4 text-white text-lg cursor-pointer items-center w-[250px] justify-center h-[120px] rounded-2xl">
							<Link to="../image-generator">Image Generator</Link>
						</div>
						<div className="bg-gradient-to-r from-rose-400 to-orange-300 flex  m-5 shadow-lg border-white/40 border-4 text-white text-lg cursor-pointer items-center w-[250px] justify-center h-[120px] rounded-2xl">
							<Link to="../summarizer">Web Summarizer</Link>
						</div>
						<div className="bg-gradient-to-r from-rose-400 to-orange-300 flex  m-5 shadow-lg border-white/40 border-4 text-white text-lg cursor-pointer items-center w-[250px] justify-center h-[120px] rounded-2xl">
							<Link to="../sql-generator">SQL Generator</Link>
						</div>
					</div>
				</>
			</div>
		</div>
	);
};

export default Chat;
