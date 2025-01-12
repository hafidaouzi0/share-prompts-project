"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePrompt = () => {
  const [submitting, setsubmitting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const [post, setpost] = useState({
    prompt: "",
    tag: "",
  });
  const createNewPrompt = async (e) => {
    e.preventDefault(); //to prevent default behavior of the browser when submitting a form to do a reload
    //cause we want least ampunt of reloads as possible
    setsubmitting(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
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
      type="Create"
      post={post}
      setpost={setpost}
      submitting={submitting}
      handleSubmit={createNewPrompt}
    />
  );
};

export default CreatePrompt;
