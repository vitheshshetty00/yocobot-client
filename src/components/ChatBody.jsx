/* eslint-disable react/prop-types */
import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef } from "react";

const ChatBody = ({ chat }) => {
	const parent = useRef(null);
	const bottomRef = useRef(null);

	// only for aut animations
	useEffect(() => {
		parent.current && autoAnimate(parent.current);
	}, [parent]);

	//for scrolling bottom
	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [chat]);
	const aiStyle =
		"bg-gray-300 bg-opacity-40 backdrop-blur-lg dropshadow-md mr-auto";
	return (
		<div className="m-4 h-full overflow-auto scrollbar-thumb-slate-400 scrollbar-thin scrollbar-track-gray-tranparent scrollbar-thumb-rounded-md ">
			<div className="flex flex-col gap-4  " ref={parent}>
				{chat.map((message, i) => {
					return (
						<div
							key={i}
							className={`border-[#999999] break-words border-2 rounded-xl self-end px-3 py-3 max-w-[80%] ${
								message.sender === "ai" && aiStyle
							}`}
						>
							<pre className="whitespace-pre-wrap">
								<span>{message.message}</span>
							</pre>
						</div>
					);
				})}

				<div ref={bottomRef} className="h-3"></div>
			</div>
		</div>
	);
};

export default ChatBody;
