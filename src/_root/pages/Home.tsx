import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import UserCard from "@/components/shared/UserCard";
import { UseGetPosts, useGetRecentPosts, useGetUsers } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const { ref, inView }= useInView();
  const {fetchNextPage, hasNextPage }=UseGetPosts();
 const { data: posts,isPending: isPostLoading,isError:isErrorPosts }=useGetRecentPosts();
 const {
  data: creators,
  isLoading: isUserLoading,
  isError: isErrorCreators,
} = useGetUsers(10);
  
 useEffect(() => {
  if (inView) {
    fetchNextPage();
  }
}, [inView]);

if (isErrorPosts || isErrorCreators) {
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <p className="body-medium text-light-1">Something bad happened</p>
      </div>
      <div className="home-creators">
        <p className="body-medium text-light-1">Something bad happened</p>
      </div>
    </div>
  );
}

 if(!posts) {
  return (
   <div className="flex-center w-full h-full">
   <Loader/>
   </div> 
  )
 }



 return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">

         <h2 className="h3-bold md:h2-bold text-left w-full">

         Home Feed
         </h2>
         {isPostLoading && !posts ? (
           <Loader/>
         ):(
          <ul className="flex flex-col flex-1 gap-9 w-full">

             {posts?.documents.map((post: Models.Document) => (
               <PostCard post={post} key={post.caption}/>
             ))}
          </ul>
        )}

        </div>

      </div>

    

<div className="home-creators">
        <h3 className="h3-bold text-light-1">Top Creators</h3>
        {isUserLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {hasNextPage && (
 <div ref={ref} className="mt-10">
  <Loader/>
  </div>
)}
      

    </div>
  )
}

export default Home