export const business = {
  name: "Garcia Brothers Heating & Air Conditioning",
  shortName: "Garcia Brothers HVAC",
  phoneDisplay: "(551) 379-0300",
  phoneHref: "tel:+15513790300",
  address: "42 S 17th St, Newark, NJ 07107",
  serviceArea: "Residential HVAC service across Newark, East Orange, Belleville, and nearby Essex County communities",
  rating: "4.8",
  reviewCount: 49,
  reviewUrl:
    "https://search.google.com/local/reviews?placeid=ChIJgbdlnxpTwokRK3T6ITHjqbQ",
  hoursSummary: "Open 24 hours every day",
};

export const hours = [
  { day: "Sunday", value: "Open 24 hours" },
  { day: "Monday", value: "Open 24 hours" },
  { day: "Tuesday", value: "Open 24 hours" },
  { day: "Wednesday", value: "Open 24 hours" },
  { day: "Thursday", value: "Open 24 hours" },
  { day: "Friday", value: "Open 24 hours" },
  { day: "Saturday", value: "Open 24 hours" },
];

export const navItems = [
  { id: "home", label: "Home", href: "/" },
  { id: "services", label: "Services", href: "/services" },
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "about", label: "About", href: "/about" },
  { id: "reviews", label: "Reviews", href: "/reviews" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export const services = [
  {
    title: "Heater Repair & Furnace Replacement",
    slug: "heater-repair-furnace-replacement",
    detailHref: "/services#heater-repair-furnace-replacement",
    contactHref: "/contact?service=heater-repair-furnace-replacement",
    ctaLabel: "Request furnace service",
    heroLabel: "Furnace repair and replacement",
    heroSummary:
      "Diagnosis, repair, old equipment removal, and complete heating-system replacement for Newark-area homes.",
    heroImage: {
      src: "/projects/project-19.png",
      alt: "Indoor furnace cabinet installed with clean connections and access",
    },
    summary:
      "Diagnosis, repair, and full replacement of gas or electric furnaces for Newark-area homes.",
    detail:
      "The team handles heater failures, furnace diagnostics, old equipment removal, and complete heating-system replacement, including jobs where a failed furnace needs same-day attention.",
    icon: "Flame",
    featured: true,
  },
  {
    title: "Heat Pump Installation & Cooling",
    slug: "heat-pump-installation-cooling",
    detailHref: "/services#heat-pump-installation-cooling",
    contactHref: "/contact?service=heat-pump-installation-cooling",
    ctaLabel: "Request heat pump service",
    heroLabel: "Heat pump and cooling upgrades",
    heroSummary:
      "Heat pump installation and central cooling upgrades, including compact replacements for older furnace and air-handler setups.",
    heroImage: {
      src: "/projects/project-05.png",
      alt: "Ductless indoor air handler mounted above a window in a finished room",
    },
    summary:
      "Heat pump sales, installation, and cooling-mode service for central air upgrades.",
    detail:
      "Garcia Brothers installs heat pumps and central cooling systems, including replacements for older furnace, air-handler, or AC setups that need a more compact and efficient layout.",
    icon: "Snowflake",
  },
  {
    title: "Ductwork Installation & Redesign",
    slug: "ductwork-installation-redesign",
    detailHref: "/services#ductwork-installation-redesign",
    contactHref: "/contact?service=ductwork-installation-redesign",
    ctaLabel: "Request ductwork service",
    heroLabel: "Ductwork redesign and access solutions",
    heroSummary:
      "Removal, installation, and rerouting of duct systems for tight attics, older layouts, and uneven airflow.",
    heroImage: {
      src: "/projects/project-23.png",
      alt: "Open ceiling framing with ductwork, refrigerant lines, and mechanical service work",
    },
    summary:
      "Removal, installation, and rerouting of duct systems, including tight attic layouts.",
    detail:
      "Customer reviews describe the crew removing aging ductwork, redesigning runs, and solving cramped attic access problems that other contractors declined.",
    icon: "Wrench",
  },
  {
    title: "AC Repair & Tune-Ups",
    slug: "ac-repair-tune-ups",
    detailHref: "/services#ac-repair-tune-ups",
    contactHref: "/contact?service=ac-repair-tune-ups",
    ctaLabel: "Request AC service",
    heroLabel: "AC diagnostics and tune-ups",
    heroSummary:
      "Residential AC repair focused on refrigerant levels, airflow, thermostat compatibility, and clear repair options.",
    heroImage: {
      src: "/projects/project-01.png",
      alt: "Residential outdoor condenser installed on a clean exterior pad",
    },
    summary:
      "Air conditioning diagnostics and repair for residential systems in hot weather.",
    detail:
      "Cooling visits focus on refrigerant levels, airflow, thermostat compatibility, electrical behavior, and repair options before recommending full replacement.",
    icon: "Snowflake",
  },
  {
    title: "Emergency HVAC Service",
    slug: "emergency-hvac-service",
    detailHref: "/services#emergency-hvac-service",
    contactHref: "/contact?service=emergency-hvac-service",
    ctaLabel: "Request emergency help",
    heroLabel: "24-hour emergency HVAC",
    heroSummary:
      "Round-the-clock heating and cooling support for system failures, weekends, holidays, and after-hours calls.",
    heroImage: {
      src: "/projects/project-02.png",
      alt: "Technician working around attic HVAC equipment and insulated line runs",
    },
    summary:
      "Round-the-clock heating and cooling help, including weekends and holidays.",
    detail:
      "The company maintains 24-hour availability every day of the week, with same-day response for urgent system failures whenever scheduling allows.",
    icon: "Siren",
  },
  {
    title: "Indoor Air Quality Assessment",
    slug: "indoor-air-quality-assessment",
    detailHref: "/services#indoor-air-quality-assessment",
    contactHref: "/contact?service=indoor-air-quality-assessment",
    ctaLabel: "Request air-quality help",
    heroLabel: "Indoor air and airflow assessment",
    heroSummary:
      "Ventilation, filtration, and airflow review for residential comfort and system efficiency.",
    heroImage: {
      src: "/projects/project-15.png",
      alt: "HVAC duct and air-handler components inside a narrow utility closet",
    },
    summary:
      "Ventilation and airflow reviews for cleaner, more efficient residential comfort.",
    detail:
      "Technicians review existing ventilation conditions, duct performance, filtration, and airflow issues before recommending improvements to system efficiency and comfort.",
    icon: "Wind",
  },
];

export const reviews = [
  {
    id: "collin-soto",
    name: "Collin Soto",
    location: "Newark furnace installation",
    quote:
      "Peyton, Bryce, and Edwin made the furnace installation smooth after our heater failed. They explained the new system clearly and the house was so comfortable I had to lower the thermostat.",
  },
  {
    id: "santiago-cantu",
    name: "Santiago Cantu",
    location: "Same-day heating system replacement",
    quote:
      "Bryce and Edwin removed the old furnace and all of the existing ductwork, installed a brand new heating system, and had even warmth restored to every room by that same evening.",
  },
  {
    id: "ruth11-h",
    name: "Ruth11 H",
    location: "Heat pump and tight attic ductwork",
    quote:
      "Bryce and Peyton solved a cramped attic access problem while installing a new heat pump and redoing all of the ductwork, completing work other contractors had turned down.",
  },
  {
    id: "brittney24-g",
    name: "Brittney24 G",
    location: "Newark furnace repair",
    quote:
      "From the first phone call about furnace repair pricing, the office and technician Preston were thoughtful, listened carefully, and stayed focused on doing a good job.",
  },
  {
    id: "preston-willis",
    name: "Preston Willis",
    location: "Holiday AC repair",
    quote:
      "After using Garcia Brothers for AC repair several times, we still felt confident calling on a holiday when the air conditioner stopped working and Trenton came right away.",
  },
  {
    id: "patrick-pearson",
    name: "patrick pearson",
    location: "Furnace tune-up",
    quote:
      "Bryson was friendly during the furnace tune-up and patiently answered questions for a new homeowner who did not know much about HVAC systems.",
  },
];

export const faqs = [
  {
    id: "tight-attic",
    question:
      "Can Garcia Brothers handle a heat pump installation in a home with very limited attic space?",
    answer:
      "Yes. Ruth11 H's review describes Bryce and Peyton installing a new heat pump and rerouting all ductwork in a cramped attic, completing a job other contractors had declined.",
  },
  {
    id: "after-hours",
    question: "What happens if my heater fails on a holiday evening in Newark?",
    answer:
      "Garcia Brothers lists 24-hour availability every day of the week, including weekends and holidays, so homeowners can call after hours for urgent heating or cooling help.",
  },
  {
    id: "replacement-timeline",
    question: "How long does a full furnace and ductwork replacement take?",
    answer:
      "Santiago Cantu's review describes Bryce and Edwin removing the old furnace and ductwork and getting a brand new heating system running by that same evening.",
  },
  {
    id: "equipment-brands",
    question: "Are Bryant or other national brands part of the equipment options?",
    answer:
      "Customer review material mentions recognizable national equipment brands, including Bryant and Lennox, as part of completed HVAC projects.",
  },
  {
    id: "thermostat-setting",
    question: "Should I lower my thermostat after a new furnace is installed?",
    answer:
      "Collin Soto's review says the new furnace performed strongly enough that the thermostat setting had to be lowered to keep the home comfortable.",
  },
  {
    id: "compact-equipment",
    question:
      "What should I do if my old furnace and basement air handler are taking up too much space?",
    answer:
      "Garcia Brothers can evaluate replacement options such as a compact heat pump, including removal of oversized older equipment when the layout calls for it.",
  },
  {
    id: "system-walkthrough",
    question: "Will the technician explain how the new system works before leaving?",
    answer:
      "Yes. Multiple reviews describe technicians walking homeowners through the new equipment, answering questions, and explaining the work before leaving the property.",
  },
];

const projectDetails = [
  ["project-01", "Outdoor condenser replacement", "A residential cooling unit set on a clean exterior pad after replacement.", "Installed and checked an outdoor condenser for dependable summer cooling."],
  ["project-02", "Attic air-handler service", "A technician working around attic HVAC equipment and insulated line runs.", "Serviced attic equipment, checked connections, and verified safe access around the unit."],
  ["project-03", "Exposed duct inspection", "A ceiling view of ductwork, vents, and mechanical lines in a finished interior space.", "Inspected exposed duct runs and airflow paths in a commercial-style interior."],
  ["project-04", "Mechanical room piping", "Vertical HVAC piping and equipment lines inside a tight mechanical area.", "Organized mechanical room service with attention to piping, routing, and access."],
  ["project-05", "Wall-mounted mini split", "A ductless indoor air handler mounted neatly above a window in a finished room.", "Installed or serviced a wall-mounted mini split for room-by-room comfort."],
  ["project-06", "Home exterior cooling setup", "An exterior view of a residential HVAC unit near the side of a house.", "Positioned and serviced outdoor cooling equipment along the home exterior."],
  ["project-07", "Blower wheel cleaning", "A close view of a blower wheel and fan housing during service.", "Cleaned and inspected blower components to improve airflow and efficiency."],
  ["project-08", "Interior comfort check", "A finished indoor room with HVAC service underway near ceiling fixtures.", "Checked indoor comfort performance and airflow in an occupied living space."],
  ["project-09", "Outdoor equipment repair", "A side-yard condenser with service lines and electrical connections visible.", "Repaired outdoor cooling equipment and checked line and electrical connections."],
  ["project-10", "Hydronic piping detail", "Copper and mechanical piping tied into HVAC or heating equipment.", "Serviced heating-related piping and verified clean, secure routing."],
  ["project-11", "Electrical service panel", "A wall-mounted electrical disconnect and conduit for HVAC equipment.", "Checked the HVAC electrical disconnect and conduit for safe system operation."],
  ["project-12", "Multi-family condenser placement", "Wall-mounted outdoor cooling units on a brick multi-family building.", "Serviced condensers for a multi-family property with tight exterior placement."],
  ["project-13", "Basement heating equipment", "A teal heating unit set in a basement mechanical area.", "Performed heating equipment service in a basement mechanical space."],
  ["project-14", "Side-yard mini split unit", "An outdoor ductless condenser mounted beside a home near fencing.", "Installed or serviced a compact ductless outdoor unit in a side-yard location."],
  ["project-15", "Utility closet air handler", "HVAC duct and air-handler components inside a narrow utility closet.", "Serviced air-handler equipment in a compact utility closet."],
  ["project-16", "Condenser on gravel pad", "A clean outdoor condenser installed beside exterior siding on a gravel base.", "Set and checked an outdoor condenser with proper clearance and stable support."],
  ["project-17", "Indoor unit finish work", "A close indoor detail of HVAC-related wall and line-set finish work.", "Completed interior finish details after HVAC service or installation."],
  ["project-18", "Commercial rooftop unit", "A rooftop HVAC unit with panels and access points visible.", "Inspected a commercial rooftop unit and documented service access points."],
  ["project-19", "Furnace installation", "A furnace cabinet installed indoors with clean connections and service access.", "Installed and tested furnace equipment for reliable heating operation."],
  ["project-20", "Line-set cover detail", "A neat exterior or interior line-set cover installed along a wall.", "Finished refrigerant line protection for a cleaner and more durable installation."],
  ["project-21", "Backyard condenser install", "A residential condenser located outside near siding and landscaping.", "Installed a backyard condenser and verified outdoor operating clearance."],
  ["project-22", "Residential cooling placement", "An exterior home view with cooling equipment placed beside the foundation.", "Serviced residential cooling equipment and confirmed practical placement."],
  ["project-23", "Basement ductwork repair", "Open ceiling framing with ductwork, refrigerant lines, and mechanical service work.", "Repaired or rerouted basement ductwork and mechanical lines for better serviceability."],
  ["project-24", "Tall mechanical cabinet", "A vertical indoor HVAC cabinet with exposed service area and duct connections.", "Serviced a tall mechanical cabinet and checked airflow connections."],
  ["project-25", "Mechanical room equipment pair", "Two indoor HVAC units and ductwork in a mechanical room.", "Handled service work across paired mechanical room systems."],
  ["project-26", "Rooftop equipment in winter", "HVAC rooftop equipment on a snowy roof under a bright sky.", "Inspected rooftop equipment during cold-weather conditions."],
  ["project-27", "Roof curb detail", "A small rooftop HVAC service detail around a curb or penetration.", "Checked rooftop sealing and equipment details around a roof penetration."],
  ["project-28", "Exterior installation staging", "Outdoor jobsite with HVAC materials and equipment staged near a home.", "Staged and completed exterior HVAC installation work safely around the property."],
  ["project-29", "Finished room mini split", "An indoor mini split visible in a finished room above furniture.", "Serviced a ductless indoor head while protecting finished interior space."],
  ["project-30", "Snow-covered condenser row", "Outdoor condensers lined up near a building with snow present.", "Checked outdoor units and clearances during winter conditions."],
  ["project-31", "Side-wall condenser lineup", "Multiple outdoor condensers installed along a dark exterior wall.", "Installed or serviced a row of condensers for multi-zone comfort."],
  ["project-32", "Outdoor line routing", "Exterior HVAC piping or line routing visible on a wall under open sky.", "Routed exterior lines cleanly between indoor and outdoor equipment."],
  ["project-33", "Compact ductless indoor head", "A wall-mounted mini split installed in a small finished room.", "Installed a compact indoor ductless head for targeted heating and cooling."],
  ["project-34", "Window-area comfort solution", "A finished room window area with HVAC equipment visible nearby.", "Checked comfort delivery and equipment placement around a windowed room."],
  ["project-35", "Large condenser on stand", "A large outdoor condenser elevated on a stand beside a residence.", "Set a large outdoor condenser on a raised stand for stable, serviceable operation."],
  ["project-36", "Low-wall condenser install", "A compact outdoor unit installed along a stucco or masonry wall.", "Installed and checked a compact condenser with careful wall-side placement."],
  ["project-37", "Open-wall HVAC rough-in", "Open framing with HVAC lines and equipment work before wall finish.", "Completed rough-in work for HVAC lines before the wall was closed."],
  ["project-38", "Cold-weather condenser check", "An outdoor condenser standing near siding during snowy conditions.", "Checked an outdoor condenser during winter weather for proper operation."],
];

export const projectImages = projectDetails.map(([id, title, alt, summary], index) => ({
  id,
  title,
  alt,
  summary,
  src: `/projects/project-${String(index + 1).padStart(2, "0")}.png`,
}));

export const featuredProjects = [
  projectImages[0],
  projectImages[1],
  projectImages[4],
  projectImages[18],
  projectImages[22],
  projectImages[30],
];
