require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const bcrypt = require("bcryptjs");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main(){
    await prisma.booking.deleteMany();
    await prisma.schedule.deleteMany();
    await prisma.user.deleteMany();

    const admin = await prisma.user.create({data:{
        name: "Paulo Galarza",
        email: "paulo.galarza@example.com",
        password: await bcrypt.hash("admin123", 10), 
        role: "ADMIN"
        }
    });

    const yo = await prisma.user.create({data:{
        name: "Jose Reinoso",
        email: "jareinoso5@espe.edu.ec",
        password: await bcrypt.hash("jose1234", 10), 
        role: "USER"
        }
    });

    const horario1 = await prisma.schedule.create({data:{
        court: "Futbol 1",
        startTime: new Date("2026-11-10T08:00:00Z"),
        endTime: new Date("2026-11-10T10:00:00Z")
        }
    });

        const horario2 = await prisma.schedule.create({data:{
        court: "Voley 2",
        startTime: new Date("2026-11-13T10:00:00Z"),
        endTime: new Date("2026-11-13T12:00:00Z")
        }
    });

    await prisma.booking.create({
    data: {
        date: new Date("2026-11-10T08:00:00Z"),
        user: { connect: { id: yo.id } },
            schedule: { connect: { id: horario1.id } }
        },
    });
        
    await prisma.booking.create({
        data: {
            date: new Date("2026-11-13T00:00:00Z"),
            user: { connect: { id: admin.id } },
            schedule: { connect: { id: horario2.id } }
        }
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });