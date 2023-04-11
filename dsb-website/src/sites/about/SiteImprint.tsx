import {Helmet, HelmetProvider} from "react-helmet-async"
export default function SiteImprint() {
    return (
        <div>
            <HelmetProvider>
                <Helmet>
                    <meta name={"robots"} content={"noindex"}/>
                </Helmet>
            </HelmetProvider>
        </div>
    )
}