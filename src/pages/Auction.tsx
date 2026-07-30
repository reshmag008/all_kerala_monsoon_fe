
const player = {};

const LiveAuctionPlayerCard = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Background Image */}
      <img
         src={`https://storage.googleapis.com/rajas_pl/${player.profile_image}`}
        alt={player.fullname}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-between px-12 py-10">
        {/* Left Side - Player Image */}
        <div className="w-[40%] flex justify-center">
          <img
            src={`https://storage.googleapis.com/rajas_pl/${player.profile_image}`}
            alt={player.fullname}
            className="h-[80vh] object-contain drop-shadow-2xl"
          />
        </div>

        {/* Right Side - Player Details */}
        <div className="w-[55%] text-white">
          <div className="mb-8">
            <p className="text-2xl text-yellow-400 font-semibold">
              PLAYER #{player.id}
            </p>

            <h1 className="text-7xl font-extrabold uppercase leading-tight">
              {player.fullname}
            </h1>

            <div className="mt-4 inline-block bg-yellow-500 text-black px-6 py-2 rounded-full text-3xl font-bold">
              {player.player_role}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 text-3xl">
            <div>
              <p className="text-gray-300">Batting Style</p>
              <p className="font-bold">{player.batting_style}</p>
            </div>

            <div>
              <p className="text-gray-300">Bowling Style</p>
              <p className="font-bold">{player.bowling_style}</p>
            </div>

            <div>
              <p className="text-gray-300">Location</p>
              <p className="font-bold">{player.location}</p>
            </div>

            <div>
              <p className="text-gray-300">Phone Number</p>
              <p className="font-bold">{player.contact_no}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveAuctionPlayerCard;