import type { User } from "@/entities/user";
import { getDateToString, getNumber, getString } from "./formatters";

const mapperUser = (data: Record<string, unknown>): User => {
  return {
    id: getNumber(data.id),
    name: getString(data.name),
    lastName: getString(data.last_name),
    description: getString(data.description),
    cvLink: getString(data.cv_link),
    linkedinLink: getString(data.linkedin_link),
    githubLink: getString(data.github_link),
    socialLinks: Array.isArray(data.social_links)
      ? data.social_links.map((link) => ({
          type: getString(link.type),
          url: getString(link.url),
        }))
      : [],
    authId: getNumber(data.auth_id),
    createdAt: getDateToString(data.created_at),
    updatedAt: getDateToString(data.updated_at),
  };
};

const mapperUserDashboardMetrics = (data: Record<string, unknown>) => {
  return {
    totalPosts: getNumber(data.total_posts),
    totalCollaborations: getNumber(data.total_collaborations),
    totalLikes: getNumber(data.total_likes),
    totalComments: getNumber(data.total_comments),
  };
};

const userToJson = (user: Partial<User>) => ({
  name: user.name,
  last_name: user.lastName,
  description: user.description,
  cv_link: user.cvLink,
  linkedin_link: user.linkedinLink,
  github_link: user.githubLink,
  social_links: user.socialLinks,
});

export { mapperUser, mapperUserDashboardMetrics, userToJson };
