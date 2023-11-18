import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();

    const {
        title,
        description,
        imageSrc,
        price,
        category,
        location,
        roomCount,
        bathroomCount,
        guestCount,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            return NextResponse.error();
        }
    });

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            price: parseInt(price, 10),
            category,
            locationValue: location.value,
            roomCount,
            bathroomCount,
            guestCount,
            userId: currentUser.id,
        },
    });

    return NextResponse.json(listing);
}
