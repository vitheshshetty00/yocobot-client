import { Link } from "react-router-dom";
import { copy, linkIcon, loader, tick } from "../assets";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { fetchSummary } from "../api/fetchSummary";

const Summarizer = () => {
	const [article, setArticle] = useState({
		url: "",
		summary: "",
	});
	const [allArticles, setAllArticles] = useState([]);
	const [copied, setCopied] = useState("");

	useEffect(() => {
		const articlesFromLocalStorage = JSON.parse(
			localStorage.getItem("articles")
		);

		if (articlesFromLocalStorage) {
			setAllArticles(articlesFromLocalStorage);
		}
	}, []);

	const mutation = useMutation({
		mutationFn: () => {
			return fetchSummary(article.url);
		},
		onSuccess: (data) => {
			if (data?.summary) {
        console.log(data.summary);
				const newArticle = { ...article, summary: data.summary };
        console.log(newArticle);
				const updatedAllArticles = [newArticle, ...allArticles];

				
				setArticle(newArticle);
				setAllArticles(updatedAllArticles);
				localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
			}

		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		const existingArticle = allArticles.find(
			(item) => item.url === article.url
		);


		if (existingArticle) return setArticle(existingArticle);
		mutation.mutate();
	};
	const handleCopy = (copyUrl) => {
		setCopied(copyUrl);
		navigator.clipboard.writeText(copyUrl);
		setTimeout(() => setCopied(false), 3000);
	};

	const handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			handleSubmit(e);
		}
	};

	return (
		<div className="app ">
			<div className="w-full flex justify-center items-center flex-col">
				<h1 className="head_text">
					Summarize Articles with <br className="max-md:hidden" />
					<span className="orange_gradient ">OpenAI GPT-4</span>
				</h1>
				<h2 className="desc">
					Simplify your reading with Summize, an open-source article summarizer
					that transforms lengthy articles into clear and concise summaries
				</h2>
				<section className="mt-16 w-full max-w-xl">
					<div className="flex flex-col w-full gap-2">
						<form
							className="relative flex justify-center items-center"
							onSubmit={handleSubmit}
						>
							<img
								src={linkIcon}
								alt="link-icon"
								className="absolute left-0 my-2 ml-3 w-5"
							/>

							<input
								type="url"
								placeholder="Paste the article link"
								value={article.url}
								onChange={(e) =>
									setArticle({ ...article, url: e.target.value })
								}
								onKeyDown={handleKeyDown}
								required
								className="url_input peer" 
							/>
							<button
								type="submit"
								className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 "
							>
								<p>↵</p>
							</button>
						</form>
						<div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
							{allArticles.reverse().map((item, index) => (
								<div
									key={`link-${index}`}
									onClick={() => setArticle(item)}
									className="link_card"
								>
									<div
										className="copy_btn"
										onClick={() => handleCopy(item.url)}
									>
										<img
											src={copied === item.url ? tick : copy}
											alt={copied === item.url ? "tick_icon" : "copy_icon"}
											className="w-[40%] h-[40%] object-contain"
										/>
									</div>
									<p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
										{item.url}
									</p>
								</div>
							))}
						</div>
					</div>
					<div className="my-10 max-w-full flex justify-center items-center">
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
						) : (
							article.summary && (
								<div className="flex flex-col gap-3">
									<h2 className="font-satoshi font-bold text-gray-600 text-xl">
										Article <span className="blue_gradient">Summary</span>
									</h2>
									<div className="summary_box">
										<p className="font-inter font-medium text-sm text-gray-700">
											{article.summary.summary}
										</p>
									</div>
								</div>
							)
						)}
					</div>
				</section>
			</div>
			<>
				<div className="lg:flex absolute right-0 top-2 mx-4  hidden flex-col items-center ">
					<div className="bg-gradient-to-tr from-orange-400 to-rose-400 flex  m-5 shadow-lg border-white/40 border-4 text-white text-lg cursor-pointer items-center w-[250px] justify-center h-[120px] rounded-2xl">
						<Link to="../image-generator">Image Generator</Link>
					</div>
					<div className="bg-gradient-to-r from-rose-400 to-orange-300 flex  m-5 shadow-lg border-white/40 border-4 text-white text-lg cursor-pointer items-center w-[250px] justify-center h-[120px] rounded-2xl">
						<Link to="../chat">Chat Bot</Link>
					</div>
          <div className="bg-gradient-to-r from-rose-400 to-orange-300 flex  m-5 shadow-lg border-white/40 border-4 text-white text-lg cursor-pointer items-center w-[250px] justify-center h-[120px] rounded-2xl">
						<Link to="../sql-generator">SQL Generator</Link>
					</div>
				</div>
			</>
		</div>
	);
};

export default Summarizer;
