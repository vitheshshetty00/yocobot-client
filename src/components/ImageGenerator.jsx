import { Link } from "react-router-dom"
import ImagePromptInput from "./ImagePromptInput"
import { useState } from "react";
import { fetchImage } from "../api/fetchImage";
import { useMutation } from "react-query";
import ImageChatBody from "./ImageChatBody";


const ImageGenerator = () => {
  const [inputPrompt, setInputPrompt] = useState("");
  const [imagechat, setImageChat] = useState([]);
	const mutation = useMutation({
		mutationFn: () => {
			return fetchImage(inputPrompt);
		},
		onSuccess: (data) =>
			setImageChat((prev) => [
				...prev,
				{ sender: "ai", message: data.url },
			]),
	});

	const generate = async (userInput) => {
		await Promise.resolve(setImageChat((prev) => [...prev, userInput]));  
		mutation.mutate();
    setInputPrompt("");
	};
  return (
    <div className="app ">
    <div className="flex ">
      <div className=" relative flex flex-col flex-1 m-5 border-slate-300 border-[3px] rounded-md min-w-[900px] max-w-[900px] h-full min-h-[93vh] overflow-y-hidden max-h-[93vh] ">
        <div className="flex flex-col flex-1 h-full overflow-hidden w-full">
            <ImageChatBody imageChat={imagechat} />
        </div>
        <ImagePromptInput inputPrompt={inputPrompt} setInputPrompt={setInputPrompt} generate={generate} />
        
      </div>
      <>
        <div className="lg:flex absolute right-0 hidden flex-col items-center">
          <div className="bg-gradient-to-tr from-orange-400 to-rose-400 flex  m-5 shadow-lg border-white/40 border-4 text-white text-lg cursor-pointer items-center w-[250px] justify-center h-[120px] rounded-2xl">
            <Link to="../">Chat Bot</Link>
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
  )
}

export default ImageGenerator