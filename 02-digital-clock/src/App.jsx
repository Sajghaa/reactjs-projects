import { useEffect, useState } from "react"

function App() {
  const [time, setTime] = useState("");

  useEffect(() =>{
    function updateClock(){
      const now = new Date();

      let hrs = String(now.getHours()).padStart(2, "0");
      let mins = String(now.getMinutes()).padStart(2, "0");
      let secs = String(now.getSeconds()).padStart(2, "0");

      setTime(`${hrs}:${mins}:${secs}`);
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval)
  },[])
  return (
    <div className="flex items-center justify-center h-screen bg-black text-green-400 text-6xl font-mono">
     {time}
    </div>
  )
}

export default App