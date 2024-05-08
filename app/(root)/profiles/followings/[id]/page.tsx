import MaxWidthWrapper from "@/components/shared/MaxWithWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ParamsProps } from "@/types";
import FollowingTab from "./FollowingsTab";
import FollowersTab from "./FollwersTab";

export default async function FollowingPage({ params }: ParamsProps) {
  return (
    <MaxWidthWrapper>
      <Tabs defaultValue="followings" className="w-full bg-transparent">
        <TabsList className="bg-transparent gap-4 w-full flex justify-start">
          <TabsTrigger
            className="border-2 rounded-full data-[state=active]:bg-como_v-50 
                 data-[state=active]:border-como 
               w-auto  gap-2 data-[state=active]:text-como data-[state=active]:font-bold
              stroke-1 !data-[state=active]:stroke-2"
            value="followings"
          >
            Followings
          </TabsTrigger>
          <TabsTrigger
            className="border-2 rounded-full data-[state=active]:bg-como_v-50 
                 data-[state=active]:border-como 
               w-auto  gap-2 data-[state=active]:text-como data-[state=active]:font-bold
              stroke-1 !data-[state=active]:stroke-2"
            value="followers"
          >
            Followers
          </TabsTrigger>
        </TabsList>
        <TabsContent className="px-0 justify-start" value="followings">
          <FollowingTab clerkId={params.id} />
        </TabsContent>
        <TabsContent value="followers">
          <FollowersTab clerkId={params.id} />
        </TabsContent>
      </Tabs>
    </MaxWidthWrapper>
  );
}
