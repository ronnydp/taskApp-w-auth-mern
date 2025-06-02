import { useNavigate } from "react-router-dom";

function ModalWrapper({ children }) {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-zinc-700 w-[90%] rounded-md max-w-md relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-2 right-2 text-gray-500 cursor-pointer hover:text-gray-300"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}

export default ModalWrapper;
