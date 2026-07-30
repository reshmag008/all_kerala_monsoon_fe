import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import congratsGif from "../assets/congratulations.gif";

interface Props {
  open: boolean;
  data: any;
  onClose: () => void;
}

const CelebrationPopup: React.FC<Props> = ({ open, data, onClose }) => {
  useEffect(() => {
    if (!open) return;

    // Center blast
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
    });

    // Fireworks
    const duration = 2500;
    const end = Date.now() + duration;

    const firework = () => {
      confetti({
        particleCount: 6,
        angle: 90,
        spread: 30,
        startVelocity: 45,
        gravity: 0.8,
        ticks: 200,
        origin: {
          x: Math.random(),
          y: 1,
        },
      });

      if (Date.now() < end) {
        setTimeout(firework, 250);
      }
    };

    firework();

    // Top blast
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 120,
        origin: { y: 0.2 },
      });
    }, 500);

    const timer = setTimeout(() => {
      onClose();
    }, 8000);

    return () => clearTimeout(timer);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

        <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl animate-[popup_.35s_ease]">

          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 h-4"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 h-9 w-9 rounded-full bg-gray-100 hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center text-lg font-bold"
          >
            ✕
          </button>

          {/* Content */}
          <div className="px-8 py-8 text-center">

            {/* GIF */}
            <img
              src={congratsGif}
              alt="Congratulations"
              className="mx-auto w-72 max-w-full"
            />

            {/* Team */}
            <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">

              <img
                src={`https://storage.googleapis.com/rajas_pl/${data?.team_logo}`}
                alt={data?.team_name}
                className="h-24 w-24 rounded-2xl border-4 border-yellow-400 object-cover shadow-lg"
              />

              <div className="text-center sm:text-left">

                <p className="text-gray-500 uppercase tracking-widest text-sm">
                  Winner
                </p>

                <h2 className="text-4xl font-extrabold text-gray-800">
                  {data?.team_name}
                </h2>

              </div>

            </div>

            {/* Title */}
            <div className="mt-8">

              <h1 className="text-3xl font-black text-yellow-600">
                🏆 Auction Completed 🏆
              </h1>

              <p className="mt-3 text-lg text-gray-600">
                Congratulations!
              </p>

            </div>

            {/* Decorative Badge */}
            <div className="mt-8 flex justify-center">

              <div className="rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 px-8 py-3 text-xl font-bold text-white shadow-lg">
                🎉 🎉
              </div>

            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes popup {
          0% {
            transform: scale(.7);
            opacity: 0;
          }
          70% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        canvas {
          position: fixed !important;
          inset: 0;
          pointer-events: none;
          z-index: 9999 !important;
        }
      `}</style>
    </>
  );
};

export default CelebrationPopup;