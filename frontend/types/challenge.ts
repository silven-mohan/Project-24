export type ChallengeDifficulty = "Beginner" | "Intermediate" | "Advanced" | "All Levels";
export type ChallengeStatus = "Live" | "Upcoming" | "Weekly" | "Monthly" | "Completed";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: ChallengeDifficulty;
  duration: string;
  participants: number;
  icon?: string;
  accentColor: string;
  glowColor: string;
  gradientColors: [string, string, string];
  tags: string[];
  status: ChallengeStatus;
  hackerRankLink?: string;
  creator_id?: string;
  created_at?: any; // Firestore Timestamp
  updated_at?: any;
}
