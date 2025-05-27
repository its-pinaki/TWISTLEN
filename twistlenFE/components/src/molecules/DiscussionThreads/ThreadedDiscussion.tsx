import React, { useState, useReducer } from 'react';
import { View, FlatList, StyleSheet, Text, ListRenderItem, Button } from 'react-native';
import Comment from './Comment';
import { CommentType } from './types';
import CommentInput from './CommentInput'; // Import CommentInput

interface ThreadedDiscussionProps {
  initialComments?: CommentType[];
}

const commentsReducer = (state: CommentType[], action: any): CommentType[] => {
  switch (action.type) {
    case 'ADD_COMMENT':
      return [...state, action.payload];
    case 'ADD_REPLY':
      return addReplyToComment(state, action.payload.commentId, action.payload.reply);
    case 'UPDATE_VOTES':
      return updateCommentVotes(state, action.payload.commentId, action.payload.delta);
    default:
      return state;
  }
};

const addReplyToComment = (comments: CommentType[], commentId: string, newReply: CommentType): CommentType[] => {
  console.log('Adding reply to comments:', comments);
  console.log('Target commentId:', commentId);
  console.log('New reply:', newReply);

  return comments.map(comment => {
    if (comment.id === commentId) {
      console.log('Found target comment:', comment);
      return {
        ...comment,
        replies: [...comment.replies, newReply],
      };
    }
    if (comment.replies?.length > 0) {
      return {
        ...comment,
        replies: addReplyToComment(comment.replies, commentId, newReply),
      };
    }
    return comment;
  });
};

const updateCommentVotes = (comments: CommentType[], commentId: string, delta: number): CommentType[] => {
  return comments.map(comment => {
    if (comment.id === commentId) {
      return {
        ...comment,
        upvotes: comment.upvotes + delta,
      };
    }
    if (comment.replies?.length > 0) {
      return {
        ...comment,
        replies: updateCommentVotes(comment.replies, commentId, delta),
      };
    }
    return comment;
  });
};

const ThreadedDiscussion: React.FC<ThreadedDiscussionProps> = ({ initialComments = [] }) => {
  const [comments, dispatch] = useReducer(commentsReducer, initialComments);
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [currentThread, setCurrentThread] = useState<CommentType | null>(null);

  const addComment = (text: string) => {
    if (!text.trim()) return;
    const newComment: CommentType = {
      id: Date.now().toString(),
      author: 'Current User',
      time: 'Just now',
      text: text,
      upvotes: 0,
      replies: [],
    };
    dispatch({ type: 'ADD_COMMENT', payload: newComment });
  };

  const addReply = (commentId: string, text: string) => {
    if (!text.trim()) return;
    const newReply: CommentType = {
      id: Date.now().toString(),
      author: 'Current User',
      time: 'Just now',
      text: text,
      upvotes: 0,
      replies: [],
    };
    dispatch({ type: 'ADD_REPLY', payload: { commentId, reply: newReply } });
  };

  const handleVote = (commentId: string, delta: number) => {
    dispatch({ type: 'UPDATE_VOTES', payload: { commentId, delta } });
  };

  const renderComment: ListRenderItem<CommentType> = ({ item }) => (
    <Comment
      comment={item}
      onReply={addReply}
      onUpvote={(replyId) => handleVote(replyId, 1)}
      onDownvote={(replyId) => handleVote(replyId, -1)}
      replyingToId={replyingToId}
      setReplyingToId={setReplyingToId}
      setCurrentThread={setCurrentThread}
    />
  );

  return (
    <View style={styles.container}>
      {currentThread ? (
        <View>
          <Button title="Back to Main Thread" onPress={() => setCurrentThread(null)} />
          <FlatList
            data={[currentThread, ...currentThread.replies]}
            keyExtractor={(item) => item.id}
            renderItem={renderComment}
            contentContainerStyle={styles.listContent}
            keyboardShouldPersistTaps="handled"
          />
          <CommentInput
            onSubmit={(text) => {
              console.log('Adding reply to current thread:', currentThread.id);
              addReply(currentThread.id, text);
              setCurrentThread({
                ...currentThread,
                replies: [...currentThread.replies, {
                  id: Date.now().toString(),
                  author: 'Current User',
                  time: 'Just now',
                  text: text,
                  upvotes: 0,
                  replies: [],
                }]
              });
            }}
            placeholder="Add a reply..."
          />
        </View>
      ) : (
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={renderComment}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No comments yet. Be the first to comment!</Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
        />
      )}
      {!replyingToId && !currentThread && (
        <CommentInput
          onSubmit={addComment}
          placeholder="Add a comment..."
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  listContent: {
    padding: 12,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#999',
    textAlign: 'center',
  },
});

export default ThreadedDiscussion;