import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CommentType } from './types';
import CommentInput from './CommentInput'; // Import CommentInput

interface CommentProps {
  comment: CommentType;
  onReply: (commentId: string, text: string) => void;
  onUpvote: (commentId: string) => void;
  onDownvote: (commentId: string) => void;
  replyingToId: string | null;
  setReplyingToId: (id: string | null) => void;
  setCurrentThread: (comment: CommentType | null) => void;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  onReply,
  onUpvote,
  onDownvote,
  replyingToId,
  setReplyingToId,
  setCurrentThread,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleReply = () => {
    setReplyingToId(comment.id);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navigateToReplyThread = () => {
    setCurrentThread(comment);
  };

  return (
    <View style={styles.commentContainer}>
      <Text style={styles.author}>{comment.author}</Text>
      <Text style={styles.time}>{comment.time}</Text>
      <Text style={styles.text}>{comment.text}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onUpvote(comment.id)}>
          <Text style={styles.actionText}>Upvote ({comment.upvotes})</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDownvote(comment.id)}>
          <Text style={styles.actionText}>Downvote</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReply}>
          <Text style={styles.actionText}>Reply</Text>
        </TouchableOpacity>
        {comment.replies.length > 0 && (
          <TouchableOpacity onPress={toggleCollapse}>
            <Text style={styles.actionText}>{isCollapsed ? 'Expand' : 'Collapse'} Replies ({comment.replies.length})</Text>
          </TouchableOpacity>
        )}
        {/* <TouchableOpacity onPress={navigateToReplyThread}>
          <Text style={styles.actionText}>View Thread</Text>
        </TouchableOpacity> */}
      </View>
      {replyingToId === comment.id && (
        <CommentInput
          onSubmit={(text) => {
            onReply(comment.id, text);
            setReplyingToId(null);
          }}
          placeholder="Add a reply..."
        />
      )}
      {!isCollapsed && comment.replies.length > 0 && (
        <View style={styles.repliesContainer}>
          {comment.replies.map(reply => (
            <Comment
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onUpvote={onUpvote}
              onDownvote={onDownvote}
              replyingToId={replyingToId}
              setReplyingToId={setReplyingToId}
              setCurrentThread={setCurrentThread}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  author: {
    fontWeight: 'bold',
  },
  time: {
    color: '#999',
  },
  text: {
    marginVertical: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionText: {
    color: '#2196F3',
  },
  repliesContainer: {
    paddingLeft: 20,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#eee',
  },
});

export default Comment;