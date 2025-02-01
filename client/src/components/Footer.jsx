import { Footer, FooterCopyright, FooterDivider, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from "flowbite-react"
import { Link } from "react-router-dom"
import { BsFacebook, BsInstagram, BsTwitterX, BsGithub, BsDribbble } from 'react-icons/bs'

export const FooterCompo = () => {
    return (
        <Footer container className="border border-t-8 border-teal-500">
            <div className="w-full max-w-7xl mx-auto">

                <div className="grid w-full justify-between sm:flex md:grid-cols-1">

                    <div className="mt-5">
                    <Link to="/" className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">

                    <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl text-white">
                        Blogger's
                    </span>
                    World
                    </Link>
                    </div>
                        <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">

                            <div>
                                <FooterTitle title="About"/>
                                <FooterLinkGroup col>
                                    <FooterLink
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        100 JS Projects
                                    </FooterLink>

                                    <FooterLink
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        100 JS Projects
                                    </FooterLink>

                                    
                                </FooterLinkGroup>
                            </div>

                            <div>
                                <FooterTitle title="Follow Us"/>
                                <FooterLinkGroup col>
                                    <FooterLink
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        GitHub
                                    </FooterLink>

                                    <FooterLink
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        LinkedIn
                                    </FooterLink>

                                    
                                </FooterLinkGroup>
                            </div>

                            <div>
                                <FooterTitle title="Legal"/>
                                <FooterLinkGroup col>
                                    <FooterLink
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Privacy Policy
                                    </FooterLink>

                                    <FooterLink
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Terms &amp; Conditions
                                    </FooterLink>

                                    
                                </FooterLinkGroup>
                            </div>
                            
                        </div>
                </div>

                <FooterDivider/>

                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <FooterCopyright href="#" by="Blogger's Word" year={new Date().getFullYear()}/>

                    <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                        <FooterIcon href="#" icon={BsFacebook} className="hover:text-blue-500"/>
                        <FooterIcon href="#" icon={BsInstagram} className="hover:text-red-600"/>
                        <FooterIcon href="#" icon={BsTwitterX} className="hover:text-black"/>
                        <FooterIcon href="#" icon={BsGithub} className="hover:text-black"/>
                        <FooterIcon href="#" icon={BsDribbble} className="hover:text-pink-500"/>
                    </div>
                </div>
            </div>
        </Footer>
    )
}
