import React from 'react'
import { Footer, FooterBrand, FooterCopyright, FooterDivider, FooterLink, FooterLinkGroup } from "flowbite-react";
import { Link } from 'react-router-dom';

function FooterApp() {
    return (
        <Footer container className='dark:bg-gray-600'>
            <div className="w-full text-center">
                <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
                    <h4 className=' text-sky-600 dark:text-white font-bold mb-5 md:mb-0 text-2xl'>Social App</h4>
                    <FooterLinkGroup>
                        
                        <FooterLink as={Link} to={'posts'}>Posts</FooterLink>
                        
                    </FooterLinkGroup>
                </div>
                <FooterDivider />
                <FooterCopyright href="#" by="Mostafa Helal" year={2022} />
            </div>
        </Footer>
    )
}

export default FooterApp
