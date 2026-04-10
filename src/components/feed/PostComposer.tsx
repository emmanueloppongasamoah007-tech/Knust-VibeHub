import React, { useRef, useState } from 'react';
import { Image, Video, Smile, Send } from 'lucide-react';
import { UserAvatar } from '../common/UserAvatar';
import { Button } from '../ui/button';

interface PostComposerProps {
  user: {
    name: string;
    avatar?: string;
  };
  onPost: (data: { content: string; image?: string; video?: string; feeling?: string }) => void;
}

export function PostComposer({ user, onPost }: PostComposerProps) {
  const [content, setContent] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | undefined>(undefined);
  const [videoPreview, setVideoPreview] = useState<string | undefined>(undefined);
  const [feeling, setFeeling] = useState<string | undefined>(undefined);

  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = () => {
    if (!content.trim() && !photoPreview && !videoPreview) return;

    onPost({
      content,
      image: photoPreview,
      video: videoPreview,
      feeling,
    });

    setContent('');
    setPhotoPreview(undefined);
    setVideoPreview(undefined);
    setFeeling(undefined);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6">
      {/* Input Area */}
      <div className="flex gap-3 mb-4">
        <UserAvatar src={user.avatar} name={user.name} size="md" />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-indigo-500 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900 dark:text-gray-100 placeholder-gray-700 dark:placeholder-gray-200 placeholder-opacity-100"
            rows={3}
          />
          {photoPreview && (
            <div className="mt-3">
              <span className="text-xs text-gray-500 dark:text-gray-400">Photo attached</span>
            </div>
          )}
          {videoPreview && (
            <div className="mt-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">Video attached</span>
            </div>
          )}
          {feeling && (
            <div className="mt-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">Feeling {feeling}</span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => photoInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400 transition-colors"
          >
            <Image size={20} className="text-green-500" />
            <span className="text-sm">Photo</span>
          </button>
          <button
            type="button"
            onClick={() => videoInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400 transition-colors"
          >
            <Video size={20} className="text-red-500" />
            <span className="text-sm">Video</span>
          </button>
          <button
            type="button"
            onClick={() => setFeeling((prev) => (prev === '😊' ? undefined : '😊'))}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400 transition-colors"
          >
            <Smile size={20} className="text-yellow-500" />
            <span className="text-sm">Feeling</span>
          </button>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={!content.trim() && !photoPreview && !videoPreview}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl px-6"
        >
          <Send size={18} className="mr-2" />
          Post
        </Button>
      </div>
      <input
        type="file"
        accept="image/*"
        ref={photoInputRef}
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const url = URL.createObjectURL(file);
            setPhotoPreview(url);
          }
        }}
      />
      <input
        type="file"
        accept="video/*"
        ref={videoInputRef}
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const url = URL.createObjectURL(file);
            setVideoPreview(url);
          }
        }}
      />
    </div>
  );
}
