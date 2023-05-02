/* eslint-disable react/prop-types */
// import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef } from "react";

// eslint-disable-next-line react/prop-types
const ImageChatBody = ({ imageChat }) => {
	const parent = useRef(null);
	const bottomRef = useRef(null);

	// only for aut animations
	// useEffect(() => {
	// 	parent.current && autoAnimate(parent.current);
	// }, [parent]);

	//for scrolling bottom
	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [imageChat]);
	const aiStyle =
		" mr-auto";

    
	return (
		<div className="m-4 h-full overflow-auto scrollbar-thumb-slate-400 scrollbar-thin scrollbar-track-gray-tranparent scrollbar-thumb-rounded-md ">
			<div className="flex flex-col gap-4  " ref={parent}>
				{imageChat.map((message, i) => {
					return message.sender === "ai" ? (
						<div
							key={i}
							className={`rounded-xl self-end px-3 py-3 max-w-[80%] ${aiStyle}`}
						>
							<img src={message.message} alt="image" className="rounded-xl backdrop-blur-lg dropshadow-md w-[70%] h-[70%]" />
						</div>
					) : (
						<div
							key={i}
							className={`border-[#999999] break-words border-2 rounded-xl self-end px-3 py-3 max-w-[80%] 
							`}
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

export default ImageChatBody;
