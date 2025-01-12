"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter , useSearchParams} from "next/navigation";
import Form from "@components/Form";

const UpdatePrompt = () => {
  const [submitting, setsubmitting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');
  const [post, setpost] = useState({
    prompt: "",
    tag: "",
  });
  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/edit/${promptId}`);
      const data = await response.json();
      setpost({
        prompt: data.prompt,
        tag: data.tag,
      });
    }
    if(promptId) getPromptDetails();
  }, [promptId]);
  const editNewPrompt = async (e) => {
    e.preventDefault(); //to prevent default behavior of the browser when submitting a form to do a reload
    //cause we want least ampunt of reloads as possible
    setsubmitting(true);
    try {
        if(!promptId) return alert('Prompt not found');
      const response = await fetch(`/api/prompt/edit/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user?.id,
        }),
      });
      if(response.ok){
        console.log(response);
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }finally{
      setsubmitting(false);
    }
  };
  return (
    <Form
      type="Edit"
      post={post}
      setpost={setpost}
      submitting={submitting}
      handleSubmit={editNewPrompt}
    />
  );
};

export default UpdatePrompt;

