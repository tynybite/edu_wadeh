import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "919564400943";

export function WhatsAppButton() {
  const handleClick = () => {
    const message = encodeURIComponent("Hi, I'm interested in learning more about WMCH programs.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20BA5C] transition-all duration-300 hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </button>
  );
}
