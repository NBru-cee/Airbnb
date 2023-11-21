"use client";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

interface ListingInfoProps {
    user: SafeUser;
    description: string;
    locationValue: string;
    category:
        | {
              icon: IconType;
              label: string;
              description: string;
          }
        | undefined;
    roomCount: number;
    bathroomCount: number;
    guestCount: number;
}

const Map = dynamic(() => import("../Map"), {
    ssr: false,
});

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    description,
    locationValue,
    category,
    roomCount,
    bathroomCount,
    guestCount,
}) => {
    const { getByValue } = useCountries();
    const coordinates = getByValue(locationValue)?.latlng;

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="font-semibold text-xl flex flex-row items-center gap-2">
                    <div>Hosted by {user?.name}</div>
                    <Avatar src={user?.image} />
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div>{guestCount} guests</div>
                    <div>{roomCount} rooms</div>
                    <div>{bathroomCount} bathrooms</div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <hr />
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr />
            <Map center={coordinates}/>
        </div>
    );
};

export default ListingInfo;
