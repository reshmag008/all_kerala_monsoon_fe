export interface Player {
  id: string;
  fullname: string;
  contact_no: string;
  location: string;
  player_role: string;
  batting_style: string;
  bowling_style: string;
  profile_image: string;
}

export const playerRoles = [
  "Batsman",
  "Bowler",
  "All-Rounder",
  "Wicket-Keeper",
  "WK-Batsman"
] as const;

export const battingStyles = [
  "Right Hand",
  "Left Hand",
  "None"
] as const;

export const bowlingStyles = [
  "Right Hand",
  "Left Hand",
  "None"
] as const;
