import { useAuth0 } from "@auth0/auth0-react";

const NavBar=()=>{
    const { user, isAuthenticated, isLoading , loginWithRedirect } = useAuth0();
    return (
        
        <div className="flex gap-6 mt-4 items-center justify-end mr-44">
            {
                isAuthenticated?
                (<div className="flex gap-6 mt-4 items-center justify-end">
                    
                    <button className="border px-4 py-2 rounded-2xl text-lg text-white bg-black hover:opacity-70" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button>
                    <div className="flex gap-3 items-center border px-4 py-1 rounded-2xl text-lg hover:bg-slate-300">
                       
                        <img className="w-9 rounded-full" src={user.picture} alt="profile" />
                        <span>{user.given_name}</span>
                    </div>
                    </div>):
                (<div className="flex gap-6 mt-4 items-center justify-end">
                    <button className="border px-4 py-2 rounded-2xl text-lg hover:bg-slate-300" onClick={() => loginWithRedirect()}>Sign In</button>
                    <button className="border px-4 py-2 rounded-2xl text-lg text-white bg-black hover:opacity-70" onClick={() => loginWithRedirect()}>Sign Up</button>
                    </div>
                )
            }
        </div>
    )
}

export default NavBar;