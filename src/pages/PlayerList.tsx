import { Link } from 'react-router-dom';
import { Users, UserPlus, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PlayerCard from '@/components/PlayerCard';
import { usePlayer } from '@/context/PlayerContext';
import { useEffect, useState } from 'react';
import PlayerService from '@/service/PlayerService';
import playerCardImg from '../assets/playerCard.jpeg'


const PlayerList = () => {
  const { players, setPlayers } = usePlayer();
  const [isLoading, setIsLoading] = useState(true)
    const [soldCount, setSoldCount] = useState(0);
    const [unSoldCount, setUnSoldCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    
    GetAllPlayers();
  }, []);

  const capitalizeFirst = (str: any) => {
    if (!str) return "";
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  const GetAllPlayers = async () => {
    setPlayers([]);
        setIsLoading(true);
        try {
            let teamId = null;
            console.log("teamId==GetAllPlayers ",teamId)
            let params = {
                offset : 0,
                teamId : teamId
            }
            PlayerService().getAllPlayers(params).then((response:any)=>{
                setIsLoading(false);
                setPlayers(response?.data?.players);
                
                let playerList = response?.data?.players;
                
                setSoldCount(response?.data?.soldPlayerCount);
                setUnSoldCount(response?.data?.unSoldPlayerCount);
                setPendingCount(response?.data?.pendingPlayerCount);
                setIsLoading(false);
            })
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching players:', error);
        }
    };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="gradient-hero text-primary-foreground py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="text-center sm:text-left">
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">
               Monsoon Premier League - Player Roster
              </h1>
              <p className="text-primary-foreground/80 text-sm sm:text-lg">
                {players ? players.length : 0} {players &&players.length === 1 ? 'player' : 'players'} registered for auction
              </p>
            </div>
            {/* <Link to="/register" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-10 sm:h-12 px-4 sm:px-6 text-sm sm:text-base font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-gold">
                <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Register New Player
              </Button>
            </Link> */}
          </div>
        </div>
      </section>

      {/* Player Grid */}
      <section className="container mx-auto px-4 py-6 sm:py-10">

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12 sm:py-20 text-center animate-fade-in">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-muted flex items-center justify-center mb-4 sm:mb-6">
              <Users className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground/50" />
            </div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-foreground mb-2">
              Loading Registered Players...
            </h2>
            <div className="flex justify-center ">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          </div>
        )}

        {!isLoading && players && players.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-20 text-center animate-fade-in">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-muted flex items-center justify-center mb-4 sm:mb-6">
              <Users className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground/50" />
            </div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-foreground mb-2">
              No Players Yet
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6 max-w-md px-4">
              Start building your dream team by registering your first player for the auction.
            </p>
            {/* <Link to="/register">
              <Button className="h-10 sm:h-12 px-6 sm:px-8 text-sm sm:text-base font-semibold gradient-pitch hover:opacity-90">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Register First Player
              </Button>
            </Link> */}
          </div>
        ) : (
          // <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          //   {players && players.map((player) => (
          //     <PlayerCard key={player.id} player={player} />
          //   ))}
          // </div>


      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">

        

  {players && players.map((player) => (
    <div key={player.id} className="relative group">
      
      <img
        src={playerCardImg}
        alt={'img'}
        className="w-full h-full object-cover"
      />


      <div className="absolute top-[36%] left-[8%] text-left text-white font-bold text-lg">
        <img
          src={`https://storage.googleapis.com/rajas_pl/${player.profile_image}`}
          alt="img"
          className="w-[40%] aspect-[1/1.4] object-cover rounded-[4%]"
        />
      </div>

       <div className="absolute top-[63%] left-[48%] w-[52%] text-center text-black font-bold text-[90%] rotate-[27deg]">
        {player.fullname.toUpperCase()}
      </div>

       <div className="absolute top-[69%] left-[55%] text-left text-black font-bold text-[90%] rotate-[27deg]">
        {player.contact_no}
      </div>
      

      <div className="absolute bottom-[19%] left-[45%] text-left text-white font-bold text-[90%]">
        {player.player_role}
      </div>

      <div className="absolute bottom-[14%] left-[45%] text-left text-white font-bold text-[90%]">
        {player.batting_style}
      </div>

      <div className="absolute bottom-[9%] left-[45%] text-left text-white font-bold text-[90%]">
        {player.bowling_style}
      </div>

      <div className="absolute bottom-[4%] left-[45%] text-left text-white font-bold text-[90%]">
        {capitalizeFirst(player?.location)}
      </div>

     

      

      <div className="absolute bottom-[7%] right-[12%] w-[13%] text-center text-white font-bold text-[20px]">
        {player.id}
      </div>


    </div>
  ))}
</div>

        )}
      </section>
    </div>
  );
};

export default PlayerList;
