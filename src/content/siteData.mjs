export const business = {
  name: "Garcia Brothers Heating & Air Conditioning",
  shortName: "Garcia Brothers HVAC",
  phoneDisplay: "(555) 123-4567",
  phoneHref: "tel:+15551234567",
  email: "service@garciabrothershvac.com",
  serviceArea: "Residential and commercial customers across the local metro area",
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

export const services = [
  {
    title: "AC Repair & Install",
    slug: "ac-repair-install",
    detailHref: "/services#ac-repair-install",
    contactHref: "/contact?service=ac-repair-install",
    ctaLabel: "Request cooling service",
    heroLabel: "Cooling diagnostics and installs",
    heroSummary:
      "No-cool calls, condenser replacements, line routing, and practical cooling recommendations backed by real job-site photos.",
    heroImage: {
      src: "/projects/project-01.png",
      alt: "Residential outdoor condenser installed on a clean exterior pad",
    },
    summary:
      "Troubleshooting, seasonal repair, and clean installation of efficient cooling systems.",
    detail:
      "From no-cool calls to complete condenser replacement, the team handles cooling work with careful line routing, clean outdoor pads, and practical guidance on system performance.",
    icon: "Snowflake",
  },
  {
    title: "Heating Services",
    slug: "heating-services",
    detailHref: "/services#heating-services",
    contactHref: "/contact?service=heating-services",
    ctaLabel: "Request heating service",
    heroLabel: "Heating repair and replacement",
    heroSummary:
      "Furnace and heat-pump service focused on safe operation, dependable heat, clean connections, and clear repair decisions.",
    heroImage: {
      src: "/projects/project-19.png",
      alt: "Indoor furnace cabinet installed with clean connections and access",
    },
    summary:
      "Furnace repair, heat pump service, and heating equipment replacement for reliable winter comfort.",
    detail:
      "Heating visits focus on safe operation, clear diagnostics, airflow, burner performance, and dependable repairs before cold weather exposes weak equipment.",
    icon: "Flame",
  },
  {
    title: "Maintenance Plans",
    slug: "maintenance-plans",
    detailHref: "/services#maintenance-plans",
    contactHref: "/contact?service=maintenance-plans",
    ctaLabel: "Request maintenance",
    heroLabel: "Preventive service visits",
    heroSummary:
      "Seasonal maintenance checks airflow, coils, drains, controls, and blower condition before small issues become urgent calls.",
    heroImage: {
      src: "/projects/project-07.png",
      alt: "Close view of a blower wheel and fan housing during maintenance",
    },
    summary:
      "Preventive tune-ups that reduce surprise breakdowns and keep HVAC equipment running efficiently.",
    detail:
      "Scheduled maintenance covers coils, filters, electrical checks, drains, controls, and system condition notes so owners can plan before small issues turn into major calls.",
    icon: "Wrench",
  },
  {
    title: "Emergency HVAC",
    slug: "emergency-hvac",
    detailHref: "/services#emergency-hvac",
    contactHref: "/contact?service=emergency-hvac",
    ctaLabel: "Request emergency help",
    heroLabel: "Urgent HVAC response",
    heroSummary:
      "Emergency support prioritizes comfort failures with direct communication, field diagnostics, and practical next-step recommendations.",
    heroImage: {
      src: "/projects/project-02.png",
      alt: "Technician working around attic HVAC equipment and insulated line runs",
    },
    summary:
      "Rapid response for urgent heating or cooling failures when indoor comfort cannot wait.",
    detail:
      "Priority dispatch helps restore critical heating and cooling, with direct communication and repair recommendations based on what the equipment actually needs.",
    icon: "Siren",
    featured: true,
  },
  {
    title: "Commercial Service",
    slug: "commercial-service",
    detailHref: "/services#commercial-service",
    contactHref: "/contact?service=commercial-service",
    ctaLabel: "Request commercial service",
    heroLabel: "Light commercial HVAC support",
    heroSummary:
      "Commercial service handles rooftop equipment, occupied spaces, uptime constraints, and documentation for repeatable building comfort.",
    heroImage: {
      src: "/projects/project-18.png",
      alt: "Commercial rooftop HVAC unit with panels and service access points visible",
    },
    summary:
      "Light commercial system repair, rooftop equipment support, and building climate troubleshooting.",
    detail:
      "Commercial work is handled with attention to uptime, access constraints, service documentation, and the practical needs of occupied spaces.",
    icon: "Building2",
  },
  {
    title: "Indoor Air Quality",
    slug: "indoor-air-quality",
    detailHref: "/services#indoor-air-quality",
    contactHref: "/contact?service=indoor-air-quality",
    ctaLabel: "Request air-quality help",
    heroLabel: "Indoor air and airflow improvements",
    heroSummary:
      "Air-quality work can include filtration, duct inspection, equipment cleaning, ventilation checks, and comfort recommendations.",
    heroImage: {
      src: "/projects/project-15.png",
      alt: "HVAC duct and air-handler components inside a narrow utility closet",
    },
    summary:
      "Filtration, ventilation, humidification, and air-quality upgrades that support cleaner indoor air.",
    detail:
      "Indoor air solutions can include filter upgrades, duct inspection, equipment cleaning, and recommendations for comfort issues tied to airflow or humidity.",
    icon: "Wind",
  },
];

export const reviews = [
  {
    name: "Sarah M.",
    location: "Residential customer",
    quote:
      "They came out quickly, explained the issue clearly, and left the equipment area cleaner than they found it.",
  },
  {
    name: "David R.",
    location: "Homeowner",
    quote:
      "The technician walked me through the repair and gave honest advice about what could wait and what needed attention.",
  },
  {
    name: "Jessica L.",
    location: "Installation customer",
    quote:
      "Our replacement was organized, neat, and finished without surprises. The new system looks and runs great.",
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
