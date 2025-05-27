import { TextInputProps } from "react-native";

export interface CommentType {
    id: string;
    author: string;
    time: string;
    text: string;
    upvotes: number;
    replies: CommentType[];
  }
 
  export interface CommentProps {
    comment: CommentType;
    depth?: number;
    onReply: (commentId: string) => void;
    onUpvote: (commentId: string, delta: number) => void;
    onDownvote: (commentId: string, delta: number) => void;
    isCollapsed?: boolean;
  }
 
  export interface CommentInputProps {
    onSubmit: (text: string) => void;
    placeholder?: string;
    inputProps?: TextInputProps;
  }
 
  export interface ThreadedDiscussionProps {
    initialComments?: CommentType[];
  }