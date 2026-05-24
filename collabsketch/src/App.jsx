import InfiniteCanvas from './components/InfiniteCanvas';

function App() {
  return (
    <div className="relative">
      <InfiniteCanvas />
      {/* Simple toolbar */}
      <div className="fixed bottom-4 left-4 bg-white shadow rounded-lg p-2 flex gap-2">
        <button className="px-3 py-1 bg-black text-white rounded">Pen</button>
        <button className="px-3 py-1 bg-gray-200 rounded">Rect</button>
      </div>
    </div>
  );
}

export default App;