import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

export default function CreateComment({ feedbackId }) {
  const [text, setText] = useState('');

  const queryClient = useQueryClient();

  const commentMutation = useMutation({
    mutationFn: (data) =>
      axios.post(`/api/comments/${feedbackId}`, data).then((res) => res.data),
    onSuccess: () => {
      setText('');
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
    onError(err) {
      console.log(err);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    commentMutation.mutate({ text, feedback: feedbackId });
  };
  return (
    <div className="py-4">
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
          className="p-2 border border-black w-full"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="p-2 bg-teal-500 text-white text-xl" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
