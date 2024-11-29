import { Search, UserCircle2, Plus } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent border-none outline-none ml-2 w-full text-sm"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          </div>
          <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}