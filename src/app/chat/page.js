import ChatBox from "@/components/Chat/Chat";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      
     <Suspense>
       <ChatBox />
     </Suspense>
    </div>
  );
}
