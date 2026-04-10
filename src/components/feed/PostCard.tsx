import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Bookmark } from 'lucide-react';
import { UserAvatar } from '../common/UserAvatar';

export interface Post {
  id: string;
  author: {
    name: string;
    avatar?: string;
    subtitle?: string;
  };
  content: string;
  image?: string;
  video?: string;
  feeling?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  liked?: boolean;
  saved?: boolean;
}

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
  onSave: (postId: string) => void;
}

export function PostCard({ post, onLike, onComment, onShare, onSave }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
      {/* Post Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <UserAvatar src={post.author.avatar} name={post.author.name} size="md" />
            <div>
              <h4 className="text-gray-800 dark:text-gray-100">{post.author.name}</h4>
              {post.author.subtitle && (
                <p className="text-sm text-gray-500 dark:text-gray-400">{post.author.subtitle}</p>
              )}
              <p className="text-xs text-gray-400 dark:text-gray-500">{post.timestamp}</p>
            </div>
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Post Content */}
        <p className="text-gray-700 dark:text-gray-300 mb-2">{post.content}</p>
        {post.feeling && (
          <p className="text-sm text-indigo-600 dark:text-indigo-300 mb-2">Feeling {post.feeling}</p>
        )}
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="w-full">
          <img src={post.image} alt="Post content" className="w-full object-cover max-h-96" />
        </div>
      )}

      {/* Post Video */}
      {post.video && (
        <div className="w-full bg-black">
          <video src={post.video} controls className="w-full max-h-96" />
        </div>
      )}

      {/* Engagement Stats */}
      <div className="px-6 py-3 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <span>{post.likes} likes</span>
          <span>{post.comments} comments</span>
        </div>
        <span>{post.shares} shares</span>
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-3 flex items-center justify-around border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => onLike(post.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors ${
            post.liked ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          <Heart size={20} fill={post.liked ? 'currentColor' : 'none'} />
          <span>Like</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400 transition-colors"
        >
          <MessageCircle size={20} />
          <span>Comment</span>
        </button>
        <button
          onClick={() => {
            const target = window.prompt('Share to (e.g. Instagram, friend name, etc.):');
            if (target && target.trim()) {
              onShare(post.id);
            }
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400 transition-colors"
        >
          <Share2 size={20} />
          <span>Share</span>
        </button>
        <button
          onClick={() => onSave(post.id)}
          className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors ${
            post.saved
              ? 'text-yellow-400 bg-yellow-50 dark:bg-yellow-500/20'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          <Bookmark size={20} fill={post.saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/30">
          <div className="flex gap-3">
            <UserAvatar src={undefined} name="You" size="sm" />
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={() => {
                  if (commentText.trim()) {
                    onComment(post.id);
                    setCommentText('');
                  }
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
