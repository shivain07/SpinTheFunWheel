import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import ssound from "./sound/spin.mp3"
import Confetti from "react-confetti";
function App() {
    const [choices, setChoices] = useState([]);
    const [input, setInput] = useState("");
    const [selectedChoice, setSelectedChoice] = useState("");
    const [isSpinning, setIsSpinning] = useState(false);
    const spinSoundRef = useRef(new Audio(ssound));
    const [showConfitti, setShowConfitti] = useState(false);
    const handleAddChoice = () => {
        if (input.trim() !== "") {
            setChoices((prev) => [...prev, input]);
            setInput("");
        }
    };

    const handleSpin = () => {
        if (choices.length === 0) {
            alert("Please add some choices first!");
            return;
        }
        spinSoundRef.current.play();
        setIsSpinning(true);
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * choices.length);
            setSelectedChoice(choices[randomIndex]);
            setIsSpinning(false);
            setShowConfitti(true);
            spinSoundRef.current.pause();
            spinSoundRef.current.currentTime = 0;
        }, 2000); // Spin for 2 seconds
    };

    useEffect(() => {
        if (showConfitti) {

            setTimeout(() => {
                setShowConfitti(false);
            }, 5000); // Spin for 2 seconds
        }
    }, [showConfitti]);

    const emoji = (index) => {

        return index % 2 == 0 ? <span>&#128540; </span> : <span>&#128541; </span>
    }

    return (
        <div className="App text-center bg-slate-300 h-lvh">
            {showConfitti && <Confetti />}
            <div className="bg-purple-700 p-4">
                <h1 className="text-white text-3xl font-bold ">Spin the Wheel</h1>
                <div className="input-section mt-4">
                    <input
                        className="rounded"
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter a choice"
                    />
                    <button onClick={handleAddChoice}
                        className="rounded border-cyan-50 border-2 text-white hover:text-purple-800  hover:bg-slate-50">Add</button>
                    <button onClick={()=>{
                        window.location.reload();
                    }}
                        className="rounded border-red-100 border-2 mx-2 text-red-200 hover:text-red-800  hover:bg-red-300">Refresh</button>
                </div>
            </div>
            <div className="choices mt-3">
                <h1 className="text-black text-3xl font-bold ">Choices</h1>
                <ul className="grid grid-cols-4 gap-4">
                    {choices.map((choice, index) => (
                        <li className="text-2xl font-bold m-2 text-purple-500 bg-slate-100 p-2 rounded-md text-center" key={index}>
                            {emoji(index)} {choice}</li>
                    ))}
                </ul>
            </div>
            <div className="wheel-container">
                <div className={`wheel ${isSpinning ? "spinning" : ""}`}>
                    {/* {selectedChoice || "Spin to Select"} */}
                    {isSpinning ? "Lets see what u get" : (selectedChoice || "Spin to Select")}
                </div>
                <button onClick={handleSpin} disabled={isSpinning}
                    className="rounded text-purple-600 bg-purple-600 text-slate-200 hover:scale-125">
                    {isSpinning ? "Spinning..." : "Spin"}
                </button>
            </div>
        </div>
    );
}

export default App;
