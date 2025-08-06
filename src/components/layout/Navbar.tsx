import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Link from "next/link"

export default function Navbar() {
    return (
        <div className="bg-neutral-950 w-fit rounded-lg py-1 px-2">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className="text-white font-heading text-lg">
                            <Link href="/">Home</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className="text-white font-heading text-lg">
                            <Link href="/">Fonctionnalités</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className="text-white font-heading text-lg">
                            <Link href="/">Prix</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className="text-white font-heading text-lg">
                            <Link href="/">Contact</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    
                </NavigationMenuList>
            </NavigationMenu>
        </div>
        
    )
}