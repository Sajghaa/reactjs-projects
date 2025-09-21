import { useState } from "react";

const greetings = ["Hello", "Hi", "Hey", "Greetings", "Salutations"];
const emojis = ["👋", "😎", "✨", "🌟", "🔥"]
const colors = ["text-red-500", "text-green-500", "text-blue-500", "text-purple-500", "text-yellow-500"];

const HelloWorld: React.FC = () =>{
    const [name, setName] = useState<string>("World");
    const [greeting, setGreeting] = useState<string>('Helli');
    const [emoji, setEmoji] = useState<string>('👋');
    const [color, setColor]= useState<string>('text-blue-500');

    const handleGreet = () =>{
        alert(`${greeting}, ${name}! ${emoji}`);
    };

    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
          <h1 className={`text-4xl font-bold mb-5 ${color}`}>
            {greeting}, {name}! {emoji}
          </h1>

          <input type="text"
           placeholder="Enter your name"
           value={name}
           onChange={(e) => setName(e.target.value)}
           className="border border-gray-300 rounded p-2 mb-4 w-64 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex space-x-2 mb-4">
            <select 
              value={greeting}
              onChange={(e) => setGreeting(e.target.value)}
              className="p-2 border rounded"
              > 
              {greetings.map((g, i) =>(
                 <option key={i} value={g}>{g}</option>
              ))}        
            </select>

            <select
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            className="p-2 border rounded"
            >
            {emojis.map((e, i) => (
                <option key={i} value={e}>{e}</option>
            ))}
            </select>

            <select
            value={emoji}
            onChange={(e) => setColor(e.target.value)}
            className="p-2 border rounded"
            >
            {colors.map((c, i) => (
                <option key={i} value={c}>{c.replace("text-", "")}</option>
            ))}
            </select>
          </div>

          <button
          onClick={handleGreet}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
          >
            Greet Me!
          </button>
        </div>
    )
};

export default HelloWorld;