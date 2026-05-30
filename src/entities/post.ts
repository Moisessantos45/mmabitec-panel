interface BasePost {
  id: number;
  slug: string;
  title: string;
  banner: string;
  createdAt: string;
}

interface Post extends BasePost {
  content: string;
  authorId: number;
  tags: string[];
  category: string;
  stateId: number;
  updatedAt: string;
}

interface PostInfoBasic extends BasePost {
  content: string;
  author: string;
  tags: string[];
  category: string;
}

interface PostInfoGeneric extends BasePost {
  category: string;
  stateId: number;
}

interface PostInfoDetailed extends BasePost {
  content: string;
  tags: string;
  category: string;
  author: string;
}

interface PostInfoRecent extends BasePost {}

const initialPost: Post = {
  id: -1,
  slug: "",
  title: "",
  content: "",
  banner: "",
  authorId: -1,
  tags: [],
  category: "",
  stateId: 1,
  createdAt: "",
  updatedAt: "",
};

const initialPostInfoGeneric: PostInfoGeneric = {
  id: -1,
  slug: "",
  title: "",
  banner: "",
  category: "",
  stateId: -1,
  createdAt: "",
};

const initialPostInfoDetailed: PostInfoDetailed = {
  id: -1,
  slug: "",
  title: "",
  content: "",
  banner: "",
  tags: "",
  category: "",
  author: "",
  createdAt: "",
};

export {
  type BasePost,
  type Post,
  type PostInfoGeneric,
  type PostInfoDetailed,
  type PostInfoRecent,
  type PostInfoBasic,
  initialPost,
  initialPostInfoGeneric,
  initialPostInfoDetailed,
};
