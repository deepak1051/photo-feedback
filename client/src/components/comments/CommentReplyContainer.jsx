import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { authContext } from '../../context/authContext';
import axios from 'axios';
import CommentReply from './CommentReply';
import { toast } from 'react-toastify';

export default function CommentReplyContainer({ comment, feedbackId }) {
  const { user } = useContext(authContext);
  const [show, setShow] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: ({ commentId }) => {
      return axios.delete(`/api/comments/${commentId}`);
    },

    onSuccess() {
      queryClient.invalidateQueries(['comments', feedbackId]);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate({ commentId: comment._id });
  };
  return (
    <>
      <div className=" flex  justify-end gap-2">
        {user._id === comment?.user._id && (
          <button
            onClick={handleDelete}
            className="px-1.5 py-0.5 rounded-md text-white text-sm bg-red-500"
          >
            Delete
          </button>
        )}
        <p
          className="text-right cursor-pointer underline"
          onClick={() => setShow((prev) => !prev)}
        >
          Reply
        </p>
      </div>

      {show && (
        <CommentReply
          // id={id}
          comment={comment}
          onCancel={() => setShow(false)}
        />
      )}
    </>
  );
}
