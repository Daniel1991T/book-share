"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import Login from "./login/Login";
import Register from "./register/Register";

const Auth = () => {
  const [tab, setTab] = useState<"signIn" | "signUp">("signIn");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="outline-como hover:text-white hover:bg-como rounded-full"
        >
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div className="flex items-center space-x-2">
          <Tabs value={tab} className="w-[400px]">
            <TabsContent value="signIn">
              <Login />
              <div className="flex items-center w-full justify-center text-lg">
                <p className="text-gunsmoke">No account?</p>
                <Button
                  className="text-como -m-1 text-lg"
                  variant="link"
                  onClick={() => setTab("signUp")}
                >
                  Create one
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="signUp">
              <Register />
              <div className="flex items-center w-full justify-center text-lg">
                <p className="text-gunsmoke">Already have an account?</p>
                <Button
                  className="text-como -m-1 text-lg"
                  variant="link"
                  onClick={() => setTab("signIn")}
                >
                  Log in
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default Auth;
