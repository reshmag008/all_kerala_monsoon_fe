import React, {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { BACKEND_URL, TOTAL_PLAYER, roomId } from "../constants";
import playerSvg from "../assets/account-icon.png";
import bellGif from '../assets/bell.gif';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import congratsJif from '../assets/congratulations.gif';
import clapJif from '../assets/clap.gif'
import playerBg from '../assets/player_display.jpeg'
import TeamTable from "./TeamTable";
import CelebrationPopup from "./celebrationPopup";
import PlayerService from "@/service/PlayerService";
import { Trophy, Users, UserX } from "lucide-react";


const PlayerDisplay: React.FC = () => {
  const [socket, setSocket] = useState<any>(null);
  const [currentBidPlayer, setCurrentPlayer] = useState<any>({});
  const [currentCall, setCurrentCall] = useState<any>({});
  const [soldPlayer, setSoldPlayer] = useState<any>({});
  const [allSoldPlayers, setAllSoldPlayer] = useState<any>([])
  const [popUpContent, setPopUpContent] = useState<any>({})
  const [openPopUp, setOpenPopUp] = useState(false);
  const [allTeams, setAllTeams] = useState<any>([])
    const [showTeams, setShowTeam] = useState(false);

      const [soldCount, setSoldCount] = useState(0);
    const [unSoldCount, setUnSoldCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);

  const isMobile = window.matchMedia("(max-width: 600px)").matches;
  const [player, setPlayer] = useState<any | null>(null);
  


useEffect(() => {
  const loadPlayer = () => {
    const data = localStorage.getItem("selectedPlayer");
    const teamComp: any = JSON.parse(localStorage.getItem("team_complete") || "{}");
    let close_popup = localStorage.getItem('close_popup');
    console.log("close_popup= ", close_popup)
    if(close_popup == 'true'){
      setOpenPopUp(false);
      setPopUpContent(null);
    }
    if(teamComp?.id) {
      setOpenPopUp(true);
      setPopUpContent(teamComp);
    }
    console.log("teamComp== ", teamComp)
    GetAllTeams();
    GetAllPlayers();
    getSoldPlayers();
    if (!data || data === "undefined") {
      setPlayer(null);
      return;
    }
     
    try {
      setPlayer(JSON.parse(data));
      setCurrentPlayer(JSON.parse(data))
    } catch {
      setPlayer(null);
    }
  };

  // Load initially
  loadPlayer();

  // Listen for changes
  window.addEventListener("storage", loadPlayer);

  return () => {
    window.removeEventListener("storage", loadPlayer);
  };
}, []);


  const GetAllTeams = () => {
    try {
      PlayerService()
        .getAllTeams()
        .then((response: any) => {
          setAllTeams(response?.data);
          setShowTeam(true);
        });
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };



    const GetAllPlayers = async () => {
          try {
              let teamId = null;
              console.log("teamId==GetAllPlayers ",teamId)
              let params = {
                  offset : 0,
                  teamId : teamId
              }
              PlayerService().getAllPlayers(params).then((response:any)=>{
                  
                  let playerList = response?.data?.players;
                  
                  setSoldCount(response?.data?.soldPlayerCount);
                  setUnSoldCount(response?.data?.unSoldPlayerCount);
                  setPendingCount(response?.data?.pendingPlayerCount);
              })
          } catch (error) {
              console.error('Error fetching players:', error);
          }
      };

   const capitalizeFirst = (str: any) => {
    if (!str) return "";
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  }



  const getSoldPlayers = () =>{

    PlayerService().getSoldPlayers().then((response:any)=>{
        setAllSoldPlayer(response?.data?.players);
    })
  }


  return (
    <div
      className="h-screen bg-slate-950 text-white flex flex-col overflow-hidden"
    >

      {openPopUp && 
      <CelebrationPopup
          open={openPopUp}
          data={popUpContent}
          onClose={() => setOpenPopUp(false)}
        />
      }
      {/* ================= HEADER ================= */}

      <header className="flex-shrink-0 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 border-b border-slate-700">


        <div className="grid grid-cols-3 gap-3 md:gap-5 px-4 md:px-6 pb-4">

          <div className="bg-white/10 rounded-xl p-3 md:p-5 text-center">
            <Users className="mx-auto text-yellow-400" />
            <p className="text-xs md:text-base mt-2">
              Sold
            </p>
            <p className="text-2xl md:text-4xl font-bold">
              {soldCount}
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-3 md:p-5 text-center">
            <Trophy className="mx-auto text-green-400" />
            <p className="text-xs md:text-base mt-2">
              Pending
            </p>
            <p className="text-2xl md:text-4xl font-bold">
              {pendingCount}
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-3 md:p-5 text-center">
            <UserX className="mx-auto text-red-400" />
            <p className="text-xs md:text-base mt-2">
              Unsold
            </p>
            <p className="text-2xl md:text-4xl font-bold">
              {unSoldCount}
            </p>
          </div>

        </div>
      </header>

      {/* ================= BODY ================= */}

      <main className="flex-1 overflow-hidden">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 h-full p-5">

          {/* ================= PLAYER PROFILE ================= */}

          <section className="order-1 lg:order-2 lg:col-span-3 bg-slate-900 rounded-xl p-5 overflow-auto">

            <div className="grid md:grid-cols-3 gap-8 items-center h-full">

              <div className="flex justify-center">

                <img
                  src={`https://storage.googleapis.com/rajas_pl/${currentBidPlayer.profile_image}`}
                  alt={currentBidPlayer.fullname}
                  className="rounded-xl w-full max-w-sm shadow-2xl"
                />

              </div>

              <div className="md:col-span-2">

                <h1 className="text-3xl md:text-6xl font-bold text-yellow-400">
                  {currentBidPlayer.fullname}
                </h1>

                <p className="text-lg md:text-2xl text-gray-400 mt-2 mb-8">
                  Player ID : {currentBidPlayer.id}
                </p>

                <div className="grid grid-cols-2 gap-y-5 text-lg md:text-3xl">

                  <span className="text-gray-400">
                    Role
                  </span>
                  <span>{currentBidPlayer.player_role}</span>

                  <span className="text-gray-400">
                    Batting
                  </span>
                  <span>{currentBidPlayer.batting_style}</span>

                  <span className="text-gray-400">
                    Bowling
                  </span>
                  <span>{currentBidPlayer.bowling_style}</span>

                  <span className="text-gray-400">
                    Location
                  </span>
                  <span>{currentBidPlayer.location}</span>

                  <span className="text-gray-400">
                    Contact
                  </span>

                  <span className="text-green-400 font-bold">
                    {currentBidPlayer.contact_no}
                  </span>

                </div>

              </div>

            </div>

          </section>

          {/* ================= TEAM LIST ================= */}
          {/* Hidden on mobile, visible from lg upwards */}

          <aside className="hidden lg:flex order-2 lg:order-1 lg:col-span-1 bg-slate-900 rounded-xl flex-col overflow-hidden">

            

            <div className="flex-1 overflow-y-auto p-3 space-y-3">

              {allTeams.map((team) => (
                <div
                  key={team.id}
                  className="bg-slate-800 hover:bg-blue-700 transition rounded-lg p-4 cursor-pointer"
                >
                  <div className="flex justify-between items-center">

                    <span className="font-medium">
                      {team.team_name} - ({team.player_count})
                    </span>

                    <span className="font-bold text-yellow-400">
                      {team.max_bid_amount}/{team.total_points}
                    </span>

                  </div>
                </div>
              ))}

            </div>

          </aside>

        </div>

      </main>
    </div>
  );
}

export default PlayerDisplay;