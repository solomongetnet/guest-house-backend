-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."BookingStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."GuestHouseType" AS ENUM ('PRIVATE', 'SHARED');

-- CreateEnum
CREATE TYPE "public"."EachRoomType" AS ENUM ('SINGLE', 'DOUBLE', 'TWIN', 'DELUXE', 'SUITE', 'FAMILY', 'STUDIO', 'EXECUTIVE', 'PRESIDENTIAL');

-- CreateEnum
CREATE TYPE "public"."ActivityAction" AS ENUM ('BOOKED', 'UPDATED_BOOKING', 'CANCELLED_BOOKING', 'APPROVED_BOOKING', 'REJECTED_BOOKING', 'CHECKED_IN', 'CHECKED_OUT', 'PAYMENT_SUCCESS', 'PAYMENT_FAILED', 'USER_BANNED', 'USER_UNBANNED', 'DELETE_GUEST_HOUSE', 'UPDATE_GUEST_HOUSE', 'DELETE_ROOM', 'UPDATE_ROOM');

-- CreateTable
CREATE TABLE "public"."user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'GUEST',
    "banned" BOOLEAN,
    "banReason" TEXT,
    "banExpires" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,
    "impersonatedBy" TEXT,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GuestHouse" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "type" "public"."GuestHouseType" NOT NULL DEFAULT 'SHARED',
    "images" JSONB NOT NULL,
    "feedbacks" JSONB,
    "facilities" TEXT[],
    "contact" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GuestHouse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Room" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "type" "public"."EachRoomType" NOT NULL DEFAULT 'SINGLE',
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "images" JSONB NOT NULL,
    "availability" BOOLEAN NOT NULL,
    "square_meters" INTEGER NOT NULL,
    "max_occupancy" INTEGER NOT NULL,
    "beds" JSONB NOT NULL,
    "living_features" JSONB NOT NULL,
    "kitchen_features" JSONB NOT NULL,
    "accessibility" JSONB NOT NULL,
    "hygiene_features" JSONB NOT NULL,
    "last_updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guestHouseId" TEXT NOT NULL,
    "occupiedById" TEXT,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."About" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "guestHouseId" TEXT NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Review" (
    "id" TEXT NOT NULL,
    "averageRating" DOUBLE PRECISION NOT NULL,
    "totalReviewers" INTEGER NOT NULL,
    "aboutId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Location" (
    "id" TEXT NOT NULL,
    "continent" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "subcity" TEXT NOT NULL,
    "nearby" TEXT,
    "guestHouseId" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Booking" (
    "id" TEXT NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,
    "guests" INTEGER NOT NULL,
    "status" "public"."BookingStatus" NOT NULL DEFAULT 'PENDING',
    "paymentStatus" "public"."PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "transactionRef" TEXT,
    "paymentInfo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "approvedById" TEXT,
    "roomId" TEXT NOT NULL,
    "guestHouseId" TEXT,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."history" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "totalRooms" INTEGER NOT NULL,
    "occupiedRooms" INTEGER NOT NULL,
    "occupancyRate" DOUBLE PRECISION NOT NULL,
    "totalReservations" INTEGER NOT NULL,
    "totalIncome" DOUBLE PRECISION NOT NULL,
    "averageDailyRate" DOUBLE PRECISION NOT NULL,
    "revPAR" DOUBLE PRECISION NOT NULL,
    "totalProfit" DOUBLE PRECISION NOT NULL,
    "gopPAR" DOUBLE PRECISION,
    "averageLengthOfStay" DOUBLE PRECISION,
    "bookingPace" INTEGER,
    "averageLeadTime" DOUBLE PRECISION,
    "directBookings" INTEGER,
    "otaBookings" INTEGER,
    "groupBookings" INTEGER,
    "avgRating" DOUBLE PRECISION,
    "npsScore" DOUBLE PRECISION,
    "guestHouseId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."activity" (
    "id" TEXT NOT NULL,
    "action" "public"."ActivityAction" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "bookingId" TEXT,
    "roomId" TEXT,
    "guestHouseId" TEXT,
    "historyId" TEXT,
    "details" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "public"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "public"."session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Room_roomId_key" ON "public"."Room"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "About_guestHouseId_key" ON "public"."About"("guestHouseId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_aboutId_key" ON "public"."Review"("aboutId");

-- CreateIndex
CREATE UNIQUE INDEX "Location_guestHouseId_key" ON "public"."Location"("guestHouseId");

-- CreateIndex
CREATE UNIQUE INDEX "history_date_key" ON "public"."history"("date");

-- AddForeignKey
ALTER TABLE "public"."session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Room" ADD CONSTRAINT "Room_guestHouseId_fkey" FOREIGN KEY ("guestHouseId") REFERENCES "public"."GuestHouse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Room" ADD CONSTRAINT "Room_occupiedById_fkey" FOREIGN KEY ("occupiedById") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."About" ADD CONSTRAINT "About_guestHouseId_fkey" FOREIGN KEY ("guestHouseId") REFERENCES "public"."GuestHouse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "public"."About"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Location" ADD CONSTRAINT "Location_guestHouseId_fkey" FOREIGN KEY ("guestHouseId") REFERENCES "public"."GuestHouse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_guestHouseId_fkey" FOREIGN KEY ("guestHouseId") REFERENCES "public"."GuestHouse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."history" ADD CONSTRAINT "history_guestHouseId_fkey" FOREIGN KEY ("guestHouseId") REFERENCES "public"."GuestHouse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."activity" ADD CONSTRAINT "activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."activity" ADD CONSTRAINT "activity_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "public"."Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."activity" ADD CONSTRAINT "activity_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."activity" ADD CONSTRAINT "activity_guestHouseId_fkey" FOREIGN KEY ("guestHouseId") REFERENCES "public"."GuestHouse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."activity" ADD CONSTRAINT "activity_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "public"."history"("id") ON DELETE SET NULL ON UPDATE CASCADE;
