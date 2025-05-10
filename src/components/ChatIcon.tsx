import { GoogleGenAI } from "@google/genai";
import { useState, useEffect, useRef } from "react";
import { Message } from "../utils/types";
import { SYSTEM_INSTRUCTION } from "../utils";
const KEY = import.meta.env.VITE_API_KEY;
const ai = new GoogleGenAI({ apiKey: KEY });

export default function ChatIcon() {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<Message[]>([
		{ id: 1, text: "Hey! How can I help?", isUser: false },
	]);
	const [inputText, setInputText] = useState("");
	const [isAiResponding, setIsAiResponding] = useState(false);
	const messagesEndRef = useRef<null | HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		if (isOpen) scrollToBottom();
	}, [messages, isOpen]);

	const toggleChat = () => setIsOpen(!isOpen);

	const handleSendMessage = async () => {
		if (!inputText.trim()) return;

		const userMessageId = messages.length + 1;
		const newUserMessage = {
			id: userMessageId,
			text: inputText,
			isUser: true,
		};

		setMessages([...messages, newUserMessage]);
		setInputText("");

		setIsAiResponding(true);
		const loadingMessageId = userMessageId + 1;
		setMessages((prevMessages) => [
			...prevMessages,
			{ id: loadingMessageId, text: "", isUser: false, isLoading: true },
		]);

		try {
			const botReply = await getGeminiResponse(inputText);

			setMessages((prevMessages) =>
				prevMessages
					.filter((msg) => msg.id !== loadingMessageId)
					.concat({
						id: loadingMessageId,
						text:
							botReply ||
							"Sorry, I couldn't generate a response.",
						isUser: false,
					})
			);
		} catch (error) {
			console.error("Gemini API error:", error);

			setMessages((prevMessages) =>
				prevMessages
					.filter((msg) => msg.id !== loadingMessageId)
					.concat({
						id: loadingMessageId,
						text: "Oops! Something went wrong.",
						isUser: false,
					})
			);
		} finally {
			setIsAiResponding(false);
		}
	};

	async function getGeminiResponse(prompt: string): Promise<string | null> {
		try {
			const response = await ai.models.generateContent({
				model: "gemini-2.0-flash",
				contents: prompt,
				config: {
					systemInstruction: SYSTEM_INSTRUCTION,
				  }
			});
			return response.text ?? null;
		} catch (err) {
			console.error("Error calling Gemini API:", err);
			return null;
		}
	}

	const handleKeyPress = (e: { key: string }) => {
		if (e.key === "Enter") handleSendMessage();
	};

	// Simple SVG icons as React components
	const MessageCircleIcon = () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
		</svg>
	);

	const CloseIcon = () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<line x1="18" y1="6" x2="6" y2="18" />
			<line x1="6" y1="6" x2="18" y2="18" />
		</svg>
	);

	const SendIcon = () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<line x1="22" y1="2" x2="11" y2="13" />
			<polygon points="22 2 15 22 11 13 2 9 22 2" />
		</svg>
	);

	const TypingIndicator = () => (
		<div className="flex space-x-1 items-center justify-center h-6 w-12">
			<div
				className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
				style={{ animationDelay: "0ms" }}
			></div>
			<div
				className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
				style={{ animationDelay: "150ms" }}
			></div>
			<div
				className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
				style={{ animationDelay: "300ms" }}
			></div>
		</div>
	);

	return (
		<div className="fixed bottom-4 right-4 z-50">
			{isOpen ? (
				<div className="bg-white rounded-lg shadow-lg flex flex-col w-64 h-80 border border-gray-200">
					<div className="bg-blue-600 text-white p-2 rounded-t-lg flex justify-between items-center">
						<span className="font-medium text-sm">Chat</span>
						<button
							onClick={toggleChat}
							className="text-white hover:bg-blue-700 rounded-full p-1"
						>
							<CloseIcon />
						</button>
					</div>

					<div className="flex-1 p-2 overflow-y-auto custom-scrollbar">
						{messages.map((message) => (
							<div
								key={message.id}
								className={`mb-2 ${
									message.isUser ? "text-right" : "text-left"
								}`}
							>
								<div
									className={`inline-block px-3 py-2 rounded-lg text-sm ${
										message.isUser
											? "bg-blue-500 text-white rounded-br-none"
											: "bg-gray-200 text-gray-800 rounded-bl-none"
									}`}
								>
									{message.isLoading ? (
										<TypingIndicator />
									) : (
										message.text
									)}
								</div>
							</div>
						))}
						<div ref={messagesEndRef} />
					</div>

					<div className="border-t border-gray-200 p-2">
						<div className="flex">
							<input
								type="text"
								value={inputText}
								onChange={(e) => setInputText(e.target.value)}
								onKeyUp={handleKeyPress}
								placeholder="Type a message..."
								className="flex-1 border border-gray-300 rounded-l-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
								disabled={isAiResponding}
							/>
							<button
								onClick={handleSendMessage}
								disabled={isAiResponding || !inputText.trim()}
								className={`${
									isAiResponding || !inputText.trim()
										? "bg-blue-400"
										: "bg-blue-600 hover:bg-blue-700"
								} text-white px-2 py-2 rounded-r-lg flex items-center justify-center`}
							>
								<SendIcon />
							</button>
						</div>
					</div>
				</div>
			) : (
				<button
					onClick={toggleChat}
					className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg flex items-center justify-center"
					aria-label="Open chat"
				>
					<MessageCircleIcon />
				</button>
			)}
		</div>
	);
}
