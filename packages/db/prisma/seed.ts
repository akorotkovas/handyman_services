import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ============================================================
  // TRADE CATEGORIES & SERVICES
  // ============================================================
  const categories = [
    {
      name: "Santechnika",
      nameEn: "Plumbing",
      slug: "santechnika",
      icon: "wrench",
      services: [
        { name: "Vamzdžių keitimas", nameEn: "Pipe Replacement", slug: "vamzdziu-keitimas" },
        { name: "Čiaupo remontas", nameEn: "Faucet Repair", slug: "ciaupo-remontas" },
        { name: "Kanalizacijos valymas", nameEn: "Drain Cleaning", slug: "kanalizacijos-valymas" },
        { name: "Vonios montavimas", nameEn: "Bathroom Installation", slug: "vonios-montavimas" },
        { name: "Boilerio montavimas", nameEn: "Boiler Installation", slug: "boilerio-montavimas" },
        { name: "Nuotėkų remontas", nameEn: "Leak Repair", slug: "nuoteku-remontas" },
      ],
    },
    {
      name: "Elektra",
      nameEn: "Electrical",
      slug: "elektra",
      icon: "zap",
      services: [
        { name: "Elektros instaliacija", nameEn: "Electrical Installation", slug: "elektros-instaliacija" },
        { name: "Rozečių montavimas", nameEn: "Socket Installation", slug: "rozeciu-montavimas" },
        { name: "Apšvietimo montavimas", nameEn: "Lighting Installation", slug: "apsvietimo-montavimas" },
        { name: "Elektros skydo keitimas", nameEn: "Fuse Box Replacement", slug: "elektros-skydo-keitimas" },
        { name: "Laidų keitimas", nameEn: "Rewiring", slug: "laidu-keitimas" },
      ],
    },
    {
      name: "Statyba",
      nameEn: "Construction",
      slug: "statyba",
      icon: "hard-hat",
      services: [
        { name: "Namų statyba", nameEn: "House Building", slug: "namu-statyba" },
        { name: "Priestato statyba", nameEn: "Extension Building", slug: "priestato-statyba" },
        { name: "Pamatai", nameEn: "Foundations", slug: "pamatai" },
        { name: "Mūrijimas", nameEn: "Bricklaying", slug: "murijimas" },
        { name: "Betonavimas", nameEn: "Concreting", slug: "betonavimas" },
      ],
    },
    {
      name: "Renovacija",
      nameEn: "Renovation",
      slug: "renovacija",
      icon: "hammer",
      services: [
        { name: "Buto renovacija", nameEn: "Apartment Renovation", slug: "buto-renovacija" },
        { name: "Virtuvės renovacija", nameEn: "Kitchen Renovation", slug: "virtuves-renovacija" },
        { name: "Vonios renovacija", nameEn: "Bathroom Renovation", slug: "vonios-renovacija" },
        { name: "Griovimo darbai", nameEn: "Demolition", slug: "griovimo-darbai" },
      ],
    },
    {
      name: "Dažymas",
      nameEn: "Painting & Decorating",
      slug: "dazymas",
      icon: "paint-bucket",
      services: [
        { name: "Vidaus dažymas", nameEn: "Interior Painting", slug: "vidaus-dazymas" },
        { name: "Lauko dažymas", nameEn: "Exterior Painting", slug: "lauko-dazymas" },
        { name: "Tapetavimas", nameEn: "Wallpapering", slug: "tapetavimas" },
        { name: "Dekoratyvinis tinkavimas", nameEn: "Decorative Plastering", slug: "dekoratyvinis-tinkavimas" },
      ],
    },
    {
      name: "Stogų darbai",
      nameEn: "Roofing",
      slug: "stogu-darbai",
      icon: "home",
      services: [
        { name: "Stogo dengimas", nameEn: "Roof Installation", slug: "stogo-dengimas" },
        { name: "Stogo remontas", nameEn: "Roof Repair", slug: "stogo-remontas" },
        { name: "Lietaus nutekėjimo sistemos", nameEn: "Guttering", slug: "lietaus-nutekejimo-sistemos" },
        { name: "Stogo izoliacija", nameEn: "Roof Insulation", slug: "stogo-izoliacija" },
      ],
    },
    {
      name: "Grindų darbai",
      nameEn: "Flooring",
      slug: "grindu-darbai",
      icon: "layers",
      services: [
        { name: "Laminato klojimas", nameEn: "Laminate Flooring", slug: "laminato-klojimas" },
        { name: "Plytelių klojimas", nameEn: "Tile Laying", slug: "pliteliu-klojimas" },
        { name: "Parketo klojimas", nameEn: "Parquet Installation", slug: "parketo-klojimas" },
        { name: "Grindų lyginimas", nameEn: "Floor Leveling", slug: "grindu-lyginimas" },
      ],
    },
    {
      name: "Langai ir durys",
      nameEn: "Windows & Doors",
      slug: "langai-ir-durys",
      icon: "door-open",
      services: [
        { name: "Langų montavimas", nameEn: "Window Installation", slug: "langu-montavimas" },
        { name: "Durų montavimas", nameEn: "Door Installation", slug: "duru-montavimas" },
        { name: "Stiklo paketo keitimas", nameEn: "Double Glazing Replacement", slug: "stiklo-paketo-keitimas" },
      ],
    },
    {
      name: "Šildymas",
      nameEn: "Heating",
      slug: "sildymas",
      icon: "thermometer",
      services: [
        { name: "Šildymo sistemos montavimas", nameEn: "Heating System Installation", slug: "sildymo-sistemos-montavimas" },
        { name: "Radiatorių keitimas", nameEn: "Radiator Replacement", slug: "radiatoriu-keitimas" },
        { name: "Grindinio šildymo montavimas", nameEn: "Underfloor Heating", slug: "grindinio-sildymo-montavimas" },
        { name: "Katilo remontas", nameEn: "Boiler Repair", slug: "katilo-remontas" },
      ],
    },
    {
      name: "Aplinkos tvarkymas",
      nameEn: "Landscaping",
      slug: "aplinkos-tvarkymas",
      icon: "trees",
      services: [
        { name: "Vejos įrengimas", nameEn: "Lawn Installation", slug: "vejos-irengimas" },
        { name: "Tvoros montavimas", nameEn: "Fencing", slug: "tvoros-montavimas" },
        { name: "Trinkelių klojimas", nameEn: "Paving", slug: "trinkeliu-klojimas" },
        { name: "Medžių genėjimas", nameEn: "Tree Trimming", slug: "medziu-genejimas" },
      ],
    },
    {
      name: "Valymo paslaugos",
      nameEn: "Cleaning Services",
      slug: "valymo-paslaugos",
      icon: "spray-can",
      services: [
        { name: "Generalinis valymas", nameEn: "Deep Cleaning", slug: "generalinis-valymas" },
        { name: "Langų valymas", nameEn: "Window Cleaning", slug: "langu-valymas" },
        { name: "Baldų valymas", nameEn: "Upholstery Cleaning", slug: "baldu-valymas" },
        { name: "Kilimų valymas", nameEn: "Carpet Cleaning", slug: "kilimu-valymas" },
      ],
    },
    {
      name: "Baldų surinkimas",
      nameEn: "Furniture Assembly",
      slug: "baldu-surinkimas",
      icon: "armchair",
      services: [
        { name: "IKEA baldų surinkimas", nameEn: "IKEA Furniture Assembly", slug: "ikea-baldu-surinkimas" },
        { name: "Virtuvės baldų montavimas", nameEn: "Kitchen Furniture Installation", slug: "virtuves-baldu-montavimas" },
        { name: "Spintos surinkimas", nameEn: "Wardrobe Assembly", slug: "spintos-surinkimas" },
      ],
    },
    {
      name: "Kondicionavimas",
      nameEn: "Air Conditioning",
      slug: "kondicionavimas",
      icon: "wind",
      services: [
        { name: "Kondicionieriaus montavimas", nameEn: "AC Installation", slug: "kondicionierius-montavimas" },
        { name: "Kondicionieriaus valymas", nameEn: "AC Cleaning", slug: "kondicionierius-valymas" },
        { name: "Vėdinimo sistemos", nameEn: "Ventilation Systems", slug: "vedinimo-sistemos" },
      ],
    },
    {
      name: "Spynų meistras",
      nameEn: "Locksmith",
      slug: "spynu-meistras",
      icon: "lock",
      services: [
        { name: "Spynos keitimas", nameEn: "Lock Replacement", slug: "spynos-keitimas" },
        { name: "Durų atidarymas", nameEn: "Emergency Lockout", slug: "duru-atidarymas" },
        { name: "Seifų atidarymas", nameEn: "Safe Opening", slug: "seifu-atidarymas" },
      ],
    },
    {
      name: "Kenkėjų kontrolė",
      nameEn: "Pest Control",
      slug: "kenkeju-kontrole",
      icon: "bug",
      services: [
        { name: "Dezinsekcija", nameEn: "Insect Control", slug: "dezinsekcija" },
        { name: "Deratizacija", nameEn: "Rodent Control", slug: "deratizacija" },
        { name: "Dezinfekcija", nameEn: "Disinfection", slug: "dezinfekcija" },
      ],
    },
  ];

  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i]!;
    const category = await prisma.tradeCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        name: cat.name,
        nameEn: cat.nameEn,
        slug: cat.slug,
        icon: cat.icon,
        sortOrder: i,
        isActive: true,
      },
    });

    for (const svc of cat.services) {
      await prisma.tradeService.upsert({
        where: { slug: svc.slug },
        update: {},
        create: {
          categoryId: category.id,
          name: svc.name,
          nameEn: svc.nameEn,
          slug: svc.slug,
          isActive: true,
        },
      });
    }
  }

  console.log(`Seeded ${categories.length} categories with services`);

  // ============================================================
  // TEST USERS
  // ============================================================
  const passwordHash = await bcrypt.hash("password123", 12);

  // Admin
  await prisma.user.upsert({
    where: { email: "admin@handyman.test" },
    update: {},
    create: {
      email: "admin@handyman.test",
      passwordHash,
      firstName: "Admin",
      lastName: "Handyman",
      roles: ["ADMIN"],
      status: "ACTIVE",
      emailVerified: new Date(),
    },
  });

  // Customer
  await prisma.user.upsert({
    where: { email: "klientas@test.lt" },
    update: {},
    create: {
      email: "klientas@test.lt",
      passwordHash,
      firstName: "Petras",
      lastName: "Petraitis",
      phone: "+37060000001",
      roles: ["CUSTOMER"],
      status: "ACTIVE",
      emailVerified: new Date(),
    },
  });

  // Tradesperson
  const tradesperson = await prisma.user.upsert({
    where: { email: "meistras@test.lt" },
    update: {},
    create: {
      email: "meistras@test.lt",
      passwordHash,
      firstName: "Jonas",
      lastName: "Jonaitis",
      phone: "+37060000002",
      roles: ["TRADESPERSON"],
      status: "ACTIVE",
      emailVerified: new Date(),
    },
  });

  // Tradesperson profile
  const plumbingCategory = await prisma.tradeCategory.findUnique({
    where: { slug: "santechnika" },
  });

  if (plumbingCategory) {
    await prisma.tradespersonProfile.upsert({
      where: { userId: tradesperson.id },
      update: {},
      create: {
        userId: tradesperson.id,
        type: "INDIVIDUAL",
        slug: "jonas-jonaitis",
        bio: "Santechnikas su 15 metų patirtimi. Atlieku visus santechnikos darbus kokybiškai ir laiku. Dirbu Vilniuje ir apylinkėse.",
        experience: 15,
        city: "Vilnius",
        municipality: "Vilniaus m. sav.",
        phone: "+37060000002",
        serviceRadius: 30,
        verificationStatus: "VERIFIED",
        verifiedAt: new Date(),
        completedJobs: 142,
        rating: 4.8,
        reviewCount: 89,
        isActive: true,
        categories: {
          create: {
            categoryId: plumbingCategory.id,
          },
        },
      },
    });
  }

  console.log("Seeded test users (password: password123):");
  console.log("  Admin:        admin@handyman.test");
  console.log("  Customer:     klientas@test.lt");
  console.log("  Tradesperson: meistras@test.lt");

  // ============================================================
  // PLATFORM SETTINGS
  // ============================================================
  const settings = [
    { key: "platform_fee_percent", value: "7" },
    { key: "auto_approval_hours", value: "72" },
    { key: "quote_expiry_days", value: "14" },
    { key: "dispute_escalation_days", value: "7" },
    { key: "min_milestone_amount", value: "20" },
  ];

  for (const setting of settings) {
    await prisma.platformSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log("Seeded platform settings");
  console.log("Done!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
