import { PrismaClient, StatusType } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {

  await prisma.reservation.deleteMany({});
  await prisma.parkingSpot.deleteMany({});
  await prisma.user.deleteMany({});


  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. Создаем пользователей
  const users = await Promise.all(
    Array.from({ length: 2 }).map((_, i) =>
      prisma.user.create({
        data: {
          email: `user${i + 1}@example.com`,
          password: passwordHash,
        },
      })
    )
  );

  // 2. Создаем парковочные места с вручную заданными идентификаторами
  const identifiers = ['A-01', 'A-02', 'A-03', 'B-02', 'B-04', 'C-01', 'C-05'];

  const parkingSpots = await Promise.all(
    identifiers.map(identifier =>
      prisma.parkingSpot.create({
        data: {
          identifier,
          location: faker.location.streetAddress(),
        },
      })
    )
  );

  // 3. Создаем бронирования
  const statuses = [StatusType.BOOKED, StatusType.CANCELLED];

  for (let i = 0; i < 20; i++) {
    const user = faker.helpers.arrayElement(users);
    const spot = faker.helpers.arrayElement(parkingSpots);
    const date = faker.date.soon({ days: 15 });
    const time = `${faker.number.int({ min: 8, max: 20 })}:00`;

    await prisma.reservation.create({
      data: {
        userId: user.id,
        parkingSpotNumber: spot.id,
        reservedDate: date,
        reservedTime: time,
        status: faker.helpers.arrayElement(statuses),
      },
    });
  }

const fullyBookedSpot = parkingSpots[0]; // любое место
const fullyBookedDates = [new Date(Date.now() + 259200000*2), new Date(Date.now() + 259200000)]; // сегодня и завтра

for (const date of fullyBookedDates) {
  for (let hour = 0; hour < 24; hour++) {
    await prisma.reservation.create({
      data: {
        userId: users[0].id,
        parkingSpotNumber: fullyBookedSpot.id,
        reservedDate: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        ),
        reservedTime: `${hour.toString().padStart(2, "0")}:00`,
        status: StatusType.BOOKED,
      },
    });
  }
}

  console.log('✅ Seeding complete with selected identifiers!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });