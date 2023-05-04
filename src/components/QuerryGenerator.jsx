import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { fetchQuerry } from "../api/fetchQuerry";
import { copy, loader, tick } from "../assets";

const QuerryGenerator = () => {
	const [querry, setQuerry] = useState({
		description: "",
		res: "",
	});

	const [allQuerries, setAllQuerries] = useState([]);
	const [copied, setCopied] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();

		const existingQuerry = allQuerries.find(
			(item) => item.des === querry.description
		);

		if (existingQuerry) return setQuerry(existingQuerry);
		mutation.mutate();
	};
	useEffect(() => {
		const articlesFromLocalStorage = JSON.parse(
			localStorage.getItem("querries")
		);

		if (articlesFromLocalStorage) {
			setAllQuerries(articlesFromLocalStorage);
		}
	}, []);
	const mutation = useMutation({
		mutationFn: () => {
			return fetchQuerry(querry.description);
		},
		onSuccess: (data) => {
			if (data?.message) {
				console.log(data.message);
				const newQuerry = { ...querry, res: data.message };
				console.log(newQuerry);
				const updatedAllQuerries = [newQuerry, ...allQuerries];

				setQuerry(newQuerry);
				setAllQuerries(updatedAllQuerries);
				localStorage.setItem("articles", JSON.stringify(updatedAllQuerries));
			}
		},
	});
    const handleCopy = (result) => {
		setCopied(result);
		navigator.clipboard.writeText(result);
		setTimeout(() => setCopied(false), 3000);
	};

	const handleKeyDown = (e) => {
		if (e.keyCode === 13 && e.shiftKey === false) {
			handleSubmit(e);
		}
	};

	return (
		<div className="app ">
			<div className="w-full flex justify-center items-center flex-col">
				<h1 className="head_text">
					Generate Qurries <br className="max-md:hidden" />
					<span className="orange_gradient "> with OpenAI </span>
				</h1>
				<h2 className="desc">
					all you have to do is provide a simple and concise description of the
					data you want to retrieve, and our AI algorithm will generate the SQL
					query for you in seconds.
				</h2>
				<div className=" w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient  dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient pt-2">
					<form
						onSubmit={handleSubmit}
						className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-xl xl:max-w-xl"
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
									placeholder="Describe your query"
									value={querry.description}
									onChange={(e) => {
										setQuerry({ ...querry, description: e.target.value });
										e.target.style.height = "auto";
										e.target.style.height = e.target.scrollHeight + "px";
									}}
								></textarea>
								<button
									type="submit"
									className="
                                 p-2 rounded-md text-black/80 bg-green-600   md:bottom-2.5 hover:bg-green-300 enabled:dark:hover:text-black dark:hover:bg-green-700 disabled:hover:bg-green-400 dark:disabled:hover:bg-green-300  md:right-2 disabled:opacity-40"
									disabled={!querry.description}
								>
									Generate
								</button>
							</>
							{/* )} */}
						</div>
					</form>
				</div>
				<>
					<div className="lg:flex absolute right-0 top-2 mx-4  hidden flex-col items-center">
						<div className="bg-gradient-to-tr from-orange-400 to-rose-400 flex  m-5 shadow-lg border-white/40 border-4 text-white text-lg cursor-pointer items-center w-[250px] justify-center h-[120px] rounded-2xl">
							<Link to="../image-generator">Image Generator</Link>
						</div>
						<div className="bg-gradient-to-r from-rose-400 to-orange-300 flex  m-5 shadow-lg border-white/40 border-4 text-white text-lg cursor-pointer items-center w-[250px] justify-center h-[120px] rounded-2xl">
							<Link to="../summarizer">Web Summarizer</Link>
						</div>
						<div className="bg-gradient-to-r from-rose-400 to-orange-300 flex  m-5 shadow-lg border-white/40 border-4 text-white text-lg cursor-pointer items-center w-[250px] justify-center h-[120px] rounded-2xl">
							<Link to="../chat">Chat</Link>
						</div>
					</div>
				</>
				<div className="my-10 max-w-full w-[576px] flex justify-center items-center">
					{mutation.isLoading ? (
						<img
							src={loader}
							alt="loader"
							className="w-20 h-20 object-contain"
						/>
					) : mutation.isError ? (
						<p className="font-inter font-bold text-black text-center">
							Well, that wasnt supposed to happen...
							<br />
							<span className="font-satoshi font-normal text-gray-700">
								{mutation.error}
							</span>
						</p>
					) : ( querry.res &&
						<pre className="max-w-xl w-[560px] mx-auto">
							<div className="bg-black rounded-md mx-auto mb-4 w-full max-w-xl">
								<div className="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md">
									<span>SQL</span>
									<div
										className="copy_btn"
										onClick={() => handleCopy(querry.res)}
									>
										<img
											src={copied === querry.res ? tick : copy}
											alt={copied === querry.res ? "tick_icon" : "copy_icon"}
											className="w-[40%] h-[40%] object-contain"
										/>
									</div>
								</div>
								<div className="p-1 w-full px-2">
									<code className="break-words w-full whitespace-pre-wrap text-white">{querry.res}</code>
								</div>
							</div>
						</pre>
					)}
				</div>
			</div>
		</div>
	);
};

export default QuerryGenerator;
