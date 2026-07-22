"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function OAuthButtons({providers}:{providers:{google:boolean;apple:boolean}}){
 const [error,setError]=useState("");
 async function continueWith(provider:"google"|"apple"){setError("");const {error:authError}=await createClient().auth.signInWithOAuth({provider,options:{redirectTo:`${window.location.origin}/auth/callback?next=/dashboard`}});if(authError){console.error("OAuth sign-in failed",authError.code);setError("Social sign-in could not start. Please try again or use email.");}}
 if(!providers.google&&!providers.apple)return null;
 return <div><div className="grid gap-3 sm:grid-cols-2">{providers.google&&<button type="button" onClick={()=>continueWith("google")} className="min-h-11 rounded-xl border border-[#ccd6d1] bg-white px-4 text-sm font-black hover:bg-[#f5f7f4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16725e]">Continue with Google</button>}{providers.apple&&<button type="button" onClick={()=>continueWith("apple")} className="min-h-11 rounded-xl bg-black px-4 text-sm font-black text-white hover:bg-[#242424] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16725e]">Continue with Apple</button>}</div>{error&&<p role="alert" className="mt-3 text-sm font-bold text-[#b44222]">{error}</p>}</div>;
}
