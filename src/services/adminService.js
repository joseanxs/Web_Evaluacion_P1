const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const createSchedule = async (court, startTime, endTime) => {
    if (!court || !startTime || !endTime) {
    throw new Error("court, startTime y endTime son obligatorios");
    }

    const start = new Date(startTime);
    const end = new Date(endTime);
    if (isNaN(start) || isNaN(end)) {
        throw new Error("startTime y endTime deben ser fechas válidas");
    }
    if (end <= start) {
        throw new Error("endTime debe ser posterior a startTime");
    }
    return prisma.schedule.create({
        data: { court, startTime: start, endTime: end },
    });
};

const getAllBookings = async () => {
    return prisma.booking.findMany({include: { user: true, schedule: true },
    });
};

module.exports = { createSchedule, getAllBookings };