import getCurrentUser from "@/app/actions/getCurrentUser"
import getFavoriteListings from "@/app/actions/getFavoriteListings"
import ClientOnly from "@/app/components/ClientOnly"
import EmptyState from "@/app/components/EmptyState"
import FavoriteClient from "./FavoriteClient"


const FavoriteListingsPage = async () => {
    const currentUser = await getCurrentUser()
    const listings = await getFavoriteListings()

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No favorites found"
                    subtitle="Looks like you have no favorite listings!"
                />
            </ClientOnly>
        )
    }

  return (
      <ClientOnly>
          <FavoriteClient
              listings={listings}
              currentUser={currentUser}
          />
    </ClientOnly>
  )
}

export default FavoriteListingsPage