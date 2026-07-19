import { PrismaClient, SlotType } from '@prisma/client'
import { parkingCompanies } from './data'

const prisma = new PrismaClient()

const deleteAll = async () => {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE 
      "Review", "Verification", "ValetAssignment", "BookingTimeline", 
      "Booking", "Service", "Address", "Slot", "Garage", "Company", 
      "Customer", "Manager", "Valet", "Admin"
    CASCADE;
  `)
}

const main = async () => {
  await deleteAll()

  console.log('Seeding database...')

  // We need at least one admin to verify garages
  const admin = await prisma.admin.create({
    data: {
      uid: 'EVUedOiO7QeBL0R0VUTuIJzYVVt2',
      displayName: 'Krishna Kumar',
    },
  })

  for (const company of parkingCompanies) {
    const createdCompany = await prisma.company.create({
      data: {
        displayName: company.companyName,
        description: company.companyDescription,
      },
    })

    for (const garage of company.garages) {
      // Chennai coordinates range roughly: lat 12.9 to 13.1, lng 80.15 to 80.28
      const lat = 12.9 + Math.random() * 0.2
      const lng = 80.15 + Math.random() * 0.13

      const createdGarage = await prisma.garage.create({
        data: {
          displayName: garage.displayName,
          description: garage.description,
          companyId: createdCompany.id,
          images: [
            'https://placehold.co/600x400/png?text=' +
              encodeURIComponent(garage.displayName || 'Garage'),
          ],
        },
      })

      await prisma.address.create({
        data: {
          garageId: createdGarage.id,
          address: garage.address,
          lat,
          lng,
        },
      })

      // Create a verification for the garage so it is approved/live
      await prisma.verification.create({
        data: {
          garageId: createdGarage.id,
          verified: true,
          adminId: admin.uid,
        },
      })

      // Create random slots for this garage
      const slotTypes = [SlotType.CAR, SlotType.BIKE, SlotType.BICYCLE, SlotType.HEAVY]
      for (const type of slotTypes) {
        // Create 2 to 5 slots of each type
        const count = Math.floor(Math.random() * 4) + 2
        for (let i = 1; i <= count; i++) {
          await prisma.slot.create({
            data: {
              garageId: createdGarage.id,
              displayName: `${type}-${i}`,
              pricePerHour: type === SlotType.HEAVY ? 150 : type === SlotType.CAR ? 80 : type === SlotType.BIKE ? 40 : 20,
              type,
            },
          })
        }
      }
    }
  }

  console.log('Seeding completed successfully!')

  // Output stats
  const companyCount = await prisma.company.count()
  const garageCount = await prisma.garage.count()
  const slotCount = await prisma.slot.count()
  const adminCount = await prisma.admin.count()
  
  console.log('Checking DB:')
  console.log(`Company: ${companyCount}`)
  console.log(`Garages: ${garageCount}`)
  console.log(`Slots: ${slotCount}`)
  console.log(`Admins: ${adminCount}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
