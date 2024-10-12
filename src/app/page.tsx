import { FormInputIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

function Home() {
  return (
    <header className="w-full h-[80px] flex justify-between items-center px-4 md:px-6 bg-white bg-opacity-90 backdrop-filter backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="font-bold text-xl md:text-2xl flex items-center">
        <FormInputIcon className="w-6 h-6 mr-2" />
        Google Forms
      </div>

      <nav>
        <ul className="flex items-center gap-4">
          <li>
            <SignedOut>
              <Button asChild>
                <SignInButton mode="modal" />
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Home;
