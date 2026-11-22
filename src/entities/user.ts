interface User {
  id: number;
  name: string;
  lastName: string;
  cvLink: string;
  linkedinLink: string;
  githubLink: string;
  socialLinks: {
    type: string;
    url: string;
  }[];
  description: string;
  authId: number;
  createdAt: string;
  updatedAt: string;
}

interface UserDashboardMetrics {
  totalPosts: number;
  totalCollaborations: number;
  totalLikes: number;
  totalComments: number;
}

interface UserBasicInfo {
  userId: number;
  avatar: string;
}

const initialUserState: User = {
  id: -1,
  name: "",
  lastName: "",
  cvLink: "",
  linkedinLink: "",
  githubLink: "",
  socialLinks: [],
  description: "",
  authId: -1,
  createdAt: "",
  updatedAt: "",
};

const initialUserDashboardMetrics: UserDashboardMetrics = {
  totalPosts: 0,
  totalCollaborations: 0,
  totalLikes: 0,
  totalComments: 0,
};

export {
  type User,
  type UserDashboardMetrics,
  type UserBasicInfo,
  initialUserState,
  initialUserDashboardMetrics,
};
