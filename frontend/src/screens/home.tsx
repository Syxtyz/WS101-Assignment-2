interface HomeProps {
  onLogout?: () => void;
}

function Home({ onLogout }: HomeProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-center text-2xl font-bold text-black mb-6">Home Page<br/>Hi, I am Cejie Refamonte. Your student  for WS101, Saturday 1-5 PM</h1>
        <button
          onClick={onLogout}
            className="w-full text-black py-2 rounded-lg border hover:bg-neutral-200 transition disabled:opacity-50"
        >
          Logout
        </button>
    </div>
  );
}

export default Home;
