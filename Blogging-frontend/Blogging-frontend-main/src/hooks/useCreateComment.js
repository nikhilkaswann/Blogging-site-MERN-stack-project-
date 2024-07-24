

import React from 'react'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const createCommentApi = async (values) => {
    console.log("creteArticle", { values });

    const { data } = await axios.post(
        `http://localhost:3001/api/articles/${values.slug}/comments`,
        { ...values.values }
      );

      console.log("createCommentApi", { data });

    return data;
  };

export default function useCreateComment() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();


  const { mutate: createComment, isLoading: isCreatingComment } = useMutation({
    mutationFn: createCommentApi,
    onSuccess: () => {
      alert("New comment successfully created");
      queryClient.invalidateQueries({ queryKey: ["articleComments"] });
      navigate('/');
    },
    onError: (err) => alert(err.message),
  });

  return { isCreatingComment, createComment };
}
