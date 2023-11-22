import ClientOnly from "@/app/components/ClientOnly";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import getListings, { IListingParams } from "@/app/actions/getListings";
import ListingCard from "@/app/components/listings/ListingCard";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { SafeListing, SafeUser } from "./types";

interface HomeProps {
    listings: SafeListing[]; // Assuming Listing is the type of your data
    currentUser: SafeUser; // Assuming User is the type of your user data
}

const Home = ({ listings, currentUser }: HomeProps) => {
    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState showReset />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <Container>
                <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:gric-cols-6 gap-8">
                    {listings.map((listing) => (
                        <ListingCard
                            key={listing.id}
                            data={listing}
                            currentUser={currentUser}
                        />
                    ))}
                </div>
            </Container>
        </ClientOnly>
    );
};

export async function getStaticProps() {
    const searchParams: IListingParams = {}; // Define your search parameters here
    const listings = await getListings(searchParams);
    const currentUser = await getCurrentUser();

    return {
        props: {
            listings,
            currentUser,
        },
    };
}

export default Home;
